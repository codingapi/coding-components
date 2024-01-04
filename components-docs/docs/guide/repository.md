---
toc: content
nav: 指南
group:
  title: 初始化
  order: 2
title: 仓库初始化  
order: 3
---

# 仓库初始化

将代码编译并完成组件的私有化发布后，就可以在项目中使用了。

## 依赖环境
* jdk 17+
* maven 3.8+
* nodejs 16+
* yarn 1.22+



## clone 代码
```shell
git clone git@github.com:xlorne/ui.git
```
### 添加私有仓库的账户配置
```shell
cd ~/.m2
vim settings.xml
```
```xml
  ...
  <servers>

    <server>
      <id>maven-releases</id>
      <username>admin</username>
      <password>admin123</password>
    </server>

  </servers>
  ...
```


## 打包java代码的组件
```shell
cd components-server
mvn clean 
cd components
mvn -DskipTests=true deploy
```

## 打包前端代码的组件
```shell
cd components-ui
yarn
yarn build
yarn publish
```

## 打包脚手架
```shell
cd coding-cli
yarn
yarn publish
```




