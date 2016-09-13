```javascript
"scripts": {
  "clean": "rimraf lib dist umd",
  "lint": "eslint src",
  "build:cjs": "cross-env BABEL_ENV=cjs babel src --out-dir lib",
  "build:umd": "cross-env BABEL_ENV=umd babel src --out-dir umd",
  "build:dist": "cross-env NODE_ENV=development webpack",
  "build:dist:min": "cross-env NODE_ENV=production webpack",
  "build": "npm run build:cjs && npm run build:umd",
  "dev": "cross-env BABEL_ENV=cjs babel src --out-dir lib --watch",
  "prepublish": "npm run clean && npm run build"
}
```




