# qiankun 使用

> 参考文章

https://qiankun.umijs.org/zh/guide

https://github.com/umijs/qiankun/examples

## 概念

### 主应用

管理微应用的入口服务

### 微应用

微前端服务

## 使用

### 主应用配置


### 微应用配置

### 在主应用中注册微应用

> 安装 qiankun

`yarn add qiankun`

> 在主应用中注册微应用

```js
import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'react app', // app name
    entry: '//localhost:7100', // app 入口 TODO 这个是需要微应用先启动吗？
    container: '#yourContainer', // 微应用加载的div
    activeRule: '/yourActiverRule' // 路由匹配规则
  },
  {
    name: 'react app', // app name
    entry: '//localhost:7110', // app 入口 TODO 这个是需要微应用先启动吗？
    container: '#yourContainer', // 微应用加载的div
    activeRule: '/yourActiverRule' // 路由匹配规则
  }
])

start()
```

> 如果微应用不是直接与路由关联的，可以选择手动加载微应用的方式

```js
import { loadMicroApp } from 'qiankun'

loadMicroApp({
  name: 'app',
  entry: '//localhost:7700',
  container: '$yourcaontainer'
})
```
