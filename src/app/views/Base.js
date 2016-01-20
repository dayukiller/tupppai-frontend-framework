define(['marionette','app/models/Base'],
    function (Marionette,ModelBase) {
        "use strict";
        
        return Marionette.ItemView.extend({
            initialize: function(){ 
                $(window).unbind('scroll'); 
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
            },
			msnry: null,
			renderMasonry: function() {
				var self = this;

				var template = this.template;
                var el = this.el;

                if(this.collection.length != 0){ 
					var items = '';

					for(var i = 0; i < this.collection.models.length; i++) {
                        items += template((this.collection.models[i]).toJSON());
					}
					var $items = $(items);
					$items.hide();
                    $(el).append($items);

					$items.imagesLoaded().progress( function( imgLoad, image ) {
						var $item = $( image.img ).parents( '.grid-item' );


						self.msnry = new masonry('.grid', {
							itemSelector: '.grid-item',
							isAnimated: true,
							animationOptions: {
								duration: 750,
								easing: 'linear',
								queue: false
							}
						});
						$item.fadeIn(400);
					});
                }
			},

            construct: function() {
                
            }
        });
    });
