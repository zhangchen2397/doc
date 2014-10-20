title: 旅游项目前端开发小结
speaker: samczhang
transition: move
files: /js/demo.js,/css/demo.css

[slide]
# 旅游WEBAPP项目前端开发小结


[slide]
# 主要内容
----
* 工作方式的转变
* 开始一个全新的项目
* 开发过程中的具体问题
* 项目后的一些思考及想法


[slide]
# 工作方式的转变
----
* 环境及团队的变化
* 开发流程的差异
    - 开发、联调、提测、上线
    - 前端及重构单独分工
* 由PC到移动前端开发
    - 浏览器的兼容到适配
    - 后端由php到java


[slide]
# 开始一个全新的项目
----
* 从学习一个项目开始
* 开始编写项目代码
    - 项目目录结构
    - 基本规范
    - 代码入口及执行流程
    - 本地接口模拟测试


[slide]
## 项目目录结构
----
```html
travel
    ├── js .......................... js目录
    |   ├── mod ..................... 公共模块目录
    |   |    ├── jqmobi.js
    |   |    ├── core.js
    |   |    ├── dialog.js
    |   |    └── more
    |   └── pages ................... 页面级js入口目录
    |        ├── index.js
    |        ├── list.js
    |        ├── detail.js
    |        └── more
    ├── API ......................... 模拟数据接口目录
    |    ├── index.json
    |    ├── list.json
    |    ├── detail.json
    |    └── more
    ├── build.conf .................. build配置文件
    ├── index.jsp ................... 项目首页模板
    └── init.js ..................... 项目入口文件
```


[slide]
## 基本规范
----
###编码细节规范

- 所有文件名及目录名采用驼峰，如groupInfo.js；
- js中所有变量名及方法采用驼峰命名，如initEvent()；
- html中自定义属性采用中划线连接，如data-cid="698"；
- 变更声明、常量、分号... [参考Google JavaScript 规范](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)


[slide]
## 基本规范
----
js中获取模板数据统一处理

```javascript
define( 'JSP', [], function() {
    return {
        userInfo: {
            sid      : "<%=s_head.sid%>",
            isLogin  : "<%=s_user.isLogin3G()%>", 
            qq       : "<%=s_user.getUinL()%>",
            nick     : "<%=s_user.getNickName()%>"
        },

        version: "<%=jspVer%>"
    };
} );
```

```javascript
define( 'index', [ 'JSP' ], function( JSP ) {
    var userInfo = JSP.userInfo;
    //to do list
} );
```


[slide]
## 基本规范
----
页面入口文件统一规范

```javascript
define( 'index', [ 'jqmobi', 'pm', 'mTpl' ], function( $, PM, mTpl ) {
    var tpl = [
        '<% for ( var i = 0; i < slideLen; i++ ) { %>',
            '<span><%= i + 1 %></span>',
        '<% } %>',
    ].join( '' );

    var pageRun = {
        init: function() {
            this._registerPm();
            this._renderTpl();
            this._initEvent();
            //其它初始化
        },

        //注册PM
        _registerPm: function() {},

        //渲染模板
        _renderTpl: function() { },

        //初始化事件绑定
        _initEvent: function() { }
    };

    pageRun.init();
} );
```


[slide]
## 基本规范
----
组件书写统一规范

```javascript
define( 'dialog', [ 'jqmobi' ], function( $ ) {
    var dialog = function( config ) {
        this.defaultConfig = {
            dialogId: 'dialog',
            //other default config
        };

        this.config = $.extend( {}, this.defaultConfig, config || {} );
        this.init.call( this );
    };

    $.extend( dialog.prototype, {
        init: function() {
            this._cacheDom();
            this._initEvent();
            //other method
        },

        //组件内私有方法
        _cacheDom: function() {},
        _initEvent: function() {},

        //对外公共方法
        show: function() {}
    } );

    return dialog;
} );
```


[slide]
## 本地接口模拟测试
----
在JSP中配置测试及正式环境接口map
```javascript
define( 'JSP', [], function() {
    var rootDirName = location.href.indexOf( ".kf0309." ) > -1 ? 'infoapp' : 'g', 
        prePath = 'http://' + location.host + '/' + rootDirName,
        pathMap = {};

    if ( isTestEnv && isTestAPI ) {
        prePath = prePath + '/travel/touch/API/';
        pathMap = {
            home: prePath + 'home.json',
            list: prePath + 'list.json',
            //...
        };
    } else {
        prePath = prePath + '/s?aid=action_api&module=travel&';
        pathMap = {
            home: prePath + 'action=raiders,line_recommended',
            list: prePath + 'action=&action=line_list',
            //...
        };
    }

    return {
        pathInfo: mathMap,
        userInfo: userInfo
    }
} );
```


[slide]
# 开发过程中的具体问题
----
* 各种坑...
    - 隐藏地址栏
    - iscroll性能问题
    - 事件穿透与click延迟
    - ios fixed bug
* 缓存与数据同步
* 多页面切换返回定位
* 全局事件绑定与销毁
* 新的尝试


[slide]
## 各种坑...
----
* 隐藏地址栏
```javascript
function hideAddrBar() {
    var bodyStyle = document.body.style;

    bodyStyle[ 'min-height' ] = '2000px';
    window.scrollTo( 0, 1 );
    setTimeout( function() {
        bodyStyle[ 'min-height' ] = window.innerHeight + 'px';
    }, 400 );
}
```

