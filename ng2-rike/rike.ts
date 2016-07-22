import {Injectable, Optional, EventEmitter} from "@angular/core";
import {Request, RequestOptionsArgs, Response, Http, RequestMethod, RequestOptions} from "@angular/http";
import {Observable, Observer, Subscription} from "rxjs/Rx";
import {
    RikeEvent,
    RikeErrorEvent,
    RikeSuccessEvent,
    RikeOperationEvent,
    RikeCancelEvent,
    RikeEventSource
} from "./event";
import {RikeOptions, DEFAULT_RIKE_OPTIONS} from "./options";
import {DataType, HTTP_RESPONSE_DATA_TYPE, jsonDataType} from "./data";

const REQUEST_METHODS: {[name: string]: number} = {
    "GET": RequestMethod.Get,
    "POST": RequestMethod.Post,
    "PUT": RequestMethod.Put,
    "DELETE": RequestMethod.Delete,
    "OPTIONS": RequestMethod.Options,
    "HEAD": RequestMethod.Head,
    "PATCH": RequestMethod.Patch,
};

export function requestMethod(method: string | RequestMethod): RequestMethod {
    if (typeof method !== "string") {
        return method;
    }

    const result = REQUEST_METHODS[method.toUpperCase()];

    if (result != null) {
        return result;
    }

    throw new Error("Unsupported HTTP request method: " + method);
}

/**
 * REST-like resource operations service.
 *
 * This service can be injected to other services or components.
 *
 * It basically mimics the `Http` interface, but also honors [global Rike options][RikeOptions].
 *
 * It can also be used to perform operations on particular targets.
 */
@Injectable()
export class Rike implements RikeEventSource {

    private readonly _options: RikeOptions;
    private readonly _rikeEvents = new EventEmitter<RikeEvent>();
    private readonly _internals: RikeInternals;

    constructor(private _http: Http, defaultHttpOptions: RequestOptions, @Optional() _options?: RikeOptions) {
        this._options = _options || DEFAULT_RIKE_OPTIONS;
        this._internals = {
            defaultHttpOptions,
            wrapResponse: (target, operation, response) => this.wrapResponse(target, operation, response)
        }
    }

    /**
     * Global REST-like resource access options.
     *
     * @returns {RikeOptions} either pre-configured, or [default][DEFAULT_RIKE_OPTIONS] options.
     */
    get options(): RikeOptions {
        return this._options;
    }

    /**
     * All REST-like resource operation events emitter.
     *
     * @returns {EventEmitter<RikeEvent>}
     */
    get rikeEvents(): EventEmitter<RikeEvent> {
        return this._rikeEvents;
    }

    request(request: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        options = this.updateRequestOptions(options);
        if (typeof request === "string") {
            request = this.options.relativeUrl(request);
        }
        return this._http.request(request, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.get(this.options.relativeUrl(url), this.updateRequestOptions(options));
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.post(this.options.relativeUrl(url), body, this.updateRequestOptions(options));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.put(this.options.relativeUrl(url), body, this.updateRequestOptions(options));
    }

    //noinspection ReservedWordAsName
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.delete(this.options.relativeUrl(url), this.updateRequestOptions(options));
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.patch(this.options.relativeUrl(url), body, this.updateRequestOptions(options));
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.head(this.options.relativeUrl(url), this.updateRequestOptions(options));
    }

    /**
     * Constructs operation target, which operations produce HTTP responses ([HTTP_RESPONSE_DATA_TYPE]).
     *
     * Arbitrary data type can be used as a request body.
     *
     * @param target arbitrary target value.
     *
     * @returns {RikeTargetImpl} new operation target.
     */
    target(target: any): RikeTarget<any, Response>;

    /**
     * Constructs operations target, which operates on the given data type.
     *
     * @param target arbitrary target value.
     * @param dataType operations data type.
     *
     * @return {RikeTargetImpl<T>} new operations target.
     */
    target<IN, OUT>(target: any, dataType: DataType<IN, OUT>): RikeTarget<IN, OUT>;

