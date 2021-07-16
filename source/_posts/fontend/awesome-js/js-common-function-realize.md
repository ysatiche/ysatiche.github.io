---
title: js基础函数理解
categories:
- web前端
- js
tags:
- js
---

# js常见函数实现

## apply & call 的作用

> 改变 this 作用域

```js
// 一个简单的加法函数
function func1(a, b) {
  return a + b
}
// 普通调用其实涉及不到call appy
// 假如这个函数里面有this
function func (a, b) {
  console.log(a + b + this.value)
  return a + b + this.value
}

// 这时假如我们又一个对象
const obj = {
  value: 10
}

// 如果是之前的函数调用 这个 this 是指向不到 obj.value 
// 或者我们只能在 obj 里加一个函数 如下
const obj1 = {
  value: 10,
  add: function (a, b) {
    return a + b + this.value
  }
}

// 但假如我们用 call apply 就可以了

func.call(obj, 1, 2,)
func.apply(obj, [1, 2])
```

具体实现可以看下面但 apply call 函数

## bind

```js
Function.prototype.mybind = function () {
  let ctx = arguments[0] || {}
  let fn = this
  let args = Array.from(arguments[1])
  return function () {
    let newargs = [...arguments]
    return fn.apply(ctx, args.concat(newargs))
  }
}
```

## apply

```js
Function.prototype.myapply = function () {
  let args = []
  for (let i = 0; i < arguments[1].length; i++) {
      args.push('arguments[1][' + i + ']')
  }
  // 获取this指向的对象
  let obj = arguments[0] || {}
  // 得到唯一标识
  let fn = Symbol()
  obj[fn] = this
  // 执行这个函数
  let res = eval('obj[fn](' + args + ')')
  console.log('res', res)
  delete obj[fn]
  return res
}
```

## call

```js
Function.prototype._call = function (ctx, a, b) {
  console.log('ctx', ctx)
  // 1. 构造被调用对象，兼容默认值
    var obj = ctx || window 
    // 2. 获取后续参数 
    var args = Array.from(arguments).slice(1) 
    console.log('args', args)
    // 3. 获取唯一属性名 
    var fun = Symbol() 
    // 4. 增加属性方法，指向待调用函数 
    console.log(this)
    obj[fun] = this
    var result = obj[fun](...args) 
    // 5. 执行完毕后，删除该属性 
    delete obj[fun]
    return result
}
```

## 闭包

> 为什么要使用闭包呢？

假如我们要实现个防抖函数，就是每次滚动就一直重置时间 确保函数只在特定时间间隔执行，基本实现如下

```js
// func 回调函数
// wait 时间间隔
function debounce1 (func, wait) {
  let time = null
  if (time) {
    clearTimeout(time)
  }
  time = setTimeout(() => {
    func.call(this, ...arguments)
  }, wait)
}

// 存在问题 time 是局部变量 执行一次就相当于 time 变量多一个 一直滚动可能就出现几百个定时器
// 改变成全局变量就可以

// 但假如我们不能用全局变量呢？这个时候就得使用闭包
// 将 time 放入 function () {} 中 然后将这个 function return 回去 不能是箭头函数
function debounce (func, wait) {
  let time = null
  let _this = this
  let args = arguments
  return function () {
    if (time) clearTimeout(time)
    time = setTimeout(()=>{
      func.call(_this, ...args)
    }, wait)
  }
}

// eg1
document.getElementById('main').addEventListener('click', debounce(() => {console.log(1)}, 250)) // 可以

//eg2 这样不行 这样相当于初始化了两个 debounce 然后分别调用 这种情况类似于 vue 里面 data 返回的是一个函数 而不是一个object
debounce(() => {console.log(1)}, 250)()
debounce(() => {console.log(1)}, 250)()

// eg3 需要这样调用
const f =   debounce(function () {console.info(1)}, 250)
f()
f()
f()

//节流是规定函数在指定的时间间隔内只执行一次，一般用于scroll事件。
function throttle(fn,time){
  let canRun = true;
  return function () {
    if(!canRun){
      return
    }
    canRun = false;
    setTimeout(() => {
      fn.apply(this,arguments);
      canRun = true;
    },time)
  }
}

```


## new

- [js new一个对象的过程，实现一个简单的new方法](https://www.cnblogs.com/echolun/p/10903290.html) - js new一个对象的过程，实现一个简单的new方法

### 实现步骤

1.以构造器的prototype属性为原型 创建新对象
2.将this和调用参数传给构造器 执行
3.如果构造器没有手动返回对象 则返回第一步创建的新对象 如果有则返回手动创建的对象

### 实现代码

```js
//自己定义的new方法
let newMethod = function (Parent, ...rest) {
  // 1.以构造器的prototype属性为原型，创建新对象；
  let child = Object.create(Parent.prototype);
  // 2.将this和调用参数传给构造器执行
  let result = Parent.apply(child, rest);
  // 3.如果构造器没有手动返回对象，则返回第一步的对象
  return typeof result  === 'object' ? result : child;
};
```


## constructor

```js
function Shape() {
  this.x = 0;
  this.y = 0;
}
 
// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};
 
// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}
 
// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle; //If you don't set Object.prototype.constructor to Rectangle,
//it will take prototype.constructor of Shape (parent).
//To avoid that, we set the prototype.constructor to Rectangle (child).
```

## instanceof

与 `prototype.constructor` 强相关

```js
// 实现一个instanceof操作符
// instanceof操作符是判断原型链来生效的，所以只要你将左边的_proto_和右边的prototype做对比
function myInstance(left, right) {
  // 当left是基础类型的时候直接返回false
  if(typeof left !== 'object' || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  while(true) {
      if(proto === null) return false;
      if(proto === right.prototype) return true;
      proto = Object.getPrototypeOf(proto);
  }
}
```

## deepclone