```html
<!-- 原始html -->
<script>
  var userName = "<%= userName %>";
</script>

<!-- 可构造以下xss -->
<script>
  var userName = "";alert('xss');//"
</script>
```

```javascript
//简单应对
const javascriptEncode = str => {
  return str.replace(/\//g, "\/")
    .replace(/"/g, '\"').replace(/'/g, "\'")
    .replace(/>/g, '\\x3E').replace(/</g, '\\x3C');
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
