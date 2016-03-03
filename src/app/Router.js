var paths = [
    'marionette',
    'Test', 
];

define('app/Router', [ 'marionette' ], function (marionette) {
        'use strict';

        var routes = {};
        var controllers = {};

        routes['']          = 'index';
        routes['*action']   = 'action';
        //extra action defined
        controllers['action'] = function (action) {
            //do nothing
            console.log('no match action: ' + action);
        }

        for(var i = 1; i < paths.length; i ++) {
            var path = paths[i];
            var p    = path.toLowerCase();

            routes[p]           = path;
            routes[p + '/:id']  = path;
            routes[p + '/:type/:id'] = path;

            controllers[path] = function() {
                var index   = location.hash.substr(1).split('/')[0];
                var uri     = routes[index.toLowerCase()];
                require(['app/controllers/'+uri], function (controller) {

                    var args = location.hash.substr(1).split('/');
                    switch(args.length) {
                    case 1:
                        controller();
                        break;
                    case 2:
                        controller(args[1]);
                        break;
                    case 3:
                        controller(args[1], args[2]);
                        break;
                    }
                });
            }
        }

        return marionette.AppRouter.extend({
            appRoutes: routes,
            controller: controllers
        });
    });
