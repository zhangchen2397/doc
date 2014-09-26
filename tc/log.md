前端日志发送规范
=========

周会中提出关于日志统一发送的问题，目前大部分`webapp`项目中，比如`页面pv`或是`点击行为`的统计都是由前端主动发送，日志的发送都和具体的业务耦合在一起，每个项目都是独立的日志接口及发送参数，涉及到日志发送时前后端都需要修改。虽然不复杂但是每次加统计时比较繁琐，这次后端在`infoapp`中增加了统一的pv及点击行为日志接口，约定了通用的发送参数，前端也增加了统一的日志发送方法。

##pv统计使用

**接口及参数说明：**
```
//引入log模块指定为log
log.pvsend( pid, aid, writeType );

pid: -------- 业务id(必须)，数值类型，比如电影项目pid=87，具体值后端给出

aid: -------- 页面标识(必须)，字符串类型，如旅游详情页aid=travel_detail，和后端约定

writeType: -- 额外参数(可选)，比如要统计指定id详情页的pv，writeType="mid@190"，和后端约定
              历史问题为什么是writeType字段名和这种格式
```

**使用示例：**
```javascript
//如统计旅游项目的首页pv
log.pvsend( 90, 'travel_home' );

//如统计旅游项目的详情页pv
log.pvsend( 90, 'travel_detail', 'tid@198' );
```

通过这3个参数就可以确定页面的唯一性统计各个页面的pv了，大部分情况下只需要pid和aid就可以了。

**说明：**关于`i_f`、`g_f`、`iarea`外部渠道号统计参数只计一次，内部已做了处理，使用时无需关注。



##点击行为统计使用

点击行为统计主要用于页面中局部位置的点击行为统计，如某个按钮的点击量，轮播图中各张图片的点击量等。

**接口及参数说明：**
```
//引入log模块指定为log
log.cksend( logType, params );

logType: --- 统计标识(必须)，字符串类型，比如logType=home_banner，具体值和后端约定

params: ---- 额外统计参数(可选)，字符串类型，多个参数以`,`分隔
             如需统计轮播图中各张图片的点击量, params=index1,index2
```

**使用方法1：**

在需要统计的dom元素上绑定`click`或`touchend`事件，调用`log.cksend()`方法即可，大多数情况下只需要logType参数即可，如：

```javascript
//如统计旅游首页某个按钮的点击量
$( '.submit-btn' ).on( 'click', function() {
    log.cksend( 'submit_btn' );
} );

//如统计旅游首页轮播图各张图的点击量
$( '.banner li' ).each( function( el, idx ) {
    $( this ).on( 'click', function() {
        log.cksend( 'banner', idx );
    } );
} );
```

**使用方法2：**

直接在dom元素上添加class为`log-send`, 并指定data-send统计参数，参数间用`|`分隔，这种方式更快捷，不需要额外绑定事件添加发送方法。如：
```html
<!--如统计旅游首页某个按钮的点击量-->
<a class="log-send" data-send="submit-btn">提交</a>

<!--如统计旅游首页轮播图各张图的点击量-->
<li class="log-send" data-send="banner|index1"></li>
```