    target(target: any, dataType?: DataType<any, any>): RikeTarget<any, any> {

        const rikeTarget = new RikeTargetImpl<any, any>(
            this,
            this._internals,
            target,
            dataType || HTTP_RESPONSE_DATA_TYPE);

        rikeTarget.rikeEvents.subscribe(
            (event: RikeEvent) => this._rikeEvents.emit(event),
            (error: any) => this._rikeEvents.error(error),
            () => this._rikeEvents.complete());

        return rikeTarget;
    }

    /**
     * Constructs operations target, which operates on the given data type passing it as JSON over HTTP.
     *
     * @param target arbitrary target value.
     *
     * @return {RikeTarget<T>} new operations target.
     */
    json<T>(target: any): RikeTarget<T, T> {
        return this.target(target, jsonDataType<T>());
    }

    /**
     * Updates HTTP request options accordingly to global _options_.
     *
     * @param options HTTP request options to update.
     *
     * @returns {RequestOptionsArgs} either new HTTP options instance, or the _options_ argument if no modifications
     * done.
     */
    protected updateRequestOptions(options?: RequestOptionsArgs): RequestOptionsArgs | undefined {
        if (!options) {
            return options;
        }
        if (options.url != null) {

            var newUrl = this._options.relativeUrl(options.url);

            if (newUrl !== options.url) {
                options = {
                    url: newUrl,
                    method: options.method,
                    search: options.search,
                    headers: options.headers,
                    body: options.body,
                    withCredentials: options.withCredentials,
                }
            }
        }

        return options;
    }

    //noinspection JSMethodCanBeStatic,JSUnusedLocalSymbols
    /**
     * Wraps the HTTP response observable for the given operation.
     *
     * @param _target operation target.
     * @param _operation operation name.
     * @param response
     * @returns {Observable<Response>}
     */
    protected wrapResponse(
        _target: RikeTarget<any, any>,
        _operation: RikeOperation<any, any>,
        response: Observable<Response>): Observable<Response> {
        return response;
    }

}

/**
 * REST-like operations target.
 *
 * Operation targets are created using [Rike.target] method. The actual operations should be created first with
 * _operation_ method.
 *
 * Only one operation can be performed on a target at a time. Whenever a new operation on the same target is initiated,
 * the previous one is cancelled.
 *
 * `IN` is a request type this target's operations accept by default.
 * `OUT` is a response type this target's operations return by default.
 */
export abstract class RikeTarget<IN, OUT> implements RikeEventSource {

    /**
     * Operation target value.
     *
     * This is the value passed to the [Rike.target] method.
     */
    abstract readonly target: any;

    /**
     * A currently evaluating operation's name.
     *
     * `undefined` if no operations currently in process, i.e. operation not started, cancelled, or completed, either
     * successfully or with error.
     */
    abstract readonly currentOperation?: string;

    /**
     * An emitter of events for operations performed on this target.
     */
    abstract readonly rikeEvents: EventEmitter<RikeEvent>;

    /**
     * An operations data type to use by default.
     *
     * This is the data type to the [Rike.target] method.
     */
    abstract readonly dataType: DataType<IN, OUT>;

    /**
     * Constructs an operation on this target, which produces responses of type `T`.
     *
     * The target data type (_dataType_) passed to the [Rike.target] will be used to encode/decode operation data.
     *
     * @param name operation name.
     */
    abstract operation(name: string): RikeOperation<IN, OUT>;

    /**
     * Constructs an operation on this target, which produces responses of the given type.
     *
     * @param name operation name.
     * @param dataType operation data type.
     */
    abstract operation<IN, OUT>(name: string, dataType: DataType<IN, OUT>): RikeOperation<IN, OUT>;

    /**
     * Constructs an operations on this target, which operates on the given data type passing it as JSON over HTTP.
     *
     * @param name operation name.
     *
     * @return {RikeTarget<T>} new operations target.
     */
    json<T>(name: string): RikeOperation<T, T> {
        return this.operation(name, jsonDataType<T>());
    }

