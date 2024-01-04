---
toc: content
nav: 前端Framework  
group:
  title: 框架
  order: 1
title: UrlUtils
order: 4
---

# 介绍

  UrlUtils提供对url的解析，包括获取url参数、解析url参数等操作。   


## 示例
```ts
import { UrlUtils } from "coding-components";

// 获取url参数
const name = UrlUtils.getParameterByName("name", "http://localhost:8000?name=123");

// 解析当前url参数
const params = UrlUtils.getParameterByNameFromUrl("name");

// 获取文件名称
const fileName = UrlUtils.getFilenameFromUrl("http://localhost:8000/test.txt");

// 获取文件后缀
const suffix = UrlUtils.getSuffixFromUrl("http://localhost:8000/test.txt");
```
