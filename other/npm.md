```javascript
  const checkIframeHijack = () => {
    const flag = 'iframe_hijack_redirected';
    if (getURLParam(flag)) {
      sendHijackReport('iframe');
    } else {
      if (self != top) {
        var url = location.href;
        var parts = url.split('#');
        var joinSbl = location.search ? '&' : '?';
        parts[0] += `${joinSbl}${flag}=1`;
        top.location = parts.join('#');
      }
    }
  }
```
