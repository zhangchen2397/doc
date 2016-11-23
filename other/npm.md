```html
<!-- 原始html -->
<a style ="background-image: url(<%= url %>)"></a>

<a style ="background-image: url(javascr\\\ipt:alert('XSS'))"></a>
<a style ="background-image: url(javascr\\\ipt:alert('XSS'))"></a>
<a style ="background-image: url(&#106;&#97;vascript:alert('XSS'))"></a>
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
