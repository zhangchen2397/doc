前端模块化线上部署方案对比
==========================

前端采用模块化开发，使得开发体验大大增强，摆脱了很多需要人力去做且容易出错的点，使得代码管理更加清晰、规范。主要表现为以下几点：

1. 减少命名冲突，消除全局变量
2. 一个模块一个文件，组织更清晰
3. 依赖自动加载，按需加载

其中文件按需加载，依赖自动管理，使得更多精力去关注模块代码本身，开发时不需要在页面上写一大堆`script`引用，一个`require`初始化模块就搞定。不需要每增加一个文件，还要到`HTML`或者其他地方添加一个`script`标签或文件声明。

###前端模块化规范标准

1. CommonJs  (Node.js)
2. AMD  (RequireJS)
3. CMD (SeaJS)

#### CommonJs
`CommonJS`是服务器模块的规范，`Node.js`采用了这个规范。根据`CommonJS`规范，一个单独的文件就是一个模块，每一个模块都是一个单独的作用域，在一个文件定义的变量（还包括函数和类），都是私有的，对其他文件是不可见的。CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。

```javascript
var x = 5;
var addX = function(value) {
  return value + x;
};

module.exports.x = x;
module.exports.addX = addX;
```

###AMD  (RequireJS)


