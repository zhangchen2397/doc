/**
 * describe
 *
 */

(function(root, factory) {
    if (typeof define === 'function') {
        define('shortcut', ['jqmobi'], function($) {
            return factory(root, $);
        });
    } else {
        root.shortcut = factory(root, root.$);
    }
})(window, function(root, $) {

    var styleStr = [
        '#shortcut-pannel {display:none; z-index:9999; position:fixed; width:186px; height:76px; bottom:10px; background-color:#666666; opacity:0.9; border-radius:3px; }',
        '#shortcut-pannel .con { position:relative; height:76px; }',
        '#shortcut-pannel .ic-bg {background:transparent url(http://3gimg.qq.com/wap30/infoapp/touch/itravel/images/img/bg-ic.png) no-repeat scroll; -webkit-background-size: 20px auto;}',
        '#shortcut-pannel .ic-closebtn {position:absolute; right:10px; top:10px; z-index:3; width:11px; height:11px; background-position:left top;}',
        '#shortcut-pannel .tips {padding:15px 10px;}',
        '#shortcut-pannel .tips img {width:45px; border-radius:3px; float:left; margin-right:10px;}',
        '#shortcut-pannel .tips p {color:#FFFFFF; position:relative; top:-3px;}',
        '#shortcut-pannel .ic-add { display:inline-block; width:16px; height:20px; background-position:left -19px; position:relative; top:3px; margin-left:5px; }',
        '#shortcut-pannel .ic-arrow {position:absolute; width:20px; height:10px; bottom:-10px; left:83px; background-position:left -44px;}'
    ].join('');

    var tplStr = [
        '<div id="shortcut-pannel">',
            '<div class="con">',
                '<div class="ic-bg ic-closebtn"></div>',
                '<div class="tips">',
                    '<img src="{%imgurl%}" />',
                    '<p>先点击<span class="ic-bg ic-add"></span><br/>再"添加到主屏幕"</p>',
                '</div>',
                '<div class="ic-bg ic-arrow"></div>',
            '</div>',
        '</div>'
    ].join('');

    var shortcut = function(config) {
        this.defaultConfig = {
            icon: 'http://3gimg.qq.com/wap30/infoapp/touch/itravel/images/img_travel.png',
            key: 'travel',
            url: 'http://meiyou.qq.com',
            tips: '添加快捷方式，一键访问美游'
        };

        this.config = $.extend({}, this.defaultConfig, config || {});

        this.init.call(this);
    };

    $.extend(shortcut.prototype, {
        init: function() {
            if ( this._isShow() ) {
                this._createDom();
                this._initEvent();

                //记录显示日期
                localStorage.setItem('dailyShow', this.getFormatDate(new Date()));
            }
        },

        _createDom: function() {
            var me = this,
                config = this.config;

            tplStr = tplStr.replace( '{%imgurl%}', config.icon );

            $( 'head' ).append( '<style>' + styleStr + '</style>' );
            $( document.body ).append( tplStr );

            this.el = $('#shortcut-pannel');

            this.show();
        },

        _setPos: function() {
            var me = this,
                config = this.config,
                win = $( window );

            this.el.css( {
                left: (win.width() - 186) / 2 + 'px'
            } );
        },

        _actClose: function() {
            var me = this,
                config = this.config;

            this.hide();

            //记录主动关闭日期
            localStorage.setItem('forceClose', this.getFormatDate(new Date()));
        },

        _initEvent: function() {
            var me = this,
                config = this.config;

            $(window).on('resize', $.proxy( this._setPos, this));
            $(window).on('orientationchange', $.proxy(this._setPos, this));

            this.el.find('.ic-closebtn').on('click', $.proxy(this._actClose, this));
        },

        _autoClose: function() {
            var me = this,
                config = this.config;

            setTimeout(function() {
                me.hide();
            }, 4000);
        },

        _isShow: function() {
            var me = this,
                config = this.config,
                oneDayMs = 1000 * 60 * 60 * 24,
                ua = navigator.userAgent,
                curDate = this.getFormatDate(new Date()),
                lastShowDate = localStorage.getItem('dailyShow'),
                forceCloseDate = localStorage.getItem('forceClose');

            //非ios下的safari不显示
            if (!/iphone.*?safari/i.test(ua)) {
                return false;
            }

            //如果已显示，且间隔时间小于一天，则不显示
            if (lastShowDate) {
                if (+new Date(curDate) - +new Date(lastShowDate) < oneDayMs) {
                    return false;
                }
            }

            //如果主动关闭过，且间隔时间少于7天，则不显示
            if (forceCloseDate) {
                if (+new Date(curDate) - +new Date(forceCloseDate) < 7 * oneDayMs) {
                    return false;
                } else {
                    localStorage.removeItem('forceClose');
                }
            }

            return true;
        },

        show: function() {
            var me = this,
                config = this.config;

            this._setPos();
            this.el.show();
            //this._autoClose();
        },

        hide: function() {
            var me = this,
                config = this.config;

            this.el.hide();
        },

        /**
         * @para dateObj {object} 日期对象
         * return format date 2014-11-25
         */
        getFormatDate: function( dateObj ) {
            var year = dateObj.getFullYear(),
                month = dateObj.getMonth() + 1,
                date = dateObj.getDate();

            function actlt10( num ) {
                var rst = num;

                if ( num < 10 ) {
                    rst =  '0' + num;
                }

                return rst;
            }

            return year + '-' + actlt10(month) + '-' + actlt10(date);
        }
    });

    return shortcut;
});