    /**
     * Cancels current operation, if any.
     *
     * @return `true` if operation cancelled, or `false` if there is no operation to cancel.
     */
    abstract cancel(): boolean;

}

//noinspection ReservedWordAsName
/**
 * REST-like resource operation.
 *
 * It basically mimics the `Http` service interface, but also honors global Rike options, and emits events.
 *
 * To initiate operation just call any of the HTTP access methods. Note that operation always belongs to its target
 * and thus two operations could not be initiated simultaneously.
 *
 * `IN` is a type of requests this operation accepts.
 * `OUT` is a type of responses this operation produces.
 */
export abstract class RikeOperation<IN, OUT> {

    /**
     * Operation target.
     */
    abstract readonly target: RikeTarget<any, any>;

    /**
     * Operation name.
     */
    abstract readonly name: string;

    /**
     * Operation data type.
     *
     * This data type is based on the one passed to the [RikeTarget.operation], but also honors the default data type
     * set for target.
     */
    abstract readonly dataType: DataType<IN, OUT>;

    abstract readonly options: RequestOptions;

    abstract withOptions(options?: RequestOptionsArgs): this;

    get url(): string | undefined {
        return this.options.url;
    }

    withUrl(url: string): this {
        return this.withOptions({url});
    }

    get method(): RequestMethod | undefined {

        const method = this.options.method;

        return method == null ? undefined : requestMethod(method);
    }

    withMethod(method: string | RequestMethod): this {
        return this.withOptions({method});
    }

    abstract load(url?: string, options?: RequestOptionsArgs): Observable<OUT>;

    abstract send(request: IN, url?: string, options?: RequestOptionsArgs): Observable<OUT>;

    abstract get(url?: string, options?: RequestOptionsArgs): Observable<OUT>;

    abstract post(request: IN, url?: string, options?: RequestOptionsArgs): Observable<OUT>;

    abstract put(request: IN, url?: string, options?: RequestOptionsArgs): Observable<OUT>;

    //noinspection ReservedWordAsName
    abstract delete(url?: string, options?: RequestOptionsArgs): Observable<OUT>;

    abstract patch(request: IN, url?: string, options?: RequestOptionsArgs): Observable<OUT>;

    abstract head(url?: string, options?: RequestOptionsArgs): Observable<OUT>;

}

interface RikeInternals {

    readonly defaultHttpOptions: RequestOptions;

    wrapResponse(
        target: RikeTarget<any, any>,
        operation: RikeOperation<any, any>,
        response: Observable<Response>): Observable<Response>;

}

class RikeTargetImpl<IN, OUT> extends RikeTarget<IN, OUT> {

    private readonly _rikeEvents = new EventEmitter<RikeEvent>();
    private _operation?: RikeOperationEvent;
    private _response?: Observable<Response>;
    private _observer?: Observer<any>;
    private _subscr?: Subscription;

    constructor(
        private _rike: Rike,
        private _internals: RikeInternals,
        private _target: any,
        private _dataType: DataType<IN, OUT>) {
        super();
    }

    get rike(): Rike {
        return this._rike;
    }

    get target(): any {
        return this._target;
    }

    get currentOperation(): string | undefined {
        return this._operation && this._operation.operation;
    }

    get rikeEvents(): EventEmitter<RikeEvent> {
        return this._rikeEvents;
    }

    get internals(): RikeInternals {
        return this._internals;
    }

    get dataType(): DataType<IN, OUT> {
        return this._dataType;
    }

    cancel(): boolean {
        return this._cancel();
    }

    private _cancel(cause?: RikeOperationEvent): boolean {
        if (!this._operation) {
            return false;
        }

        this._response = undefined;
        try {
            if (this._observer) {
                try {

                    const cancel = new RikeCancelEvent(this.target, this._operation.operation, cause);

                    this._observer.error(cancel);
                    this._rikeEvents.error(cancel);
                } catch (e) {
                    this._rikeEvents.error(new RikeErrorEvent(this.target, this._operation.operation, e));
                    throw e;
                } finally {
                    this._operation = undefined;
                    try {
                        this._observer.complete();
                    } finally {
                        this._observer = undefined;
                    }
                }
            }
        } finally {
            if (this._subscr) {
                this._subscr.unsubscribe();
                this._subscr = undefined;
            }
        }

        return true;
    }

