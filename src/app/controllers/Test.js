define([ 
        'app/views/TestView',
        ],
    function (TestView) {
        "use strict";
        return function() {
        	var view = new TestView();
            window.app.content.show(view);
        };
    });
