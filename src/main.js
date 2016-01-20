require.config({
    paths: {
        backbone: 'lib/backbone/backbone',
        underscore: 'lib/underscore/underscore',
        jquery: 'lib/jquery/jquery-1.9.0',
        marionette: 'lib/backbone/backbone.marionette',
        tpl: 'lib/require/tpl',
        common: 'lib/common',
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery','underscore', 'common'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
        common: {
            deps: ['jquery'],
            exports: 'common'
        }
    }
});

require(['app/App', 'backbone', 'app/Router'],
    function (app, Backbone, Router) { 
        "use strict"; 

        window.app = app;

        app.start();
        new Router();

        Backbone.history.start(); 
        console.log('begin...');
    });
