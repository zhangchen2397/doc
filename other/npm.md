```html
<!-- 原始html -->
<a style ="background-image: url(javascript:alert('XSS'))"></a>
<style> h1 { background-image: expression(alert('xss')); } </style>

<a style ="background-image: url(javascr\\\ipt:alert('XSS'))"></a>
<style> h1 { background-image: ex pression(alert('xss')); } </style>
```


```
Content-Security-Policy: script-src *.gtimg.com *.qq.com 'unsafe-inline' 'unsafe-eval';

{  
  "csp-report": {  
    "document-uri": "http://info.3g.qq.com",
    "referrer": "http://yuetu.3g.qq.com",
    "violated-directive": "script-src 'self'",
    "original-policy": " script-src *.gtimg.com *.qq.com 'unsafe-inline' 'unsafe-eval';"
}
```
