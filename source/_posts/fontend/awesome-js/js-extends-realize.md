---
title: js继承
categories:
- web前端
- js
tags:
- js
---

# js实现继承的几种方式

- [JS继承的实现方式](https://www.cnblogs.com/humin/p/4556820.html) - JS继承的实现方式

- [class继承](https://www.liaoxuefeng.com/wiki/1022910821149312/1072866346339712) - class继承

## 匿名函数与匿名自执行函数

> 匿名函数

```js
btn.onclick = function () {}
```

> 匿名自执行函数

```js
(function(data){
  alert(data)
})('eee')
```

```js
(function(){
  // alert()
}())
```