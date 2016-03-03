define('app/App',
    [
        'marionette', 
    ],
    function (marionette) {
        "use strict";
        var app  = new marionette.Application();

        app.addRegions({
            content: '#contentView',
        });

        return app;
    });
