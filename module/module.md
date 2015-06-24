前端模块化线上部署方案对比
==========================

前端采用模块化开发，使得开发体验大大增强，摆脱了很多需要人力去做且容易出错的点，使得代码管理更加清晰、规范。主要表现为以下几点：

1. 减少命名冲突，消除全局变量
2. 一个模块一个文件，组织更清晰
3. 依赖自动加载，按需加载

其中文件按需加载，依赖自动管理，使得更多精力去关注模块代码本身，开发时不需要在页面上写一大堆`script`引用，一个`require`初始化模块就搞定。不需要每增加一个文件，还要到`HTML`或者其他地方添加一个`script`标签或文件声明。

##前端模块化规范标准

1. CommonJs  (Node.js)
2. AMD  (RequireJS)
3. CMD (SeaJS)

####CommonJs
`CommonJS`是服务器模块的规范，`Node.js`采用了这个规范。根据`CommonJS`规范，一个单独的文件就是一个模块，每一个模块都是一个单独的作用域，在一个文件定义的变量（还包括函数和类），都是私有的，对其他文件是不可见的。`CommonJS`规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。

```javascript
var x = 5;
var addX = function(value) {
  return value + x;
};

module.exports.x = x;
module.exports.addX = addX;
```

####AMD  (RequireJS)
由于`Node.js`主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，因此`CommonJS`规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。如下规范定义及一般写法：

```javascript
//规范
define(id?, dependencies?, factory);
define.amd = {};

//写法1
define(function(require, exports, module) {
    var $ = require('jquery');
    //code here
});

//写法2
define(['jquery'], function($) {
    //code here
});

//写法3
define(['require', 'jquery'], function(require) {
    var $ = require('jquery');
    //code here
});
```

####CMD (SeaJS)
CMD规范和AMD类似，都主要运行于浏览器端，写法上看起来也很类似。主要是区别在于模块初始化时机，AMD中只要模块作为依赖时，就会加载并初始化，而CMD中，模块作为依赖且被引用时才会初始化，否则只会加载。如下规范定义及一般写法：

```javascript
//规范
define(factory);
define.cmd = {};

//写法1
define(function(require, exports, module) {
    var $ = require('jquery');
    //code here
});

//写法2
define(['jquery'], function(require, exports, module) {
    var $ = require('jquery');
    //code here
});
```

##兼容AMD、CMD及非模块化
很多时候如果我们引用第三方组件时，并没有采用模块化开发，通常我们自己需要包装一下或通过模块加载器的`shim`插件支持模块化引用依赖。现在很多第三方库已经默认支持`AMD`规范的引用，根据以上模块定义规范，开放给第三方使用的组件能兼容不同的规范，如下示例：

```javascript
(function(root, factory) {
    if (typeof define === "function" && (define.amd || define.cmd) {
        define(function(require, exports, module) {
            return factory(root);
        });
    } else {
        root.dialog = factory(root);
    }
})(window, function(root) {
    //code here
    return dialog;
});
```

