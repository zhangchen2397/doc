```html
<!-- 原始html -->
<div><%= title %></div>
<img src="error.png" onerror="<%= url %>" />

<!-- 可构造以下xss -->
<div><script>alert("xss");</script></div>
<img src="error.png" onerror="alert('xss')" />

<!-- 应对非完整版 -->
const htmlEncode = str => {
  return str.replace(/>/g,'&gt;')
    .replace(/</g,'&lt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
};
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
