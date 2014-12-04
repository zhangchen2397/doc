#ios及android下添加桌面快捷方式使用说明

由于ios及android下弹出浮层的策略不一致，且部署时有的页面只需要ios快捷方式浮层，有的页面android和ios的快捷方式浮层都需要，所以组件分为`shortcutIos`和`shortcutAndroid`，根据需要单独引入调用即可。

##SVN地址

[shortcutAndroid](http://tc-svn.tencent.com/mqq/mqq_3gqq_rep/info_proj/trunk/commons/mt/mods/shortcutAndroid/shortcutAndroid.js)

[shortcutIos](http://tc-svn.tencent.com/mqq/mqq_3gqq_rep/info_proj/trunk/commons/mt/mods/shortcutIos/shortcutIos.js)

##使用

根据需要，通过SVN externals方式将相应的组件引用到当前项目中，使用时无需考虑是否已模块化或有无依赖，如项目已模块化则按模块化的方式使用即可，如没有则按照传统的方式使用，无须对源代码做变更，使用示例如下：

**已模块化的项目使用**

```javascript
define('init', ['shortcutAndroid', 'shortcutIos'], function(shortcutAndroid, shortcutIos) {
    new shortcutAndroid({
        key: 'travel'  //业务key值，各业务对应的名称见下表
    });

    new shortcutIos({
        key: 'travel'  //业务key值，各业务对应的名称见下表
    });
});
```

**末模块化的项目使用**

```javascript
new shortcutAndroid({
    key: 'travel'  //业务key值，各业务对应的名称见下表
});

new shortcutIos({
    key: 'travel'  //业务key值，各业务对应的名称见下表
});
```

测试时可通过清除浏览器缓存重复出现浮层，如在页面底部出现浮层，刚正常。

**注：**如添加的业务中之前在页面顶部的轻应用的推广位，需要先去掉，具体可以和产品沟通确认。


##上线需求表

**只需部署ios浮层**

key       | 业务名称                                                        | url
----------|-----------------------------------------------------------------|--------------------------------------------------------------------------------
todaynews | [今日要闻](http://info.3g.qq.com/g/s?&aid=td_news_list)         | [http://info.3g.qq.com/g/s?&aid=td_news_list](http://info.3g.qq.com/g/s?&aid=td_news_list)
iauto     | [秀车](http://infoapp.3g.qq.com/g/s?aid=carshow#home)           | [http://infoapp.3g.qq.com/g/s?aid=carshow#home](http://infoapp.3g.qq.com/g/s?aid=carshow#home)
astro     | [爱星座](http://infoapp.3g.qq.com/g/s?aid=astro&g_ut=3#home)    | [http://infoapp.3g.qq.com/g/s?aid=astro&g_ut=3#home](http://infoapp.3g.qq.com/g/s?aid=astro&g_ut=3#home)
finance   | [爱理财](http://gp.3g.qq.com/g/s?aid=ifinance#fund/0)           | [http://gp.3g.qq.com/g/s?aid=ifinance#fund/0](http://gp.3g.qq.com/g/s?aid=ifinance#fund/0)
live      | [爱直播](http://live.3g.qq.com/g/touch2/?#home)                 | [http://live.3g.qq.com/g/touch2/?#home](http://live.3g.qq.com/g/touch2/?#home)
video     | [爱播](http://infoapp.3g.qq.com/g/s?aid=video)                  | [http://3gimg.qq.com/wap30/infoapp/touch/itravel/images/sc/video.png](http://3gimg.qq.com/wap30/infoapp/touch/itravel/images/sc/video.png)
stock     | [自选股](http://gp.3g.qq.com/g/stock/wap3/index.jsp?#page=MyStock)    | [http://gp.3g.qq.com/g/stock/wap3/index.jsp?#page=MyStock](http://gp.3g.qq.com/g/stock/wap3/index.jsp?#page=MyStock)
read      | [悦读](http://infoapp.3g.qq.com/g/s?aid=medialib)               | [http://infoapp.3g.qq.com/g/s?aid=medialib](http://infoapp.3g.qq.com/g/s?aid=medialib)


**ios及android都需部署相应浮层**

key       | 业务名称                                                        | url
----------|-----------------------------------------------------------------|--------------------------------------------------------------------------------
yuetu     | [悦图](http://info.3g.qq.com/g/s?aid=image)                     | [http://info.3g.qq.com/g/s?aid=image](http://info.3g.qq.com/g/s?aid=image)
nba       | [掌上NBA](http://infoapp.3g.qq.com/g/s?aid=nbasearch#home)      | [http://infoapp.3g.qq.com/g/s?aid=nbasearch#home](http://infoapp.3g.qq.com/g/s?aid=nbasearch#home)
auto      | [掌上车典](http://infoapp.3g.qq.com/g/s?aid=touchauto#home)     | [http://infoapp.3g.qq.com/g/s?aid=touchauto#home](http://infoapp.3g.qq.com/g/s?aid=touchauto#home)
movie     | [爱电影](http://infoapp.3g.qq.com/g/s?&aid=movie)               | [http://infoapp.3g.qq.com/g/s?&aid=movie](http://infoapp.3g.qq.com/g/s?&aid=movie)

产品跟进请联系`@alisonxu(徐莉)`，任何使用问题请直接联系我，辛苦各位！
