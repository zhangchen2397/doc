```javascript
import $ from '@tencent/zepto-mt';
import promise from '@tencent/promise-mt';
import ejs from '../../common/ejs';
import slider from '../../common/tpl/slider';

const ajaxPageData => (resolve, reject) {
  //ajax data
};

const renderAsyncTpl =>(data, resolve, reject) {
  let asyncTplArr = [];

  [slider, headline, moreRecom].forEach((item, index) => {
    let tpl = '';
    const { tplName, getTplData, getTplStr } = item;
    tpl = ejs.render(getTplStr(), getTplData(data));
    asyncTplArr.push(tpl);
  });

  resolve(asyncTplArr.join(''));
};

export default () => {
  return new promise((resolve, reject) => {
    ajaxPageData(resolve, reject);
  });
}
```






