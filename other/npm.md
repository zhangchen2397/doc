```javascript
<!-- 源模板 -->
<h1 style ="background-image: url(<%= bgUrl %>)"></h1>
<style>
  h1 { background-image: : url(<%= bgUrl %>); }
</style>


<!-- 可构造以下攻击手段 -->
<h1 style ="background-image: url(javascript:alert('xss'))"></h1>
<style>
  h1 { height: expression(alert('xss')); }
</style>
```