    operation(name: string, dataType?: DataType<any, any>): RikeOperation<any, any> {
        return new RikeOperationImpl(
            this,
            name,
            !dataType ? this.dataType : (
                this.dataType as DataType<any, any> === HTTP_RESPONSE_DATA_TYPE
                    ? dataType : new OperationDataType<any, any>(this.dataType, dataType)));
    }

    startOperation(operation: RikeOperation<any, any>): void {

        const event = new RikeOperationEvent(this.target, operation.name);

        this._cancel(event);
        this._rikeEvents.emit(event);
        this._operation = event;
    }

    wrapResponse<IN, OUT>(operation: RikeOperation<IN, OUT>, response: Observable<Response>): Observable<OUT> {
        response = this.internals.wrapResponse(this, operation, response);
        this._response = response;
        return new Observable<OUT>((responseObserver: Observer<OUT>) => {
            if (this._response !== response) {
                return;// Another request already initiated
            }
            this._observer = responseObserver;
            this._subscr = response.subscribe(
                httpResponse => {
                    try {

                        const response = operation.dataType.readResponse(httpResponse);

                        responseObserver.next(response);
                        this._rikeEvents.emit(new RikeSuccessEvent(this.target, operation.name, response));
                    } catch (e) {
                        this._rikeEvents.error(new RikeErrorEvent(this.target, operation.name, e));
                    }
                },
                error => {
                    console.error("[" + this.target + "] " + operation + " failed", error);
                    try {
                        responseObserver.error(error);
                        this._rikeEvents.emit(new RikeErrorEvent(this.target, operation.name, error));
                    } catch (e) {
                        this._rikeEvents.error(new RikeErrorEvent(this.target, operation.name, e));
                    }
                },
                () => {
                    try {
                        responseObserver.complete();
                    } catch (e) {
                        this._rikeEvents.error(new RikeErrorEvent(this.target, operation.name, e));
                    } finally {
                        if (this._subscr) {
                            this._subscr.unsubscribe();
                            this._subscr = undefined;
                            this._response = undefined;
                        }
                    }
                });
        });
    }

}

class OperationDataType<IN, OUT> extends DataType<IN, OUT> {

    constructor(private _targetDataType: DataType<any, any>, private _dataType: DataType<IN, OUT>) {
        super();
    }

    readResponse(response: Response): OUT {
        return this._dataType.readResponse(response);
    }

    prepareRequest(options: RequestOptionsArgs): RequestOptionsArgs {
        options = this._targetDataType.prepareRequest(options);
        return this._dataType.prepareRequest(options);
    }

    writeRequest(request: IN, options: RequestOptionsArgs): RequestOptionsArgs {
        return this._dataType.writeRequest(request, options);
    }

}

class RikeOperationImpl<IN, OUT> extends RikeOperation<IN, OUT> {

    private _options: RequestOptions;

    constructor(
        private _target: RikeTargetImpl<any, any>,
        private _name: string,
        private _dataType: DataType<IN, OUT>) {
        super();
        this._options = _target.internals.defaultHttpOptions.merge();
    }

    get rike(): Rike {
        return this.target.rike;
    }

    get target(): RikeTargetImpl<any, any> {
        return this._target;
    }

    get name(): string {
        return this._name;
    }

    get dataType(): DataType<IN, OUT> {
        return this._dataType;
    }

    withOptions(options?: RequestOptionsArgs): this {
        if (options) {
            this._options = this._options.merge(options);
        }
        return this;
    }

    get options(): RequestOptions {
        return this._options;
    }

    load(url?: string, options?: RequestOptionsArgs): Observable<OUT> {
        try {
            this.startOperation();
            options = this.requestOptions(undefined, url, options);
            return this.wrapResponse(this.rike.request(this.requestUrl(url, options), options));
        } catch (e) {
            this.target.rikeEvents.error(new RikeErrorEvent(this.target, this.name, e));
            throw e;
        }
    }

