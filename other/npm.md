```javascript
export default {
  tplName: 'commonList',

  getTplData(data) {
    const imgPh4b3 = "data:image/gif;base64,R0lGODlhBAADAIAAAP";
    let listImgCutPre = "w=160&h=120";
    if (data.netType === 4) listImgCutPre = "w=320&h=240";

    return {
      ...data,
      imgPh4b3,
      listImgCutPre
    }
  },

  getTplStr() {
    return `
      <ul class="lincoapp-graphic-list2">
        <% list.forEach(function(item, index) { %>
          <% var tagInfo = tagClassMap[item.tag] || []; %>
        <% }); %>
      </ul>
    `;
  }
};
```






