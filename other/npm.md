```javascript
define('m_share', [
  'm_zepto', 'm_cookie', 'm_tips', 'm_login', 'm_base64'
], function ($, cookie, tips, login, base64) {
  function share(config) {
    this.config = $.extend({}, this.defaultConfig, config || {});
    this.init.call(this);
  }

  //other code from here

  return share;
});
```