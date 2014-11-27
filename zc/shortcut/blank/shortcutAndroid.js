/**
 * 针对android下添加桌面快捷方式
 * @author samczhang@tencent.com
 * @date 2014-11-26
 *
 * @example
 *  new shortcutAndroid({
 *      key: 'home' //业务标识 
 *  });
 *
 */

(function(root, factory) {
    if (typeof define === 'function') {
        define('shortcutAndroid', [], function() {
            return factory(root);
        });
    } else {
        root.shortcutAndroid = factory(root);
    }
})(window, function(root) {

    var styleStr = [
        '#shortcut-a-pannel {display:none; z-index:9999; position:fixed; border:1px solid solid rgba(215,215,215,0.9);; width:205px; height:100px; bottom:10px; background-color:#EBEBEB; opacity:0.9; border-radius:3px;}',
        '#shortcut-a-pannel .con { position:relative; }',
        '#shortcut-a-pannel .ic-closebtn {position:absolute; right:10px; top:8px; z-index:3; width:11px; height:11px; background:transparent url(http://3gimg.qq.com/wap30/infoapp/touch/itravel/images/img/ic-closebtn.png) no-repeat scroll left top; -webkit-background-size: 11px auto;}',
        '#shortcut-a-pannel p.tips {text-align:center; color:#4C4C4C; font-size:14px; padding:25px 0 10px;}',
        '#shortcut-a-pannel p.link {text-align:center;}',
        '#shortcut-a-pannel p.link a {display:inline-block; border-radius:3px; width:112px; height:32px; line-height:32px; color:#FFFFFF; background-color:#2B73DF; text-align:center; text-decoration:none;}',
    ].join('');

    var tplStr = [
        '<div id="shortcut-a-pannel">',
            '<div class="con">',
                '<div class="ic-closebtn"></div>',
                '<p class="tips">{%tips%}</p>',
                '<p class="link"><a href="{%url%}" target="_blank">好的</a></p>',
            '</div>',
        '</div>'
    ].join('');

    var appMap = {
        home: {
            url: 'http://yuelinzheng.kf0309.3g.qq.com/infoapp/appcenter/?fid=1&i_f=416',
            name: 'com.tencent.lightapp.Tencent',
            tips: '添加快捷方式，一键访问手腾'
        },
        yuetu: {
            url: 'http://yuelinzheng.kf0309.3g.qq.com/infoapp/appcenter/?fid=3&i_f=421',
            name: 'com.tencent.lightapp.yuetu',
            tips: '添加快捷方式，一键访问悦图'
        },
        nba: {
            url: 'http://yuelinzheng.kf0309.3g.qq.com/infoapp/appcenter/?fid=2&i_f=418',
            name: 'com.tencent.lightapp.nba',
            tips: '添加快捷方式，一键访问NBA'
        },
        auto: {
            url: 'http://yuelinzheng.kf0309.3g.qq.com/infoapp/appcenter/?fid=11&i_f=420',
            name: 'com.tencent.lightapp.myauto',
            tips: '添加快捷方式，一键访问车典'
        },
        movie: {
            url: 'http://yuelinzheng.kf0309.3g.qq.com/infoapp/appcenter/?fid=5&i_f=417',
            name: 'com.tencent.lightapp.aidianyin',
            tips: '添加快捷方式，一键访问爱电影'
        },
        travel: {
            url: 'http://yuelinzheng.kf0309.3g.qq.com/infoapp/appcenter/?fid=4&i_f=419',
            name: 'com.tencent.lightapp.meiyou',
            tips: '添加快捷方式，一键访问美游'
        }
    };

    var shortcut = function(config) {
        this.defaultConfig = {
            key: 'travel'
        };

        this.config = this.extend(this.defaultConfig, config || {});

        //set localStorage key name
        this.dailyShowKey = 'dailyShow-' + this.config.key;
        this.forceCloseKey = 'forceClose-' + this.config.key;

        this.init.call(this);
    };

    shortcut.prototype = {
        init: function() {
            if (this._isShow()) {
                this._createDom();
                this._initEvent();

                //记录显示日期
                localStorage.setItem(this.dailyShowKey, this.getFormatDate(new Date()));
            }
        },

        _createDom: function() {
            var me = this,
                config = this.config,
                app = appMap[config.key];

            tplStr = tplStr.replace('{%tips%}', app.tips)
                           .replace('{%url%}', app.url);

            document.querySelector('head').insertAdjacentHTML( 'beforeend', '<style>' + styleStr + '</style>');
            document.querySelector('body').insertAdjacentHTML('beforeend', tplStr);

            this.el = document.querySelector('#shortcut-a-pannel');

            this.show();
        },

        _setPos: function() {
            var me = this,
                config = this.config,
                clientWidth = document.body.clientWidth;

            this.el.style.left = (clientWidth - 205) / 2 + 'px';
        },

        _actClose: function() {
            var me = this,
                config = this.config;

            this.hide();

            //记录主动关闭日期
            localStorage.setItem(this.forceCloseKey, this.getFormatDate(new Date()));
        },

        _initEvent: function() {
            var me = this,
                config = this.config;

            window.addEventListener('resize', this.proxy(this._setPos, this), false);
            window.addEventListener('orientationchange', this.proxy(this._setPos, this), false);

            this.el.querySelector('.ic-closebtn').addEventListener('click', this.proxy(this._actClose, this), false);
            this.el.querySelector('p.link a').addEventListener('click', this.proxy(this._actClose, this), false);
        },

        _autoClose: function() {
            var me = this,
                config = this.config;

            setTimeout(function() {
                me.hide();
            }, 6000);
        },

        _isShow: function() {
            var me = this,
                config = this.config,
                oneDayMs = 1000 * 60 * 60 * 24,
                curDate = this.getFormatDate(new Date()),
                lastShowDate = localStorage.getItem(this.dailyShowKey),
                forceCloseDate = localStorage.getItem(this.forceCloseKey);

            //如不是android下，则不显示
            if (!this.isAndroid()) {
                return false;
            }

            //如是已安装，则不显示
            if (window.x5mtt) {
                var rst = window.x5mtt.packages().isApkInstalled(JSON.stringify({
                    "packagename": appMap[config.key].name
                }));

                alert(rst);

                if (rst == 1) {
                    return false;
                }
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
                    localStorage.removeItem(this.forceCloseKey);
                }
            }

            return true;
        },

        show: function() {
            var me = this,
                config = this.config;

            this._setPos();
            this.el.style.display = 'block';
            this._autoClose();
        },

        hide: function() {
            var me = this,
                config = this.config;

            this.el.style.display = 'none';
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
        },

        isAndroid: function() {
            var ua = navigator.userAgent;

            //android系统, 排除uc
            if (/android/i.test(ua)) {
                //排除uc
                if (!/ucbrowser/i.test(ua)) {
                    return true;
                }
            }

            return false;
        },

        /**
         * 对象合并，返回合并后的对象
         * 支持深度合并
         */
        extend: function(targetObj, configObj) {
            for (var key in configObj) {
                if (targetObj[key] != configObj[key]) {
                    if (typeof configObj[key] == 'object') {
                        targetObj[key] = extend(targetObj[key], configObj[key]);
                    } else {
                        targetObj[key] = configObj[key]
                    }
                }
            }

            return targetObj;
        },

        proxy: function(fn, thisObj, args) {
            return function() {
                if (args) return fn.apply(thisObj, args);
                return fn.apply(thisObj, arguments);
            }
        }
    };

    return shortcut;
});
