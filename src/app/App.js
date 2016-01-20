define('app/App',
    [
        'marionette', 
    ],
    function (marionette) {
        "use strict";
        if(location.hash == ''){
            location.href = '#index';
        }

        window.REMODAL_GLOBALS = {
            NAMESPACE: 'modal',
            DEFAULTS: {
                hashTracking: false
            }
        };
        var app  = new marionette.Application();

        app.addRegions({
            content: '#contentView',
        });

        return app;
    });
