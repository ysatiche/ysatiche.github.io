---
title: 【设计模式系列学习】【单例模式】【js】
date: 2021-08-10 12:38:32
categories:
- desgin_pattern
tags:
- singleton
---

# 单例模式

# 常见实现

- 第一种 使用全局变量实现单例

```js
class A {
  constructor () {
    this.id = 'hello'
  }
}

let a
if (!a) {
  a = new A()
}

export default a
```


- 第二种 使用static实现

```js
class Test {

  static a = new Test()

  constructor () {
    this.id = 'hello'
  }

  setId (id) {
    this.id = id
  }

  getId () {
    return this.id
  }
}

const a1 = Test.a
const a2 = Test.a

a1.setId('world')
console.log(a2.getId())
```


- 如果是多线程的话？

之后go版本实现会考虑这个