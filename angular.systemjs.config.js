(function(global) {

    var config = {
        packages: {
            'rxjs': {main: 'Rx.js', defaultExtension: 'js'},
            '@angular/common': {main: 'index.js', defaultExtension: 'js'},
            '@angular/compiler': {main: 'index.js', defaultExtension: 'js'},
            '@angular/core': {
                main: 'index.js',
                defaultExtension: 'js',
                map: {
                    'testing': 'testing.js'
                }
            },
            '@angular/http': {
                main: 'index.js',
                defaultExtension: 'js',
                map: {
                    'testing': 'testing.js'
                }
            },
            '@angular/platform-browser': {main: 'index.js', defaultExtension: 'js'},
            '@angular/platform-browser-dynamic': {main: 'index.js', defaultExtension: 'js'}
        }
    };

    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);