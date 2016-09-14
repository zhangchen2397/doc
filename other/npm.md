```javascript
import $ from '@tencent/zepto-mt';
import promise from '@tencent/promise-mt';
import asyncRenderTpl from '../main/asyncRenderTpl';

const { renderType, imageVer } = GLOBAL_DATA;

const pageRun = {
  init() {
    const me = this;
    this.cache();

    if (renderType === 'async') {
      asyncRenderTpl().then((data) => {
        me.el.html(data);
        me.initPage();
      })['catch'](function(error) {
        console.log(error);
      });
    } else {
      this.initPage();
    }
  }
};

export default pageRun;
```






