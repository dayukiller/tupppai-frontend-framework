define('app/router', [ 'marionette' ], function (marionette) {
    'use strict';

    var url     = location.pathname.substr(baseUri.length + '/'.length);
    var paths   = url.split('/');
    if(paths.length == 1)
        url += '/index';

    require(['app/controllers/'+url], function (controller) {
        controller();
    });
});
