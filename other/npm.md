```javascript
import ejs from '../ejs';
import commonList from './commonList';

const getCommonListTpl = (data) => {
  const { getTplData, getTplStr } = commonList;
  return ejs.render(getTplStr(), getTplData(data));
}
```






