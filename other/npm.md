```
portal
  ├── src .................. 前后端es6源文件目录
  |    ├── common .......... 前后端共享公共目录
  |    |     ├── ejs
  |    |     └── tpl
  |    ├── mock ............ mock数据及接口目录
  |    |     ├── channel.js
  |    |     └── home.js
  |    ├── server ........... 后端server目录
  |    |     ├── conf
  |    |     ├── dao
  |    |     ├── lib
  |    |     ├── routers
  |    |     ├── app.js
  |    |     └── run.js
  |    └── static ............ 前端静态资源目录
  |          └── app.js
  ├── view ................... node接入层对应模板目录
  |    ├── common
  |    └── page
  ├── .babelrc
  ├── .eslintrc
  ├── .gitignore
  ├── package.json
  ├── README.md
  └── webpack.config.js

"scripts": {
  "lint": "eslint src",
  "clean-server": "rimraf server mock common",
  "clean-static": "rimraf static",
  "clean": "npm run clean-server && npm run clean-static",
  "build-server": "cross-env BABEL_ENV=cjs babel src --out-dir ./",
  "start-server": "npm run build-server && nodemon server/run.js",
  "watch-server": "cross-env BABEL_ENV=cjs babel src --out-dir ./ --watch",
  "build-static": "cross-env NODE_ENV=production webpack",
  "watch-static": "cross-env NODE_ENV=development webpack --watch"
}
```