* iscroll性能问题<br/>
    能不能尽量不用，在低端android机器下性能很差

* 事件穿透与click延迟<br/>
    直接引用fastclick.js

* ios fixed bug<br/>
    当页面中元素定位使用了fixed后，input标签获取焦点时，会出现fixed元素位置偏移。暂无更好的解决办法


[slide]
## 缓存与数据同步
----
> **缓存：**这里的缓存不是持久缓存，是指页面的DOM缓存或保存在内存中的js对象

DOM整个页面HTML缓存，适用于内容固定的页面

```javascript
//只在页面添加时执行一次
$.bind( module, 'vpageAdd', function() {
    me.curPage = $( '.virtualPage[page=' + module.id + ']' );

    //请求数据并渲染模板
    me._ajaxData();
} );

//当再次进入页面或返回时直接显示即可
$.bind( module, 'vpageEnter', function() {
    me.curPage.show();

    //需要单独打统计日志
    Log.send();
} );

$.bind( module, 'vpageBack', function() {
    me.curPage.show();
    Log.send();
} );
```


[slide]
## 缓存与数据同步
----
> **缓存：**这里的缓存不是持久缓存，是指页面的DOM缓存或保存在内存中的js对象

缓存数据对象，适用于同一模板对应不同数据的页面

```javascript
$.bind( module, 'vpageEnter', function() {
    var detailDataMap = Data.get( 'detailDataMap' ) || {},
        id = this.getHashParaValue( 'id' ) || 253;

    //首先从数据对象中取，如有则直接重新渲染模板即可
    if ( detailDataMap[ id ] ) {
        me.renderTpl( detailDataMap[ id ] );
    } else {
        $.ajax( {
            url: pathInfo.detail,
            success: function( data ) {
                var data = JSON.parse( data ),
                    dataPush = {};
                
                //将新数据添加到数据数据对象中
                dataPush[ id ] = data;
                $.extend( detailDataMap, dataPush );
                Data.set( 'detailDataMap', detailDataMap );
            }
        } );
    }

    Log.send();
} );
```


[slide]
## 缓存与数据同步
----
> **数据同步：**页面切换时，局部数据更新后回退时数据要同步一致

同一数据多入口显示，返回时要保持一致，利用通信事件监听

```javascript
//在详情页
this.el.delegate( '.agreen-btn', 'touchend', function( event ) {
    var pid = $( this ).data( 'pid' );

    $.ajax( {
        url: pathInfo.agreen,
        success: function( data ) {
            var data = JSON.parse( data );

            $.trigger( window, 'agreeSuccess', [
                pid: pid,
                num: data.num
            ] );
        }
    } );
} );

//在项目入口文件中
$.bind( window, 'agreeSuccess', function( event ) {
    var data = event.data;

    //更新所有页面中指定产品的点赞数
    me.updateAgreenNum( data );
} );

```


[slide]
## 多页面切换返回定位原位置
----
```javascript
//当渲染完模板都会派发afterRender事件
function renderPage( data ) {
    mTpl.render( tpl, data );

    $.trigger( this, 'afterRender' );
}

$.bind( this, 'afterRender', function( event ) {
    if ( me.module.pos ) {
        window.scrollTo( 0, me.module.pos.y );
    }
} );

//但有时又需要针对指定的页面返回时才定位
$.bind( this, 'afterRender', function( event ) {
    if ( event.prevPage == 'detail' ) {
        if ( me.module.pos ) {
            window.scrollTo( 0, me.module.pos.y );
        }
    } else {
        window.scrollTo( 0, 1 );
    }
} );
```


[slide]
## 全局事件绑定与解绑
----
将全局事件转移到当前模块
```javascript
$( window ).bind( 'scroll', function() {
    PM.notify( 'scroll' );
} );

//这样只会影响当前模块
$.bind( curMod, 'scroll', function() {
    //to do list
} );
```

页面进入时添加事件监听，离开时解绑
```javascript
$.bind( module, 'vpageEnter', function( event ) {
    $( window ).bind( 'scroll', this.scrollHander );
    //to do list
} );

$.bind( module, 'vpageLeave', function() {
    $( window ).unbind( 'scroll', this.scrollHander );
    //to do list
} );
```


[slide]
## 一些新的尝试
----
增加场间过渡，接近原生app体验
```javascript
$.bind( window, 'vpageEnter', function( event ) {
    var curPage = $( '.virtualPage[page=' + event.curPage + ']' ),
        prePage = $( '.virtualPage[page=' + event.prevPage + ']' ),
        curPageEl = curPage[ 0 ];

    curPage.show();

    if ( prePage.length ) {
        curPage.addClass( 'sliderightin' );
        curPage.addClass( 'animatestart' );

        curPageEl.addEventListener( 'webkitAnimationEnd', animationCb, false );
    }

    function animationCb() {
        prePage.hide();
        curPage.removeClass( 'animatestart' );
        curPage.removeClass( 'sliderightin' );
        window.scrollTo( 0, 0 );
        curPageEl.removeEventListener( 'webkitAnimationEnd', animationCb, false );
    }
} );
```


[slide]
# 项目后的一些思考及想法
----
* 代码性能与底层库
* 理想的模块化开发
    * 模块是可组合、可分解和更换的单元
    * 模块具有一定的独立性
    * 将模块所需的js、css、图片、模板维护在一起
* 业界已有的整体方案及开发模式