    send(request: IN, url?: string, options?: RequestOptionsArgs): Observable<OUT> {
        try {
            this.startOperation();
            options = this.writeRequest(request, this.requestOptions(undefined, url, options));
            return this.wrapResponse(this.rike.request(this.requestUrl(url, options), options));
        } catch (e) {
            this.target.rikeEvents.error(new RikeErrorEvent(this.target, this.name, e));
            throw e;
        }
    }

    get(url?: string, options?: RequestOptionsArgs): Observable<OUT> {
        try {
            this.startOperation();
            options = this.requestOptions(RequestMethod.Get, url, options);
            return this.wrapResponse(this.rike.get(this.requestUrl(url, options), options));
        } catch (e) {
            this.target.rikeEvents.error(new RikeErrorEvent(this.target, this.name, e));
            throw e;
        }
    }

    post(request: IN, url?: string, options?: RequestOptionsArgs): Observable<OUT> {
        try {
            this.startOperation();
            options = this.writeRequest(request, this.requestOptions(RequestMethod.Post, url, options));
            return this.wrapResponse(this.rike.post(this.requestUrl(url, options), options.body, options));
        } catch (e) {
            this.target.rikeEvents.error(new RikeErrorEvent(this.target, this.name, e));
            throw e;
        }
    }

    put(request: IN, url?: string, options?: RequestOptionsArgs): Observable<OUT> {
        try {
            this.startOperation();
            options = this.writeRequest(request, this.requestOptions(RequestMethod.Put, url, options));
            return this.wrapResponse(this.rike.put(this.requestUrl(url, options), options.body, options));
        } catch (e) {
            this.target.rikeEvents.error(new RikeErrorEvent(this.target, this.name, e));
            throw e;
        }
    }

    //noinspection ReservedWordAsName
    delete(url?: string, options?: RequestOptionsArgs): Observable<OUT> {
        try {
            this.startOperation();
            options = this.requestOptions(RequestMethod.Delete, url, options);
            return this.wrapResponse(this.rike.delete(this.requestUrl(url, options), options));
        } catch (e) {
            this.target.rikeEvents.error(new RikeErrorEvent(this.target, this.name, e));
            throw e;
        }
    }

    patch(request: IN, url?: string, options?: RequestOptionsArgs): Observable<OUT> {
        try {
            this.startOperation();
            options = this.writeRequest(request, this.requestOptions(RequestMethod.Patch, url, options));
            return this.wrapResponse(this.rike.patch(this.requestUrl(url, options), options.body, options));
        } catch (e) {
            this.target.rikeEvents.error(new RikeErrorEvent(this.target, this.name, e));
            throw e;
        }
    }

    head(url?: string, options?: RequestOptionsArgs): Observable<OUT> {
        try {
            this.startOperation();
            options = this.requestOptions(RequestMethod.Head, url, options);
            return this.wrapResponse(this.rike.head(this.requestUrl(url, options), options));
        } catch (e) {
            this.target.rikeEvents.error(new RikeErrorEvent(this.target, this.name, e));
            throw e;
        }
    }

    private startOperation() {
        this.target.startOperation(this);
    }

    //noinspection JSMethodCanBeStatic
    private requestUrl(url: string | undefined, options: RequestOptionsArgs): string {
        if (url != null) {
            return url;
        }
        if (options.url != null) {
            return options.url;
        }
        throw new Error("Request URL not specified");
    }

    private requestOptions(method?: RequestMethod, url?: string, options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            options = {url, method};
        } else {
            options = new RequestOptions(options).merge({url, method});
        }

        return this.dataType.prepareRequest(this.options.merge(options));
    }

    private writeRequest(request: IN, options: RequestOptionsArgs): RequestOptionsArgs {
        options = this.dataType.writeRequest(request, options);
        return options;
    }

    private wrapResponse(response: Observable<Response>): Observable<OUT> {
        return this.target.wrapResponse(this, response);
    }

}
