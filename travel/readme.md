share 分享组件重构说明 [SVN](http://tc-svn.tencent.com/mqq/mqq_3gqq_rep/info_proj/trunk/webapp/frontend/mods/share/share.js)
=======================

[先点击查看demo](http://samczhang.kf0309.3g.qq.com/frontend/mods/share/demo/share.html) (建议扫描下方二维码手机上体验效果更佳)

![qr code](http://zxpic.gtimg.com/infoapp/0/images_143487007211522533.png/800)

###分享组件重构说明
分享作为业务的一个基础功能，各业务都有接入，在微信及悦图项目中接入分享时，感觉使用起来还是相对繁琐，首先是整个分享分成了多个组件（shareModule, wxshare, wxshareSet），且初始化时传入的参数也不统一，除了初始化组件外，还需要做一些额外的工作，比如各浏览器的判断调用相应的分享方法，在微信及手机qq中webview中展示不同的分享指引，在我接入分享中还有些功能不好满足，比如统计分享回流、同一页面多个分享入口分别分享不同的内容、分享内容重置等。此次重构主要解决接入成本（使用便捷性）、功能扩展。

###分享能力说明
1. 通过web方式分享（`qq空间`、`新浪微博`、`腾讯微博`）所有浏览器都支持
2. 分享到`手机qq`，目前只支持`ios`下的浏览器拉起手机qq，分享到qq好友
3. 分享到`微信`（好友或朋友圈），`qq浏览器`、`uc浏览器`支持，非`qq浏览器`、`uc浏览器`，在已安装`qq浏览器`且能正常拉起的情况下，调用分享接口时，先拉起qq浏览器，然后利用qq浏览器的能力分享，否则引导用户下载`qq浏览器`

###组件主要功能
1. 分享基础功能（使用时无关关心平台及浏览器的差异，组件内已做处理）
2. 分享回流统计（可配置各分享渠道的统计参数i_f）
3. 支持同一页面中多个分享入口分享不同内容（如悦图中从上一个图集跳到下一图集时，更新分享内容）
4. 微信及手机qq中的webview分享提示（组件内已统一处理，使用时不用关心）
5. 微信webview中调用原生分享时已初始化分享内容配置（组件内已初始化wxshareSet组件，无须再单独引用）

###使用
使用相当简单，组件不约束交互及展现形式，各分享形式都可方便接入。
使用时只需要在分享的元素class上添加`ic-share`, `data-share`设置对应的分享类型，然后实例组件传入配置即可。
```html
<span data-share="share-wx-timeline" class="ic-share">微信朋友圈</span>
<span data-share="share-wx-friend" class="ic-share">微信好友</span>
<span data-share="share-sina-wb" class="ic-share">新浪微博</span>
<span data-share="share-tx-wb" class="ic-share">腾讯微博</span>
<span data-share="share-qzone" class="ic-share">qq空间</span>
<span data-share="share-qq" class="ic-share">手机qq</span>
```

```javascript
new share({
    title: document.title,               //分享标题
    description: document.title,         //分享描述
    img: DEFAULT_SHARE_IMG,              //分享图片
    url: location.href,                  //分享url
    shareQQUrl: 'mqqapi://share/to_fri', //分享到手机qq的地址，后端提供
    sinaAuthUrl: 'http://4g.qq.com',     //分享到新浪微博的授权地址，后端提供   
    state: 'index5_show',                //分享到新浪微博时约定的cookie后缀，与后端约定

    //很多情况下需要统计分享回流量，且需要区分各分享渠道
    //这里可配置i_f的map表，分享出去的url会自动在查询字符串插入相应的i_f
    //如原url中已有i_f，会被替换掉
    //微信朋友圈及微信好友为同一下i_f
    //分享到手机qq的url是后端提供的，如需统计需后端配置
    ifMap: {
        wx: '',       //微信好友及朋友圈
        sinaWb: '',   //新浪微博
        txWb: '',     //腾讯微博
        qzone: ''     //qq空间
    }
})
```

###对外调用接口及自定义事件
```javascript
/**
 * @method shareWxTimeLine 分享到微信朋友圈
 * @method shareWxFriend 分享到微信好友
 * @method shareSinaWb 分享到新浪微博
 * @method shareTxWb 分享到腾讯微博
 * @method shareQzone 分享到qq空间
 * @method shareQQ 分享到手机qq

 * @method setShareConfig 设置分享配置参数 @para {object} 同配置参数
 * @method shareTip 在微信及手机qq中的webview中调用分享指引方法 @para {string} wxwebview | qqwebview
 *
 * @customEvent beforeClickShareBtn 点击分享按钮前事件
 *    可用于一页面中有多个分享入口时
 *    分享前可监听此事件调用setShareConfig方法重置分享内容
 * @customEvent afterClickShareBtn 点击分享按钮后事件，可用于统计分享点击量
 * @customEvent wbShareSuccess 分享到新浪微博或腾讯微博成功时的事件
 * @customEvent wbShareFailure 分享到新浪微博或腾讯微博失败时的事件
 * @customEvent wxShareSuccess 分享到微信朋友圈或微信好友成功时的事件
 * @customEvent wxShareFailure 分享到微信朋友圈或微信好友失败时的事件
 */
 ```