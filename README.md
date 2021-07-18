# yaroku's blog

# 代码

注意：main分支放 `npm run deplo` 生成的静态资源

master分支放源码

# 运行

```bash
yarn install or npm install

git clone https://github.com/iissnan/hexo-theme-next themes/next // 当themes/next目录下没有文件时需要，有则不需要，说明之前已经下载了

npm run clean

npm run build

npm run server

npm run deploy // 部署到git
```

### 常见问题

> npm run deploy报错

重新安装 `hexo-deployer-git`

> vscode 中使用 `npm run deploy` 报链接出错

使用自带cmd执行命令



### category

默认类别：

> 一级类别

web前端，后端，数据库，运维，操作系统，算法，儒道佛

> 二级目录

web前端：vue, electron, webpack等

### tags

tags是在二级目录下再添加具体内容，比如vue中data的响应式原理的文章tag应该是 ['vue', 'vue2 data', '响应式原理']


## todolost

- 图片加载不出来
