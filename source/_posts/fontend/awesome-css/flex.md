# flex

## QA LIST

### flex: 1 含义

`flex` 是 `flex-grow` `flex-shrink` `flex-basis` 的缩写

`flex-grow` 属性定义了项目的放大比例 默认为0 即如果存在剩余空间 也不放大

`flex-shrink` 属性定义了项目的缩小比例 默认为1 即如果空间不足 项目自动缩小

`flex-basis` 属性定义了在分配多余空间之前 项目占据的主轴空间 浏览器根据这个属性 计算主轴是否有多余的空间。他的默认值为 auto 即项目的本来大小

故其取值可以考虑以下情况：

`flex` 的默认值是以上三个属性的组合，假设以上三个属性取默认值 则 `flex` 的默认值 `0 1 auto` 

`flex` 如果有设置则 覆盖默认值 如下两个是等价的

```js
.item { flex: 2333 22 22px; }

.item {
  flex-grow: 2333;
  flex-shrink: 3222;
  flex-basis: 234px;
}
```

当 `flex` 取值是 `none` 则计算值是 `0 0  auto`

当 `flex` 取值是 `auto` 则计算值是 `1 1 auto`

当 `flex` 取值是一个非负值 则该数字是 `flex-grow`值 等价如下 
```
.item {flex: 1;}
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

当 `flex` 是一个长度或者百分比，则视为 `flex-basis` 值 等价如下
```
.item-1 {flex: 0%;}
.item-1 {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
.item-2 {flex: 24px;}
.item-1 {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 24px;
}
```

当 `flex` 取值为两个非负值时 等同如下
```
.item {flex: 2 3;}
.item {
  flex-grow: 2;
  flex-shrink: 3;
  flex-basis: 0%;
}
```

当 `flex` 取值是一个非负数字和一个长度或者百分比 等同如下
```
.item {flex: 2333 3222px;}
.item {
    flex-grow: 2333;
    flex-shrink: 1;
    flex-basis: 3222px;
}
```

> 参考

- [flex:1和flex:auto详解](https://www.cnblogs.com/wenqiangit/p/11664524.html) - flex:1和flex:auto详解
