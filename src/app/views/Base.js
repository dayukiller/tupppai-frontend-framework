define(['marionette','app/models/Base'], function (Marionette,ModelBase) {
    "use strict";
    
    return Marionette.ItemView.extend({
        initialize: function(){ 
            this.construct();
        },
        onRender: function(){ 
        },
        render: function() {
            if(!this.collection && !this.model) {
                var el = $(this.el);
                var template = this.template;
                append(el, template());
            }
            else if(this.collection) {
                var el = $(this.el);
                var template = this.template;
                this.collection.each(function(model){
                    append(el, template(model.toJSON()));
                });
            }
            else if(this.model) {
                var el = $(this.el);
                var template = this.template;
                $(this.el).html( template(this.model.toJSON() ));
            }
            
            this.onRender(); 

        },
        scroll: function(collection) {
            var self = this;

            //页面滚动监听 进行翻页操作
            $(window).scroll(function() {
                //页面可视区域高度
                var windowHeight = $(window).height();
                //总高度
                var pageHeight   = $(document.body).height();
                //滚动条top
                var scrollTop    = $(window).scrollTop();
            
                if ((pageHeight-windowHeight-scrollTop)/windowHeight < 0.15) {
                    if(collection) {
                        self = collection;
                    }

                    self.collection.loading(function(data){ });
                }
            });
        }
        construct: function() {
            
        }
    });
});
