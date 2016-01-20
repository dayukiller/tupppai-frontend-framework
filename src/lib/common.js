/**
 * JSON   
 */
$.JSON = {};
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

if (typeof(JSON)=='object' && typeof JSON.stringify === "function") {
    $.JSON.stringify = JSON.stringify;
} else {
     $.JSON.stringify = function(value, replacer, space) {
        var i; gap = ""; indent = "";
        if (typeof space === "number") {
            for (i = 0; i < space; i += 1) {
                indent += " ";
            }
        } else {
            if (typeof space === "string") {
                indent = space;
            }
        }
        rep = replacer;
        if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
            throw new Error("JSON.stringify");
        }
        return str("", {"": value });
    };
}

if (typeof(JSON)=='object' && typeof JSON.parse === "function") {
    $.JSON.parse = JSON.parse;
} else {
    $.JSON.parse = function(text, reviver) {
        var j;
        function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && typeof value === "object") {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {value[k] = v; }
                        else {delete value[k]; }
                    }
                }
            }
            return reviver.call(holder, key, value);
        }
        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
            text = text.replace(cx, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4); });
        }
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            j = eval("(" + text + ")");
            return typeof reviver === "function" ? walk({"": j }, "") : j;
        }
        throw new SyntaxError("JSON.parse");
    };
}

/**
 * Common script to handle the theme demo
 */
var Common = function() {

    var ajaxSetting = function(){
        // ajax loading before success
        //重写jquery的ajax方法
        var last_ajax = [];
        $.cur_log_depth = 0;    //refresh each page
        $.max_log_depth = 3;    //max depth a page
        $.post_error = function(data){
            //jslog('/common/ajaxlog/log?data=' + encodeURIComponent(data.join(',')));
            //$.post('/common/ajaxlog/log?of=json', {data: data}, function(data){});
        }

        $._post = $.post;
        $.post = function () {
            //验证input格式
            $._post.apply(this, arguments);
        }
        $.fn.post = function () {
            //验证input格式
            $._post.apply(this, arguments);
        }

        $.time33 = function (string) {
            var hash = 0;
            for (var i=string.length-1; i>=0; i--) {
                hash = hash*33 + string.substr(i, i+1).charCodeAt();
            }
            return hash.toString(36);
        };

        $._ajax = $.ajax;
        $.ajax = function (opt) {
            var url_hash = "";
            //if(opt.url) url_hash = $.time33(0<=opt.url.indexOf('?')? opt.url.substr(0, opt.url.indexOf('?')) : opt.url);
            url_hash = $.time33(opt.url);

            //加载Loading图片
            if (typeof opt.loading === 'undefined' || opt.loading == true) $('body').append(loadingDiv);

            if(opt.type==undefined) opt.type="get";
            if(opt.type.toLowerCase() == "post"){
                //opt.data[$("#__csrf_token").attr("name")] = $("#__csrf_token").val();
            } else {
                opt.url = encodeURI(opt.url);
            }

            if (last_ajax[url_hash]!=null) last_ajax[url_hash].abort();

            //bugfix: 兼容laravel的分页
            if(opt.data && opt.data.start && opt.data.length)
                opt.url += ('&page='+opt.data.start/opt.data.length);
            last_ajax[url_hash] = $._ajax(opt).complete(function(data){
                if(data.readyState == 0)
                    return false;
                if(opt.type.toLowerCase() == "post"){
                    try {
                        /**
                         * 提示错误信息
                         */
                        var result = $.JSON.parse(data.responseText);
                        parse(result);
                        /*
                        if(result.ret != 1 && result.code == 1){
                            $(".login-popup").click();
                        }
                        else if(result.ret != 1){
                            error('操作失败', result.info);
                        }
                        */
                    } catch (e) {
                        if($.cur_log_depth ++ < $.max_log_depth){
                            error('操作失败', '操作失败');
                            //js_log
                        }

                    }
                }
                else {
                    var result = $.JSON.parse(data.responseText);
                    if (result.ret == 0 && result.info == 'logout') {
                        location.reload();
                    }
                }

                $('#__loading').remove();
            });
        };
    };

    return {
        init: function() {
            ajaxSetting();
        }
    };
}();
Common.init();
function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
function append(el, item, options) {
    var opt = {
        time: 400
    }
    for(var i in options) {
        opt[i] = options[i];
    }
    var item = $(item).clone().hide();
    $(el).append(item);
    item.fadeIn(opt.time);
};
function parse(resp, xhr) { 
    // todo  billqiang QQ
      // QC.Login({
      //       btnId:"qqLoginBtn",   //插入按钮的节点id
      //   });
    if(resp.ret == 0 && resp.code == 1  ) {
        WB2.anyWhere(function (W) {
            W.widget.connectButton({
                id: "wb_login_btn",
                //type: '3,2',
                callback: {
                    login: account.weibo_auth
                }
            });
            W.widget.connectButton({
                id: "wb_register_btn",
                //type: '3,2',
                callback: {
                    login: account.weibo_auth
                }
            });
        });
    }

    if(resp.ret == 0 && resp.code == 1 && this.url != 'user/status') { 
        if(WB2.oauthData.access_token) {
            //微博注册
            $(".binding-popup").click();
        }
        else {
            //原生登陆
            $(".login-popup").click();
        }
        return false;
    } 
    else if(resp.ret == 0 && this.url != 'user/status') {
        error('操作失败', resp.info);
    }
    //console.log('parsing base modelxxx');
    return resp.data;
};
