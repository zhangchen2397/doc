```html
<!-- 源模板 -->
<div><%= title =></div>

<!-- 可构造以下攻击手段 -->
<div><script>alert('xss');</script></div>
<div><img src="./error.png" onerror="alert('xss')" /></div>
<div><iframe src="./error.html" onerror="alert('xss')"></iframe></div>
```

```javascript
const htmlEncode = str => {
  return str.replace(/>/g, '&gt;')
    .replace(/</g,'&lt;')
    .replace(/ /g,'&nbsp;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
```