title: webpack
categories:
- web前端
- webpack
tags:
- webpack
---

# loader

## loader features

- Loader can be chanied.

- Loader can be synchronous or asynchronous

- Loader run in nodejs

- Loader can be configured with an options object

# 从 babel-loader 看如何实现一个简单 loader

## laoder interface

A loader is just a JavaScript module that exports a function. The loader runner calls this function and passes the result of the previous loader or the resource file into it. The this context of the function is filled-in by webpack and the loader runner with some useful methods 

### basic loader usage

```js
module.exports = function (source) {
  // 对source做一系列的转换
  return source;
}
```

### 获得 loader 的options

```js
const loaderUtils = require('loader-utils');
module.exports = function(source) {
    // 获取用户为当前Loader传入的options
    console.log(loaderUtils.getOptions(this));
    return source;
}
```

### 返回其他结果

如上，我们返回的是转换后的内容，但是有些情况下，我们不仅仅需要返回转换后的内容，还需要返回一些其他的内容，如sourceMap或是AST语法树，那么这时候我们可以使用webpack提供的APIthis.callback，当使用this.callback了，那么我们就必须需要在Loader函数返回undefined,以此来让webpack知道返回的结果在this.callback中，API详细参数如下：

```js
this.callback(
  // 无法装换原内容的Error
  err: Error || null,
  // 装换后的内容，如上述的source
  content: string | Buffer,
  // 用于通过转换后的内容得出原内容Source Map 方便调试
  sourceMap?: SourceMap,
  // 如果本地转换同时ast语法树 也可以将这个ast返回
  abstractSyncTree? AST
)
```

### 同步与异步

看看异步Loader在 `this.async` API下

```js
module.exports = async function (source) {
  const callback = this.async()
  const { err, content, sourceMap, AST } = await Func()
  callback(err, content, sourceMap, AST)
}
```

### 处理二进制数据

像 `file-loader` 这样的loader，处理的是二进制数据，那么就需要告诉webpack给loader传入二进制格式的数据

```js
module.exports = function (source) {
  if (source instanceof Buffer) {
    return source // 当然我本身也可以返回二进制数据传给下一个loader
  }
}

module.exports.raw = true // 不设置就会拿到字符串
```

# 参考

[webpack loader](https://webpack.js.org/concepts/loaders/)

[writing a loader](https://webpack.js.org/contribute/writing-a-loader/)

[loader interface](https://webpack.js.org/api/loaders/)

[loader 简析](https://juejin.im/post/6844903794371723277)