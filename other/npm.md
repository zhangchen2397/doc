```javascript
define('m_share', [
  'm_zepto', 'm_cookie', 'm_tips', 'm_login'
], function ($, cookie, tips, login) {
  function share(config) {
    this.config = $.extend({}, defaultConfig, config || {});
    this.init.call(this);
  }

  //other code from here

  return share;
});
```
