```javascript
<!-- 源模板 -->
<script>
  var userName = "<%= userName %>";
</script>

<!-- 可构造以下攻击手段 -->
var userName = "";alert('xss');//";
```

```javascript
const javascriptEncode = str => {
  return str.replace(/>/g, '&gt;')
    .replace(/"/g, '\"')
    .replace(/'/g, "\'")
    .replace(/\//g, '\/')
    .replace(/\//g, '\/')
    .replace(/>/g, '\>')
    .replace(/</g, '\<');
}
```