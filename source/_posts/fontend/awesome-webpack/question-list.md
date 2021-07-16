title: webpack
categories:
- web前端
- webpack
tags:
- webpack
---
# question list

## webpack 中 target 含义

`target` 目标构建编译

`web` `node` `electron-main` `electron-renderer`

## webpack 中 resolve alias 含义

## babel版本差异 核心几个库之间区别

## webpack 打包成库和工程间有什么区别

`output.libraryTarget` 将这个值赋予 `output.library`

常见值：

> var

将值作为变量声明导出

> window

当 `library` 加载完成 入口起点的返回值分配给 window 对象

```js
window['MyLibrary'] = _entry_return_
window.MyLibrary.doSomething()
```

> global

> commonjs

> amd

> umd

## webpack external 

externals 指定当前哪些库不被打入 bundle.js

所以需要自己额外引入

## webpack3 webpack4 之间区别

1. 增加一个 mode: development | production

2. babel使用新命名空间 @babel

3. 支持es6的方式导入JSON文件

