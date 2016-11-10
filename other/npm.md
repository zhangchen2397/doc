```
Content-Security-Policy: script-src *.gtimg.com *.qq.com 'unsafe-inline' 'unsafe-eval'; report-uri ..

{  
  "csp-report": {  
    "document-uri": "http://info.3g.qq.com",  // 拦截发生的页面
    "referrer": "http://yuetu.3g.qq.com",  //页面的referrer
    "blocked-uri": "http://ztoolbar.10086.com/util.js",  // 违反页面策略的资源
    "violated-directive": "script-src 'self'",  // 所违反的指令
    "original-policy": " script-src *.gtimg.com *.qq.com 'unsafe-inline' 'unsafe-eval';" // 所配置的完整策略内容
  }
}
```
