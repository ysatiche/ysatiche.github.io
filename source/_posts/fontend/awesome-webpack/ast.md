title: webpack
categories:
- web前端
- webpack
tags:
- webpack
---

# AST 语法树递归解析

webpack 通过文件路径加载模块后，开始对源码进行解析，将其转换成AST语法树，我么需要babel一些包来进行转换

```js
1// babylon 主要就是把源码转化为 AST
2// @babel/traverse 遍历到对应的节点
3// @babel/types  遍历到的节点进行替换
4// @babel/generator 替换好的结果进行生成
5
yarn add babylon @babel/traverse @babel/types @babel/generator --save
```

```js
1/**
 2 * 功能: 解析源码 —— AST 解析语法树
 3 * 1、babylon 主要就是把源码转化为 AST
 4 * 2、@babel/traverse 遍历到对应的节点
 5 * 3、@babel/types  遍历到的节点进行替换
 6 * 4、@babel/generator 替换好的结果进行生成
 7 * 
 8 * 例子：let str = require('./a.js')  => let str = __webpack_require__("./src\\a.js");
 9 * 
10 * @param {*} source 主入口源码内容
11 * @param {*} parentPath 目录路径 (./src)
12 */
13 parse(source, parentPath){
14  let ast = babylon.parse(source);
15  let dependcies = []; // 依赖数组
16  traverse(ast,{
17    CallExpression(p){   // 表达式调用，比如:require()
18      let node = p.node; // 获取到对应的节点
19      // 如果当前解析的节点为 require 节点，然后对其改造
20      if(node.callee.name === 'require'){ 
21        node.callee.name = "__webpack_require__";  // 更改节点名字
22        let moduleName = node.arguments[0].value;// 取到引入模块的名字
23        moduleName = moduleName + (path.extname(moduleName)?'':'.js'); // 判断是够有扩展名，如果没有，则加上
24        moduleName = './' + path.join(parentPath, moduleName); // 拼接名字(./src + ./a.js = ./src/a.js)
25        dependcies.push(moduleName);
26        node.arguments = [types.stringLiteral(moduleName)]; // 改变对应的值
27      }
28    }
29  })
30  let sourceCode = generator(ast).code;
31  return {sourceCode, dependcies}
32}
33
34/**
35 * 功能:构建模块
36 * @param {*} modulePath entry 入口文件路径
37 * @param {*} isEntry   是否为主模块的依赖入口
38 */
39 buildModule(modulePath, isEntry){
40  // 拿到模块的内容
41  let source = this.getSource(modulePath);
42  // 模块 id modulePath = modulePath - this.root (打包后后的 key 为相对路径)
43  let moduleName = './' + path.relative(this.root, modulePath); // src/index.js
44
45  // 判断当前是否为主入口
46  if(isEntry){
47    this.entryId = moduleName;
48  }
49
50  // 解析 需要把 source 源码进行改造,返回一个依赖列表
51  // 1、解析 require 2、将引入的模块路径前加 ./src
52  let {sourceCode, dependcies} = this.parse(source, path.dirname(moduleName));  // 取 ./src
53
54  // 装载模块(把相对路径和模块中的内容 对应起来)
55  this.modules[moduleName] = sourceCode
56
57  // 递归，继续解析文件中的依赖文件 —— 附模块的加载
58  dependcies.forEach(depPath=>{
59    this.buildModule(path.join(this.root,depPath), false);
60  })
61}
```


