```javascript
import $ from 'm_zepto';
import cookie from 'm_cookie';
import tips from 'm_tips';
import login from 'm_login';

function share(config) {
  this.config = $.extend({}, defaultConfig, config || {});
  this.init.call(this);
}

//other code from here

export default share
```
