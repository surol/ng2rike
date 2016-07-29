var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
System.register("ng2-rike/event", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RikeEventSource, RikeEvent, RikeOperationEvent, RikeSuccessEvent, RikeErrorEvent, RikeCancelEvent;
    return {
        setters:[],
        execute: function() {
            /**
             * REST-like resource access event emitter.
             *
             * Multiple instances of this class could be injected into controller or service to listen for Rike events.
             */
            RikeEventSource = (function () {
                function RikeEventSource() {
                }
                /**
                 * Constructs provider recipe for [RikeEventSource]
                 *
                 * @param useClass
                 * @param useValue
                 * @param useExisting
                 * @param useFactory
                 * @param deps
                 *
                 * @return new provider recipe.
                 */
                RikeEventSource.provide = function (_a) {
                    var useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps;
                    return {
                        provide: RikeEventSource,
                        multi: true,
                        useClass: useClass,
                        useValue: useValue,
                        useExisting: useExisting,
                        useFactory: useFactory,
                        deps: deps,
                    };
                };
                ;
                return RikeEventSource;
            }());
            exports_1("RikeEventSource", RikeEventSource);
            /**
             * Basic REST-like resource access event.
             *
             * Such events are emitted by [Rike event sources][RikeEventsSource].
             */
            RikeEvent = (function () {
                function RikeEvent() {
                }
                Object.defineProperty(RikeEvent.prototype, "target", {
                    /**
                     * Operation target.
                     */
                    get: function () {
                        return this.operation.target;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeEvent.prototype, "cancel", {
                    /**
                     * Whether this is an operation cancel.
                     *
                     * @return {boolean} `true` if operation cancelled, or `false` otherwise.
                     */
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RikeEvent;
            }());
            exports_1("RikeEvent", RikeEvent);
            /**
             * An event emitted when operation on a REST-like resource is started.
             */
            RikeOperationEvent = (function (_super) {
                __extends(RikeOperationEvent, _super);
                function RikeOperationEvent(_operation) {
                    _super.call(this);
                    this._operation = _operation;
                }
                Object.defineProperty(RikeOperationEvent.prototype, "operation", {
                    get: function () {
                        return this._operation;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeOperationEvent.prototype, "complete", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeOperationEvent.prototype, "error", {
                    get: function () {
                        return undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeOperationEvent.prototype, "cancelledBy", {
                    get: function () {
                        return undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeOperationEvent.prototype, "result", {
                    get: function () {
                        return undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RikeOperationEvent;
            }(RikeEvent));
            exports_1("RikeOperationEvent", RikeOperationEvent);
            /**
             * An event emitted when operation on a REST-like resource is successfully completed.
             */
            RikeSuccessEvent = (function (_super) {
                __extends(RikeSuccessEvent, _super);
                function RikeSuccessEvent(_operation, _result) {
                    _super.call(this);
                    this._operation = _operation;
                    this._result = _result;
                }
                Object.defineProperty(RikeSuccessEvent.prototype, "operation", {
                    get: function () {
                        return this._operation;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeSuccessEvent.prototype, "complete", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeSuccessEvent.prototype, "error", {
                    get: function () {
                        return undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeSuccessEvent.prototype, "cancelledBy", {
                    get: function () {
                        return undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeSuccessEvent.prototype, "result", {
                    get: function () {
                        return this._result;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RikeSuccessEvent;
            }(RikeEvent));
            exports_1("RikeSuccessEvent", RikeSuccessEvent);
            /**
             * An event emitted when operation on a REST-like resource is failed.
             *
             * An object of this type is also reported as an error when some internal exception occurs.
             */
            RikeErrorEvent = (function (_super) {
                __extends(RikeErrorEvent, _super);
                function RikeErrorEvent(_operation, _error) {
                    _super.call(this);
                    this._operation = _operation;
                    this._error = _error;
                }
                Object.defineProperty(RikeErrorEvent.prototype, "operation", {
                    get: function () {
                        return this._operation;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeErrorEvent.prototype, "complete", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeErrorEvent.prototype, "error", {
                    get: function () {
                        return this._error;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeErrorEvent.prototype, "cancelledBy", {
                    get: function () {
                        return undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeErrorEvent.prototype, "result", {
                    get: function () {
                        return undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RikeErrorEvent;
            }(RikeEvent));
            exports_1("RikeErrorEvent", RikeErrorEvent);
            /**
             * An event emitted when operation on a REST-like resource is cancelled.
             */
            RikeCancelEvent = (function (_super) {
                __extends(RikeCancelEvent, _super);
                function RikeCancelEvent(operation, _cancelledBy) {
                    _super.call(this, operation, _cancelledBy || "cancel");
                    this._cancelledBy = _cancelledBy;
                }
                Object.defineProperty(RikeCancelEvent.prototype, "error", {
                    get: function () {
                        return this.cancelledBy;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeCancelEvent.prototype, "cancel", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeCancelEvent.prototype, "cancelledBy", {
                    get: function () {
                        return this._cancelledBy;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RikeCancelEvent;
            }(RikeErrorEvent));
            exports_1("RikeCancelEvent", RikeCancelEvent);
        }
    }
});
System.register("ng2-rike/status", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var DEFAULT_STATUS_LABELS, RikeStatus;
    function labelOf(status, labels) {
        if (!labels) {
            return undefined;
        }
        var end = status.end;
        if (!end) {
            var processing = evalLabel(status, labels.processing);
            return processing && { label: processing, processing: true };
        }
        if (end.cancel) {
            var cancelled = evalLabel(status, labels.cancelled);
            return cancelled && { label: cancelled, cancelled: true };
        }
        if (end.error) {
            var failed = evalLabel(status, labels.failed);
            return failed && { label: failed, failed: true };
        }
        var succeed = evalLabel(status, labels.succeed);
        return succeed && { label: succeed, succeed: true };
    }
    function evalLabel(status, label) {
        if (!label) {
            return undefined;
        }
        if (typeof label !== "function") {
            return label;
        }
        var labelFn = label;
        return labelFn(status.start.target);
    }
    function combineLabels(combined, label) {
        if (!label) {
            return combined;
        }
        var lbl = label.label;
        if (!combined) {
            return {
                labels: [lbl],
                processing: label.processing,
                failed: label.failed,
                cancelled: label.cancelled,
                succeed: label.succeed,
            };
        }
        combined.processing = combined.processing || label.processing;
        combined.failed = combined.failed || label.failed;
        combined.cancelled = combined.cancelled || label.cancelled;
        combined.succeed = combined.succeed || label.succeed;
        for (var _i = 0, _a = combined.labels; _i < _a.length; _i++) {
            var l = _a[_i];
            if (l === lbl) {
                return combined;
            }
        }
        combined.labels.push(lbl);
        return combined;
    }
    return {
        setters:[],
        execute: function() {
            exports_2("DEFAULT_STATUS_LABELS", DEFAULT_STATUS_LABELS = {
                "*": {
                    processing: "Processing",
                    failed: "Error",
                    cancelled: "Cancelled"
                },
                "load": {
                    processing: "Loading",
                },
                "send": {
                    processing: "Sending",
                    succeed: "Sent",
                },
                "read": {
                    processing: "Loading",
                },
                "create": {
                    processing: "Creating",
                    succeed: "Created",
                },
                "update": {
                    processing: "Updating",
                    succeed: "Updated"
                },
                "delete": {
                    processing: "Deleting",
                    succeed: "Deleted",
                },
            });
            RikeStatus = (function () {
                function RikeStatus() {
                    this._targetStatuses = {};
                    this._labels = {};
                }
                RikeStatus.prototype.subscribeOn = function (events) {
                    var _this = this;
                    events.subscribe(function (event) { return _this.applyEvent(event); });
                };
                RikeStatus.prototype.withLabels = function (operation, labels) {
                    var id;
                    if (!labels) {
                        id = "*";
                        labels = operation;
                    }
                    else {
                        id = operation;
                    }
                    this._combined = undefined;
                    this._labels[id] = labels;
                    return this;
                };
                Object.defineProperty(RikeStatus.prototype, "labels", {
                    get: function () {
                        return this.combined && this.combined.labels || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeStatus.prototype, "processing", {
                    get: function () {
                        return this.combined && this.combined.processing || false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeStatus.prototype, "failed", {
                    get: function () {
                        return this.combined && this.combined.failed || false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeStatus.prototype, "cancelled", {
                    get: function () {
                        return this.combined && this.combined.cancelled || false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeStatus.prototype, "succeed", {
                    get: function () {
                        return this.combined && this.combined.succeed || false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeStatus.prototype, "combined", {
                    get: function () {
                        if (this._combined) {
                            return this._combined;
                        }
                        var combined = undefined;
                        for (var targetId in this._targetStatuses) {
                            if (this._targetStatuses.hasOwnProperty(targetId)) {
                                var targetStatus = this._targetStatuses[targetId];
                                if (!targetStatus) {
                                    continue;
                                }
                                combined = combineLabels(combined, this.labelFor(targetStatus));
                            }
                        }
                        return this._combined = combined;
                    },
                    enumerable: true,
                    configurable: true
                });
                RikeStatus.prototype.labelFor = function (status) {
                    var operationName = status.start.operation.name;
                    var label = labelOf(status, this._labels[operationName]) || labelOf(status, this._labels["*"]);
                    if (label) {
                        return label;
                    }
                    var defaultLabels = status.start.target.rike.options.defaultStatusLabels || DEFAULT_STATUS_LABELS;
                    return labelOf(status, defaultLabels[operationName]) || labelOf(status, defaultLabels["*"]);
                };
                RikeStatus.prototype.applyEvent = function (event) {
                    this._combined = undefined;
                    var uniqueId = event.target.uniqueId;
                    if (!event.complete) {
                        this._targetStatuses[uniqueId] = {
                            start: event,
                        };
                    }
                    else {
                        var targetStatus = this._targetStatuses[uniqueId];
                        if (!targetStatus) {
                            this._targetStatuses[uniqueId] = { start: event, end: event };
                        }
                        else {
                            targetStatus.end = event;
                        }
                    }
                };
                return RikeStatus;
            }());
            exports_2("RikeStatus", RikeStatus);
        }
    }
});
System.register("ng2-rike/options", ["ng2-rike/status"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var status_1;
    var RikeOptions, BaseRikeOptions, DEFAULT_RIKE_OPTIONS;
    /**
     * Constructs URL relative to base URL.
     *
     * @param baseUrl base URL.
     * @param url URL.
     *
     * @returns {string} If `baseUrl` is not specified, or empty string, or `url` is absolute, then returns unmodified `url`.
     * Otherwise concatenates `baseUrl` and `url` separating them by `/` sign.
     */
    function relativeUrl(baseUrl, url) {
        if (!baseUrl) {
            return url;
        }
        if (url[0] === "/") {
            return url; // Absolute URL
        }
        if (url.match(/^(\w*:)?\/\//)) {
            return url; // Full URL
        }
        return baseUrl + "/" + url;
    }
    exports_3("relativeUrl", relativeUrl);
    return {
        setters:[
            function (status_1_1) {
                status_1 = status_1_1;
            }],
        execute: function() {
            /**
             * Global Rike options.
             *
             * To overwrite global options add a provider for [BaseRikeOptions] instance with [RikeOptions] as a key:
             * ```ts
             * bootstrap(AppComponent, {provide: RikeOptions, new BaseRikeOptions({baseDir: "/rike"})});
             * ```
             */
            RikeOptions = (function () {
                function RikeOptions() {
                }
                /**
                 * Constructs URL relative to `baseUrl`.
                 *
                 * @param url URL
                 *
                 * @returns {string} resolved URL.
                 */
                RikeOptions.prototype.relativeUrl = function (url) {
                    return relativeUrl(this.baseUrl, url);
                };
                return RikeOptions;
            }());
            exports_3("RikeOptions", RikeOptions);
            /**
             * Basic [global resource options][RikeOptions] implementation.
             *
             * Can be used to override the global resource options.
             */
            BaseRikeOptions = (function (_super) {
                __extends(BaseRikeOptions, _super);
                function BaseRikeOptions(opts) {
                    _super.call(this);
                    this._defaultStatusLabels = status_1.DEFAULT_STATUS_LABELS;
                    if (opts) {
                        this._baseUrl = opts.baseUrl;
                        this._defaultErrorHandler = opts.defaultErrorHandler;
                        if (opts.defaultStatusLabels) {
                            this._defaultStatusLabels = opts.defaultStatusLabels;
                        }
                    }
                }
                Object.defineProperty(BaseRikeOptions.prototype, "baseUrl", {
                    get: function () {
                        return this._baseUrl;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseRikeOptions.prototype, "defaultErrorHandler", {
                    get: function () {
                        return this._defaultErrorHandler;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseRikeOptions.prototype, "defaultStatusLabels", {
                    get: function () {
                        return this._defaultStatusLabels;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseRikeOptions;
            }(RikeOptions));
            exports_3("BaseRikeOptions", BaseRikeOptions);
            /**
             * Default resource options.
             *
             * @type {RikeOptions}
             */
            exports_3("DEFAULT_RIKE_OPTIONS", DEFAULT_RIKE_OPTIONS = new BaseRikeOptions());
        }
    }
});
System.register("ng2-rike/protocol", ["@angular/http"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var http_1;
    var Protocol, PrepareRequestProtocol, WriteRequestProtocol, ReadResponseProtocol, HandleErrorProtocol, JsonProtocol, JSON_PROTOCOL, jsonProtocol, HttpProtocol, HTTP_PROTOCOL;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            /**
             * REST-like operations protocol.
             *
             * It is used by REST-like operations to encode operation requests to HTTP, decode operation responses from HTTP,
             * and handle errors.
             *
             * `IN` is operation request type.
             * `OUT` is operation response type.
             */
            Protocol = (function () {
                function Protocol() {
                }
                //noinspection JSMethodCanBeStatic
                /**
                 * Prepares HTTP request.
                 *
                 * The `options` passed have at least `url` and `method` fields set.
                 *
                 * This method is called for each HTTP request before _writeRequest_ method. When default protocol is set for
                 * operation target, this method is called first on the default protocol, and then - on the operation protocol.
                 *
                 * @param options original HTTP request options.
                 *
                 * @returns modified HTTP request options to use further instead of original ones. Returns unmodified request
                 * `options` by default.
                 */
                Protocol.prototype.prepareRequest = function (options) {
                    return options;
                };
                /**
                 * Constructs new protocol based on this one, which prepares the request with the given function.
                 *
                 * @param prepare a request preparation function invoked in addition to `this.prepareRequest` method.
                 * @param after `true` to call the `prepare` function after `this.prepareRequest` method,
                 * otherwise it will be called before `this.prepareRequest()` method
                 *
                 * @return {Protocol<IN, OUT>} new protocol.
                 */
                Protocol.prototype.prepareRequestWith = function (prepare, after) {
                    return new PrepareRequestProtocol(this, prepare, after);
                };
                /**
                 * Constructs new protocol based on this one, which writes the request with the given function.
                 *
                 * @param writeRequest new request writer function.
                 *
                 * @return {Protocol<IN, OUT>} new protocol.
                 */
                Protocol.prototype.writeRequestWith = function (writeRequest) {
                    return new WriteRequestProtocol(this, writeRequest);
                };
                /**
                 * Constructs new protocol based on this one, which updates request options with the given function. The request
                 * will be written with original `writeRequest()` method.
                 *
                 * @param updateRequest a function updating request options in addition to `this.writeRequest()` method.
                 * @param after `true` to invoke `updateRequest` function after `this.writeRequest()` method, otherwise it will be
                 * invoked before the `this.writeRequest()` method.
                 *
                 * @return {Protocol<IN, OUT>} new protocol.
                 */
                Protocol.prototype.updateRequestWith = function (updateRequest, after) {
                    var _this = this;
                    return new WriteRequestProtocol(this, function (request, args) {
                        if (!after) {
                            return _this.writeRequest(request, updateRequest(request, args));
                        }
                        return updateRequest(request, _this.writeRequest(request, args));
                    });
                };
                /**
                 * Constructs new protocol based on this one, which reads responses with the given function.
                 *
                 * @param readResponse new response reader function.
                 *
                 * @return {Protocol<IN, OUT>} new protocol.
                 */
                Protocol.prototype.readResponseWith = function (readResponse) {
                    return new ReadResponseProtocol(this, readResponse);
                };
                /**
                 * Constructs new protocol based on this one, which handles errors with the given function.
                 *
                 * @param errorHandler
                 *
                 * @return {Protocol<IN, OUT>} new protocol.
                 */
                Protocol.prototype.handleErrorWith = function (errorHandler) {
                    return new HandleErrorProtocol(this, errorHandler);
                };
                return Protocol;
            }());
            exports_4("Protocol", Protocol);
            PrepareRequestProtocol = (function (_super) {
                __extends(PrepareRequestProtocol, _super);
                function PrepareRequestProtocol(_protocol, _prepare, _after) {
                    _super.call(this);
                    this._protocol = _protocol;
                    this._prepare = _prepare;
                    this._after = _after;
                    this.handleError = this._protocol.handleError;
                }
                PrepareRequestProtocol.prototype.prepareRequest = function (options) {
                    if (this._after) {
                        return this._prepare(this._protocol.prepareRequest(options));
                    }
                    return this._protocol.prepareRequest(this._prepare(options));
                };
                PrepareRequestProtocol.prototype.writeRequest = function (request, options) {
                    return this._protocol.writeRequest(request, options);
                };
                PrepareRequestProtocol.prototype.readResponse = function (response) {
                    return this._protocol.readResponse(response);
                };
                return PrepareRequestProtocol;
            }(Protocol));
            WriteRequestProtocol = (function (_super) {
                __extends(WriteRequestProtocol, _super);
                function WriteRequestProtocol(_responseProtocol, _writeRequest) {
                    _super.call(this);
                    this._responseProtocol = _responseProtocol;
                    this._writeRequest = _writeRequest;
                    this.handleError = this._responseProtocol.handleError;
                }
                WriteRequestProtocol.prototype.prepareRequest = function (options) {
                    return this._responseProtocol.prepareRequest(options);
                };
                WriteRequestProtocol.prototype.writeRequest = function (request, options) {
                    return this._writeRequest(request, options);
                };
                WriteRequestProtocol.prototype.readResponse = function (response) {
                    return this._responseProtocol.readResponse(response);
                };
                return WriteRequestProtocol;
            }(Protocol));
            ReadResponseProtocol = (function (_super) {
                __extends(ReadResponseProtocol, _super);
                function ReadResponseProtocol(_requestProtocol, _readResponse) {
                    _super.call(this);
                    this._requestProtocol = _requestProtocol;
                    this._readResponse = _readResponse;
                    this.handleError = this._requestProtocol.handleError;
                }
                ReadResponseProtocol.prototype.prepareRequest = function (options) {
                    return this._requestProtocol.prepareRequest(options);
                };
                ReadResponseProtocol.prototype.writeRequest = function (request, options) {
                    return this._requestProtocol.writeRequest(request, options);
                };
                ReadResponseProtocol.prototype.readResponse = function (response) {
                    return this._readResponse(response);
                };
                ReadResponseProtocol.prototype.readResponseWith = function (readResponse) {
                    return new ReadResponseProtocol(this._requestProtocol, readResponse);
                };
                return ReadResponseProtocol;
            }(Protocol));
            HandleErrorProtocol = (function (_super) {
                __extends(HandleErrorProtocol, _super);
                function HandleErrorProtocol(_protocol, handleError) {
                    _super.call(this);
                    this._protocol = _protocol;
                    this.handleError = handleError;
                }
                HandleErrorProtocol.prototype.prepareRequest = function (options) {
                    return this._protocol.prepareRequest(options);
                };
                HandleErrorProtocol.prototype.writeRequest = function (request, options) {
                    return this._protocol.writeRequest(request, options);
                };
                HandleErrorProtocol.prototype.readResponse = function (response) {
                    return this._protocol.readResponse(response);
                };
                HandleErrorProtocol.prototype.handleErrorWith = function (errorHandler) {
                    return new HandleErrorProtocol(this._protocol, errorHandler);
                };
                return HandleErrorProtocol;
            }(Protocol));
            JsonProtocol = (function (_super) {
                __extends(JsonProtocol, _super);
                function JsonProtocol() {
                    _super.apply(this, arguments);
                }
                JsonProtocol.prototype.writeRequest = function (request, options) {
                    var opts = new http_1.RequestOptions(options).merge({ body: JSON.stringify(request) });
                    var headers;
                    if (opts.headers) {
                        headers = opts.headers;
                    }
                    else {
                        opts.headers = headers = new http_1.Headers();
                    }
                    headers.set("Content-Type", "application/json");
                    return opts;
                };
                JsonProtocol.prototype.readResponse = function (response) {
                    return response.json();
                };
                return JsonProtocol;
            }(Protocol));
            /**
             * JSON protocol.
             *
             * Sends and receives arbitrary data as JSON over HTTP.
             *
             * @type {Protocol<any>}
             */
            exports_4("JSON_PROTOCOL", JSON_PROTOCOL = new JsonProtocol());
            /**
             * Returns JSON protocol.
             *
             * Sends and receives the data of the given type as JSON over HTTP.
             */
            exports_4("jsonProtocol", jsonProtocol = function () { return JSON_PROTOCOL; });
            HttpProtocol = (function (_super) {
                __extends(HttpProtocol, _super);
                function HttpProtocol() {
                    _super.apply(this, arguments);
                }
                HttpProtocol.prototype.writeRequest = function (request, options) {
                    return new http_1.RequestOptions(options).merge({ body: request });
                };
                HttpProtocol.prototype.readResponse = function (response) {
                    return response;
                };
                return HttpProtocol;
            }(Protocol));
            /**
             * HTTP protocol.
             *
             * The request type is any. It is used as request body.
             *
             * @type {Protocol<any, Response>}
             */
            exports_4("HTTP_PROTOCOL", HTTP_PROTOCOL = new HttpProtocol());
        }
    }
});
System.register("ng2-rike/rike", ["@angular/core", "@angular/http", "rxjs/Rx", "ng2-rike/event", "ng2-rike/options", "ng2-rike/protocol"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_1, http_2, Rx_1, event_1, options_1, protocol_1;
    var REQUEST_METHODS, Rike, RikeTarget, RikeOperation, RikeTargetImpl, RikeOperationImpl;
    function requestMethod(method) {
        if (typeof method !== "string") {
            return method;
        }
        var result = REQUEST_METHODS[method.toUpperCase()];
        if (result != null) {
            return result;
        }
        throw new Error("Unsupported HTTP request method: " + method);
    }
    exports_5("requestMethod", requestMethod);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (event_1_1) {
                event_1 = event_1_1;
            },
            function (options_1_1) {
                options_1 = options_1_1;
            },
            function (protocol_1_1) {
                protocol_1 = protocol_1_1;
            }],
        execute: function() {
            REQUEST_METHODS = {
                "GET": http_2.RequestMethod.Get,
                "POST": http_2.RequestMethod.Post,
                "PUT": http_2.RequestMethod.Put,
                "DELETE": http_2.RequestMethod.Delete,
                "OPTIONS": http_2.RequestMethod.Options,
                "HEAD": http_2.RequestMethod.Head,
                "PATCH": http_2.RequestMethod.Patch,
            };
            /**
             * REST-like resource operations service.
             *
             * This service can be injected to other services or components.
             *
             * It basically mimics the `Http` interface, but also honors [global Rike options][RikeOptions].
             *
             * It can also be used to perform operations on particular targets.
             */
            Rike = (function () {
                function Rike(_http, defaultHttpOptions, _options) {
                    var _this = this;
                    this._http = _http;
                    this._rikeEvents = new core_1.EventEmitter();
                    this._uniqueIdSeq = 0;
                    this._options = _options || options_1.DEFAULT_RIKE_OPTIONS;
                    this._internals = {
                        defaultHttpOptions: defaultHttpOptions,
                        generateUniqueId: function () {
                            return "" + ++_this._uniqueIdSeq;
                        },
                        request: function (request, options) {
                            options = _this.updateRequestOptions(options);
                            if (typeof request === "string") {
                                request = _this.options.relativeUrl(request);
                            }
                            return _this._http.request(request, options);
                        },
                        get: function (url, options) {
                            return _this._http.get(_this.options.relativeUrl(url), _this.updateRequestOptions(options));
                        },
                        post: function (url, body, options) {
                            return _this._http.post(_this.options.relativeUrl(url), body, _this.updateRequestOptions(options));
                        },
                        put: function (url, body, options) {
                            return _this._http.put(_this.options.relativeUrl(url), body, _this.updateRequestOptions(options));
                        },
                        "delete": function (url, options) {
                            return _this._http.delete(_this.options.relativeUrl(url), _this.updateRequestOptions(options));
                        },
                        patch: function (url, body, options) {
                            return _this._http.patch(_this.options.relativeUrl(url), body, _this.updateRequestOptions(options));
                        },
                        head: function (url, options) {
                            return _this._http.head(_this.options.relativeUrl(url), _this.updateRequestOptions(options));
                        },
                    };
                }
                Object.defineProperty(Rike.prototype, "options", {
                    /**
                     * Global REST-like resource access options.
                     *
                     * @returns {RikeOptions} either pre-configured, or [default][DEFAULT_RIKE_OPTIONS] options.
                     */
                    get: function () {
                        return this._options;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rike.prototype, "rikeEvents", {
                    /**
                     * All REST-like resource operation events emitter.
                     *
                     * @returns {EventEmitter<RikeEvent>}
                     */
                    get: function () {
                        return this._rikeEvents;
                    },
                    enumerable: true,
                    configurable: true
                });
                Rike.prototype.request = function (request, options) {
                    return this.handleErrors(this._internals.request(request, options));
                };
                Rike.prototype.get = function (url, options) {
                    return this.handleErrors(this._internals.get(url, options));
                };
                Rike.prototype.post = function (url, body, options) {
                    return this.handleErrors(this._internals.post(url, body, options));
                };
                Rike.prototype.put = function (url, body, options) {
                    return this.handleErrors(this._internals.put(url, body, options));
                };
                //noinspection ReservedWordAsName
                Rike.prototype.delete = function (url, options) {
                    return this.handleErrors(this._internals.delete(url, options));
                };
                Rike.prototype.patch = function (url, body, options) {
                    return this.handleErrors(this._internals.patch(url, body, options));
                };
                Rike.prototype.head = function (url, options) {
                    return this.handleErrors(this._internals.head(url, options));
                };
                Rike.prototype.target = function (target, protocol) {
                    var _this = this;
                    var proto = protocol || protocol_1.HTTP_PROTOCOL;
                    if (!proto.handleError) {
                        var defaultErrorHandler = this.options.defaultErrorHandler;
                        if (defaultErrorHandler) {
                            proto = proto.handleErrorWith(defaultErrorHandler);
                        }
                    }
                    var rikeTarget = new RikeTargetImpl(this, this._internals, target, proto || protocol_1.HTTP_PROTOCOL);
                    rikeTarget.rikeEvents.subscribe(function (event) { return _this._rikeEvents.emit(event); }, function (error) { return _this._rikeEvents.error(error); }, function () { return _this._rikeEvents.complete(); });
                    return rikeTarget;
                };
                /**
                 * Constructs operations target which operates over [JSON protocol][jsonProtocol].
                 *
                 * @param target arbitrary target value.
                 *
                 * @return {RikeTarget<T>} new operations target.
                 */
                Rike.prototype.json = function (target) {
                    return this.target(target, protocol_1.jsonProtocol());
                };
                /**
                 * Updates HTTP request options accordingly to global _options_.
                 *
                 * @param options HTTP request options to update.
                 *
                 * @returns {RequestOptionsArgs} either new HTTP options instance, or the _options_ argument if no modifications
                 * done.
                 */
                Rike.prototype.updateRequestOptions = function (options) {
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
                            };
                        }
                    }
                    return options;
                };
                //noinspection JSMethodCanBeStatic,JSUnusedLocalSymbols
                /**
                 * Wraps the HTTP response observable for the given operation to make it handle errors.
                 *
                 * @param response response observer to wrap.
                 *
                 * @returns {Observable<Response>} response observer wrapper.
                 */
                Rike.prototype.handleErrors = function (response) {
                    var handleError = this.options.defaultErrorHandler;
                    if (!handleError) {
                        return response;
                    }
                    return new Rx_1.Observable(function (responseObserver) {
                        response.subscribe(function (httpResponse) { return responseObserver.next(httpResponse); }, function (error) { return responseObserver.error(handleError(error)); }, function () { return responseObserver.complete(); });
                    });
                };
                Rike = __decorate([
                    core_1.Injectable(),
                    __param(2, core_1.Optional()), 
                    __metadata('design:paramtypes', [http_2.Http, http_2.RequestOptions, options_1.RikeOptions])
                ], Rike);
                return Rike;
            }());
            exports_5("Rike", Rike);
            /**
             * REST-like operations target.
             *
             * Operation targets are created using [Rike.target] method. The actual operations should be created first with
             * `operation` method.
             *
             * Only one operation can be performed on a target at a time. Whenever a new operation on the same target is initiated,
             * the previous one is cancelled.
             *
             * `IN` is a request type this target's operations accept by default.
             * `OUT` is a response type this target's operations return by default.
             */
            RikeTarget = (function () {
                function RikeTarget() {
                }
                /**
                 * Constructs JSON operation on this target.
                 *
                 * It operates over [JSON protocol][jsonProtocol].
                 *
                 * @param name operation name.
                 *
                 * @return {RikeOperation<T, T>} new operation.
                 */
                RikeTarget.prototype.json = function (name) {
                    return this.operation(name, protocol_1.jsonProtocol());
                };
                return RikeTarget;
            }());
            exports_5("RikeTarget", RikeTarget);
            //noinspection ReservedWordAsName
            /**
             * REST-like resource operation.
             *
             * It operates over the given protocol and emits events.
             *
             * To initiate operation just call any of the HTTP access methods. Note that operation always belongs to its target
             * and thus two operations could not be initiated simultaneously.
             *
             * `IN` is a type of requests this operation accepts.
             * `OUT` is a type of responses this operation produces.
             */
            RikeOperation = (function () {
                function RikeOperation() {
                }
                Object.defineProperty(RikeOperation.prototype, "url", {
                    get: function () {
                        return this.options.url;
                    },
                    enumerable: true,
                    configurable: true
                });
                RikeOperation.prototype.withUrl = function (url) {
                    return this.withOptions({ url: url });
                };
                Object.defineProperty(RikeOperation.prototype, "method", {
                    get: function () {
                        var method = this.options.method;
                        return method == null ? undefined : requestMethod(method);
                    },
                    enumerable: true,
                    configurable: true
                });
                RikeOperation.prototype.withMethod = function (method) {
                    return this.withOptions({ method: method });
                };
                return RikeOperation;
            }());
            exports_5("RikeOperation", RikeOperation);
            RikeTargetImpl = (function (_super) {
                __extends(RikeTargetImpl, _super);
                function RikeTargetImpl(_rike, _internals, _target, _protocol) {
                    _super.call(this);
                    this._rike = _rike;
                    this._internals = _internals;
                    this._target = _target;
                    this._protocol = _protocol;
                    this._rikeEvents = new core_1.EventEmitter();
                    this._uniqueId = _internals.generateUniqueId();
                }
                Object.defineProperty(RikeTargetImpl.prototype, "rike", {
                    get: function () {
                        return this._rike;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeTargetImpl.prototype, "target", {
                    get: function () {
                        return this._target;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeTargetImpl.prototype, "uniqueId", {
                    get: function () {
                        return this._uniqueId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeTargetImpl.prototype, "currentOperation", {
                    get: function () {
                        return this._operation && this._operation.operation;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeTargetImpl.prototype, "rikeEvents", {
                    get: function () {
                        return this._rikeEvents;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeTargetImpl.prototype, "internals", {
                    get: function () {
                        return this._internals;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeTargetImpl.prototype, "protocol", {
                    get: function () {
                        return this._protocol;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeTargetImpl.prototype, "baseUrl", {
                    get: function () {
                        return this._baseUrl;
                    },
                    enumerable: true,
                    configurable: true
                });
                RikeTargetImpl.prototype.withBaseUrl = function (url) {
                    this._baseUrl = url;
                    return this;
                };
                RikeTargetImpl.prototype.cancel = function () {
                    return this._cancel();
                };
                RikeTargetImpl.prototype._cancel = function (cause) {
                    if (!this._operation) {
                        return false;
                    }
                    this._response = undefined;
                    try {
                        if (this._observer) {
                            try {
                                var cancel = new event_1.RikeCancelEvent(this._operation.operation, cause);
                                this._observer.error(cancel);
                                this._rikeEvents.error(cancel);
                            }
                            catch (e) {
                                this._rikeEvents.error(new event_1.RikeErrorEvent(this._operation.operation, e));
                                throw e;
                            }
                            finally {
                                this._operation = undefined;
                                try {
                                    this._observer.complete();
                                }
                                finally {
                                    this._observer = undefined;
                                }
                            }
                        }
                    }
                    finally {
                        if (this._subscr) {
                            this._subscr.unsubscribe();
                            this._subscr = undefined;
                        }
                    }
                    return true;
                };
                RikeTargetImpl.prototype.operation = function (name, protocol) {
                    var _this = this;
                    return new RikeOperationImpl(this, name, !protocol ? this.protocol : (this.protocol === protocol_1.HTTP_PROTOCOL
                        ? protocol : protocol.prepareRequestWith(function (options) { return _this.protocol.prepareRequest(options); })));
                };
                RikeTargetImpl.prototype.startOperation = function (operation) {
                    var event = new event_1.RikeOperationEvent(operation);
                    this._cancel(event);
                    this._rikeEvents.emit(event);
                    this._operation = event;
                };
                RikeTargetImpl.prototype.wrapResponse = function (operation, response) {
                    var _this = this;
                    this._response = response;
                    return new Rx_1.Observable(function (responseObserver) {
                        if (_this._response !== response) {
                            return; // Another request already initiated
                        }
                        _this._observer = responseObserver;
                        var cleanup = function () {
                            _this._response = undefined;
                            _this._operation = undefined;
                            if (_this._subscr) {
                                _this._subscr.unsubscribe();
                                _this._subscr = undefined;
                            }
                        };
                        _this._subscr = response.subscribe(function (httpResponse) {
                            try {
                                var response_1 = operation.protocol.readResponse(httpResponse);
                                responseObserver.next(response_1);
                                _this._rikeEvents.emit(new event_1.RikeSuccessEvent(operation, response_1));
                            }
                            catch (e) {
                                _this._rikeEvents.error(new event_1.RikeErrorEvent(operation, e));
                            }
                        }, function (error) {
                            console.error("[" + _this.target + "] " + operation.name + " failed", error);
                            try {
                                responseObserver.error(error);
                                _this._rikeEvents.emit(new event_1.RikeErrorEvent(operation, error));
                            }
                            catch (e) {
                                _this._rikeEvents.error(new event_1.RikeErrorEvent(operation, e));
                            }
                            finally {
                                cleanup();
                            }
                        }, function () {
                            try {
                                responseObserver.complete();
                            }
                            catch (e) {
                                _this._rikeEvents.error(new event_1.RikeErrorEvent(operation, e));
                            }
                            finally {
                                cleanup();
                            }
                        });
                    });
                };
                RikeTargetImpl.prototype.toString = function () {
                    return "RikeTarget[" + this.target + "]";
                };
                return RikeTargetImpl;
            }(RikeTarget));
            RikeOperationImpl = (function (_super) {
                __extends(RikeOperationImpl, _super);
                function RikeOperationImpl(_target, _name, _protocol) {
                    _super.call(this);
                    this._target = _target;
                    this._name = _name;
                    this._protocol = _protocol;
                    this._options = _target.internals.defaultHttpOptions.merge();
                }
                Object.defineProperty(RikeOperationImpl.prototype, "rike", {
                    get: function () {
                        return this.target.rike;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeOperationImpl.prototype, "internals", {
                    get: function () {
                        return this.target.internals;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeOperationImpl.prototype, "target", {
                    get: function () {
                        return this._target;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeOperationImpl.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeOperationImpl.prototype, "protocol", {
                    get: function () {
                        return this._protocol;
                    },
                    enumerable: true,
                    configurable: true
                });
                RikeOperationImpl.prototype.withOptions = function (options) {
                    if (options) {
                        this._options = this._options.merge(options);
                    }
                    return this;
                };
                Object.defineProperty(RikeOperationImpl.prototype, "options", {
                    get: function () {
                        return this._options;
                    },
                    enumerable: true,
                    configurable: true
                });
                RikeOperationImpl.prototype.load = function (url, options) {
                    try {
                        this.startOperation();
                        options = this.requestOptions(undefined, url, options);
                        return this.wrapResponse(this.internals.request(this.requestUrl(options), options));
                    }
                    catch (e) {
                        this.target.rikeEvents.error(new event_1.RikeErrorEvent(this, e));
                        throw e;
                    }
                };
                RikeOperationImpl.prototype.send = function (request, url, options) {
                    try {
                        this.startOperation();
                        options = this.writeRequest(request, this.requestOptions(undefined, url, options));
                        return this.wrapResponse(this.internals.request(this.requestUrl(options), options));
                    }
                    catch (e) {
                        this.target.rikeEvents.error(new event_1.RikeErrorEvent(this, e));
                        throw e;
                    }
                };
                RikeOperationImpl.prototype.get = function (url, options) {
                    try {
                        this.startOperation();
                        options = this.requestOptions(http_2.RequestMethod.Get, url, options);
                        return this.wrapResponse(this.internals.get(this.requestUrl(options), options));
                    }
                    catch (e) {
                        this.target.rikeEvents.error(new event_1.RikeErrorEvent(this, e));
                        throw e;
                    }
                };
                RikeOperationImpl.prototype.post = function (request, url, options) {
                    try {
                        this.startOperation();
                        options = this.writeRequest(request, this.requestOptions(http_2.RequestMethod.Post, url, options));
                        return this.wrapResponse(this.internals.post(this.requestUrl(options), options.body, options));
                    }
                    catch (e) {
                        this.target.rikeEvents.error(new event_1.RikeErrorEvent(this, e));
                        throw e;
                    }
                };
                RikeOperationImpl.prototype.put = function (request, url, options) {
                    try {
                        this.startOperation();
                        options = this.writeRequest(request, this.requestOptions(http_2.RequestMethod.Put, url, options));
                        return this.wrapResponse(this.internals.put(this.requestUrl(options), options.body, options));
                    }
                    catch (e) {
                        this.target.rikeEvents.error(new event_1.RikeErrorEvent(this, e));
                        throw e;
                    }
                };
                //noinspection ReservedWordAsName
                RikeOperationImpl.prototype.delete = function (url, options) {
                    try {
                        this.startOperation();
                        options = this.requestOptions(http_2.RequestMethod.Delete, url, options);
                        return this.wrapResponse(this.internals.delete(this.requestUrl(options), options));
                    }
                    catch (e) {
                        this.target.rikeEvents.error(new event_1.RikeErrorEvent(this, e));
                        throw e;
                    }
                };
                RikeOperationImpl.prototype.patch = function (request, url, options) {
                    try {
                        this.startOperation();
                        options = this.writeRequest(request, this.requestOptions(http_2.RequestMethod.Patch, url, options));
                        return this.wrapResponse(this.internals.patch(this.requestUrl(options), options.body, options));
                    }
                    catch (e) {
                        this.target.rikeEvents.error(new event_1.RikeErrorEvent(this, e));
                        throw e;
                    }
                };
                RikeOperationImpl.prototype.head = function (url, options) {
                    try {
                        this.startOperation();
                        options = this.requestOptions(http_2.RequestMethod.Head, url, options);
                        return this.wrapResponse(this.internals.head(this.requestUrl(options), options));
                    }
                    catch (e) {
                        this.target.rikeEvents.error(new event_1.RikeErrorEvent(this, e));
                        throw e;
                    }
                };
                RikeOperationImpl.prototype.toString = function () {
                    return "RikeOperation[" + this.name + "@" + this.target + "]";
                };
                RikeOperationImpl.prototype.startOperation = function () {
                    this.target.startOperation(this);
                };
                RikeOperationImpl.prototype.requestOptions = function (method, url, options) {
                    if (!options) {
                        options = { url: url, method: method };
                    }
                    else {
                        options = new http_2.RequestOptions(options).merge({ url: url, method: method });
                    }
                    options = this.options.merge(options);
                    if (options.url == null) {
                        options.url = this.target.baseUrl;
                    }
                    else {
                        options.url = options_1.relativeUrl(this.target.baseUrl, options.url);
                    }
                    return this.protocol.prepareRequest(options);
                };
                RikeOperationImpl.prototype.writeRequest = function (request, options) {
                    options = this.protocol.writeRequest(request, options);
                    return options;
                };
                //noinspection JSMethodCanBeStatic
                RikeOperationImpl.prototype.requestUrl = function (options) {
                    if (options.url != null) {
                        return options.url;
                    }
                    throw new Error("Request URL not specified");
                };
                RikeOperationImpl.prototype.wrapResponse = function (response) {
                    return this.target.wrapResponse(this, response);
                };
                return RikeOperationImpl;
            }(RikeOperation));
        }
    }
});
System.register("ng2-rike/status.component", ["@angular/core", "ng2-rike/status"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_2, status_2;
    var RikeStatusComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (status_2_1) {
                status_2 = status_2_1;
            }],
        execute: function() {
            RikeStatusComponent = (function () {
                function RikeStatusComponent(_eventSources) {
                    this._eventSources = _eventSources;
                    this._labelText = function (label) { return label.toString(); };
                }
                Object.defineProperty(RikeStatusComponent.prototype, "rikeStatus", {
                    get: function () {
                        return this._rikeStatus || (this._rikeStatus = this.createStatus());
                    },
                    set: function (status) {
                        this._rikeStatus = status;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeStatusComponent.prototype, "rikeStatusLabels", {
                    get: function () {
                        return this._statusLabels;
                    },
                    set: function (labels) {
                        this._rikeStatus = undefined;
                        this._statusLabels = labels;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeStatusComponent.prototype, "rikeStatusLabelText", {
                    get: function () {
                        return this._labelText;
                    },
                    set: function (value) {
                        this._labelText = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeStatusComponent.prototype, "cssClass", {
                    get: function () {
                        return {
                            "rike-status": true,
                            "rike-status-processing": this.rikeStatus.processing,
                            "rike-status-failed": this.rikeStatus.failed,
                            "rike-status-cancelled": this.rikeStatus.cancelled,
                            "rike-status-succeed": this.rikeStatus.succeed,
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeStatusComponent.prototype, "text", {
                    get: function () {
                        var labels = this.rikeStatus.labels;
                        if (!labels.length) {
                            return undefined;
                        }
                        var text = "";
                        for (var _i = 0, labels_1 = labels; _i < labels_1.length; _i++) {
                            var label = labels_1[_i];
                            var t = this.rikeStatusLabelText(label);
                            if (text) {
                                text += ", ";
                            }
                            text += t;
                        }
                        if (this.rikeStatus.processing) {
                            text += "...";
                        }
                        return text;
                    },
                    enumerable: true,
                    configurable: true
                });
                RikeStatusComponent.prototype.createStatus = function () {
                    var status = new status_2.RikeStatus();
                    this.configureStatus(status);
                    return status;
                };
                RikeStatusComponent.prototype.configureStatus = function (status) {
                    if (this.rikeStatusLabels) {
                        status.withLabels(this.rikeStatusLabels);
                    }
                    for (var _i = 0, _a = this._eventSources; _i < _a.length; _i++) {
                        var esrc = _a[_i];
                        status.subscribeOn(esrc.rikeEvents);
                    }
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', status_2.RikeStatus)
                ], RikeStatusComponent.prototype, "rikeStatus", null);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], RikeStatusComponent.prototype, "rikeStatusLabels", null);
                RikeStatusComponent = __decorate([
                    core_2.Component({
                        selector: '[rikeStatus]',
                        template: "{{text}}",
                        host: {
                            '[ngClass]': 'cssClass'
                        }
                    }), 
                    __metadata('design:paramtypes', [Array])
                ], RikeStatusComponent);
                return RikeStatusComponent;
            }());
            exports_6("RikeStatusComponent", RikeStatusComponent);
        }
    }
});
System.register("ng2-rike/error", ["@angular/http"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var http_3;
    var ErrorResponse;
    /**
     * Converts any object to `ErrorResponse`.
     *
     * If the `error` object is already of type `ErrorResponse` then just returns it.
     *
     * This function can be used as a [error handler][Protocol.handleError] to convert HTTP responses.
     *
     * @param error object to convert.
     *
     * @return {ErrorResponse} constructed error response.
     */
    function toErrorResponse(error) {
        if (error instanceof ErrorResponse) {
            // Error is already of the desired type.
            return error;
        }
        if (error instanceof http_3.Response) {
            var response = error;
            var body = undefined;
            // Attempt to parse JSON body
            if (response.headers.get("Content-Type") === "application/json") {
                try {
                    body = response.json();
                }
                catch (e) {
                    console.log("Failed to parse JSON error response", e);
                }
            }
            var fieldErrors_1 = toFieldErrors(body);
            if (fieldErrors_1) {
                return new ErrorResponse({
                    response: response,
                    errors: fieldErrors_1,
                });
            }
            return defaultErrorResponse(response);
        }
        // Error has `ErrorResponseOpts` interface?
        var errorOpts = error;
        if (errorOpts.response instanceof http_3.Response && errorOpts.errors instanceof Array) {
            return new ErrorResponse(errorOpts);
        }
        var fieldErrors = toFieldErrors(error);
        if (fieldErrors) {
            return new ErrorResponse({
                response: syntheticResponse(null),
                errors: fieldErrors,
            });
        }
        return defaultErrorResponse(syntheticResponse(error));
    }
    exports_7("toErrorResponse", toErrorResponse);
    function syntheticResponse(error) {
        var statusText = error != null ? error.toString() : null;
        return new http_3.Response(new http_3.ResponseOptions({
            type: http_3.ResponseType.Error,
            status: 500,
            statusText: statusText || "Unknown error"
        }));
    }
    function defaultErrorResponse(response) {
        var message = "ERROR " + response.status;
        if (response.statusText && response.statusText.toLowerCase() != "ok") {
            message += ": " + response.statusText;
        }
        return new ErrorResponse({
            response: response,
            errors: { "*": [{ code: "HTTP" + response.status, message: message }] },
        });
    }
    function toFieldErrors(data) {
        if (data == null) {
            return;
        }
        if (data instanceof Array) {
            var fieldErrors = data.map(toFieldError).filter(notEmptyError);
            return fieldErrors.length ? { "*": fieldErrors } : undefined;
        }
        if (typeof data !== "object") {
            var fieldErrors = [{ message: data.toString() }].filter(notEmptyError);
            return fieldErrors.length ? { "*": fieldErrors } : undefined;
        }
        var errors = data;
        var result = {};
        var hasErrors = false;
        for (var field in errors) {
            if (errors.hasOwnProperty(field)) {
                var errorArray = toFieldErrorArray(errors[field]);
                if (errorArray.length) {
                    result[field] = errorArray;
                    hasErrors = true;
                }
            }
        }
        return hasErrors ? result : undefined;
    }
    function toFieldErrorArray(data) {
        if (data == null) {
            return [];
        }
        if (data instanceof Array) {
            return data.map(toFieldError).filter(notEmptyError);
        }
        return [toFieldError(data)].filter(notEmptyError);
    }
    function toFieldError(data) {
        if (data == null) {
            return { message: "" };
        }
        var fieldError = data;
        if (typeof fieldError.message === "string" && (fieldError.code == null || fieldError.code === "string")) {
            return fieldError;
        }
        if (fieldError.message != null) {
            return {
                code: fieldError.code != null ? fieldError.code.toString() : undefined,
                message: fieldError.message.toString(),
            };
        }
        return { message: fieldError.toString() };
    }
    function notEmptyError(item) {
        return !!item && (!!item.message || !!item.code);
    }
    return {
        setters:[
            function (http_3_1) {
                http_3 = http_3_1;
            }],
        execute: function() {
            /**
             * Error response.
             *
             * Any object can be converted to `ErrorResponse` with `toErrorResponse()` function.
             */
            ErrorResponse = (function () {
                function ErrorResponse(opts) {
                    this.response = opts.response;
                    this.errors = opts.errors;
                }
                return ErrorResponse;
            }());
            exports_7("ErrorResponse", ErrorResponse);
        }
    }
});
System.register("ng2-rike/resource", ["@angular/http", "ng2-rike/protocol", "ng2-rike/event", "ng2-rike/options"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var http_4, protocol_2, event_2, options_2;
    var Resource, RikeResource, CRUDResource;
    return {
        setters:[
            function (http_4_1) {
                http_4 = http_4_1;
            },
            function (protocol_2_1) {
                protocol_2 = protocol_2_1;
            },
            function (event_2_1) {
                event_2 = event_2_1;
            },
            function (options_2_1) {
                options_2 = options_2_1;
            }],
        execute: function() {
            Resource = (function () {
                function Resource() {
                }
                Resource.provide = function (_a) {
                    var provide = _a.provide, useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps;
                    var token = provide || Resource;
                    return [
                        {
                            provide: token,
                            useClass: useClass,
                            useValue: useValue,
                            useExisting: useExisting,
                            useFactory: useFactory,
                            deps: deps,
                        },
                        event_2.RikeEventSource.provide({
                            useFactory: function (resource) { return resource.rikeTarget; },
                            deps: [token],
                        })
                    ];
                };
                return Resource;
            }());
            exports_8("Resource", Resource);
            RikeResource = (function () {
                function RikeResource(_rike) {
                    this._rike = _rike;
                }
                Object.defineProperty(RikeResource.prototype, "rike", {
                    get: function () {
                        return this._rike;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RikeResource.prototype, "rikeTarget", {
                    get: function () {
                        return this.getRikeTarget();
                    },
                    enumerable: true,
                    configurable: true
                });
                RikeResource.prototype.getRikeTarget = function () {
                    return this._rikeTarget || (this._rikeTarget = this.createRikeTarget());
                };
                RikeResource.prototype.createRikeTarget = function () {
                    return this.rike.target(this, protocol_2.JSON_PROTOCOL);
                };
                return RikeResource;
            }());
            exports_8("RikeResource", RikeResource);
            CRUDResource = (function (_super) {
                __extends(CRUDResource, _super);
                function CRUDResource(rike) {
                    _super.call(this, rike);
                }
                Object.defineProperty(CRUDResource.prototype, "rikeTarget", {
                    get: function () {
                        return this.getRikeTarget();
                    },
                    enumerable: true,
                    configurable: true
                });
                CRUDResource.prototype.getRikeTarget = function () {
                    return _super.prototype.getRikeTarget.call(this);
                };
                CRUDResource.prototype.create = function (object) {
                    return this.rikeTarget.operation("create", this.objectCreateProtocol(object)).post(object);
                };
                CRUDResource.prototype.read = function (id) {
                    return this.rikeTarget.operation("read", this.objectReadProtocol(id)).get();
                };
                CRUDResource.prototype.update = function (object) {
                    return this.rikeTarget.operation("update", this.objectUpdateProtocol(object)).put(object);
                };
                //noinspection ReservedWordAsName
                CRUDResource.prototype.delete = function (object) {
                    return this.rikeTarget.operation("delete", this.objectDeleteProtocol(object)).delete();
                };
                CRUDResource.prototype.createRikeTarget = function () {
                    return this.rike.target(this, protocol_2.jsonProtocol());
                };
                CRUDResource.prototype.objectCreateProtocol = function (object) {
                    return this.rikeTarget.protocol.readResponseWith(function (response) { return object; });
                };
                CRUDResource.prototype.objectReadProtocol = function (id) {
                    var _this = this;
                    return this.rikeTarget.protocol.prepareRequestWith(function (options) { return new http_4.RequestOptions(options).merge({
                        url: _this.objectUrl(options.url, id)
                    }); });
                };
                CRUDResource.prototype.objectUpdateProtocol = function (object) {
                    var _this = this;
                    return this.rikeTarget.protocol
                        .updateRequestWith(function (object, options) { return new http_4.RequestOptions(options).merge({
                        url: _this.objectUrl(options.url, _this.objectId(object))
                    }); })
                        .readResponseWith(function (response) { return object; });
                };
                CRUDResource.prototype.objectDeleteProtocol = function (object) {
                    var _this = this;
                    return this.rikeTarget.protocol
                        .updateRequestWith(function (object, options) { return new http_4.RequestOptions(options).merge({
                        url: _this.objectUrl(options.url, _this.objectId(object))
                    }); })
                        .readResponseWith(function (response) { return object; });
                };
                //noinspection JSMethodCanBeStatic
                CRUDResource.prototype.objectUrl = function (baseUrl, id) {
                    return options_2.relativeUrl(baseUrl, id.toString());
                };
                return CRUDResource;
            }(RikeResource));
            exports_8("CRUDResource", CRUDResource);
        }
    }
});
System.register("ng2-rike", ["ng2-rike/rike", "ng2-rike/event", "@angular/core", "ng2-rike/status.component", "ng2-rike/error", "ng2-rike/options", "ng2-rike/protocol", "ng2-rike/resource", "ng2-rike/status"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var rike_1, event_3, core_3, status_component_1;
    var RIKE_PROVIDERS;
    var exportedNames_1 = {
        'RIKE_PROVIDERS': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_9(exports);
    }
    return {
        setters:[
            function (rike_1_1) {
                rike_1 = rike_1_1;
                exportStar_1(rike_1_1);
            },
            function (event_3_1) {
                event_3 = event_3_1;
                exportStar_1(event_3_1);
            },
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (status_component_1_1) {
                status_component_1 = status_component_1_1;
                exportStar_1(status_component_1_1);
            },
            function (error_1_1) {
                exportStar_1(error_1_1);
            },
            function (options_3_1) {
                exportStar_1(options_3_1);
            },
            function (protocol_3_1) {
                exportStar_1(protocol_3_1);
            },
            function (resource_1_1) {
                exportStar_1(resource_1_1);
            },
            function (status_3_1) {
                exportStar_1(status_3_1);
            }],
        execute: function() {
            /**
             * Provides a basic set of providers to use REST-like services in application.
             *
             * The `RIKE_PROVIDERS` should be included either in a component's injector, or in the root injector when bootstrapping
             * an application.
             *
             * @type {any[]}
             */
            exports_9("RIKE_PROVIDERS", RIKE_PROVIDERS = [
                rike_1.Rike,
                event_3.RikeEventSource.provide({ useExisting: rike_1.Rike }),
                {
                    provide: core_3.PLATFORM_DIRECTIVES,
                    useValue: status_component_1.RikeStatusComponent,
                    multi: true,
                }
            ]);
        }
    }
});
//# sourceMappingURL=ng2-rike.devel.js.map