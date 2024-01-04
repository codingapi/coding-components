---
toc: content
nav: 后端Framework  
group:
  title: 模块
  order: 1
title: 文件服务
order: 3
---

# 说明

文件服务是指通过配置的方式，动态生成文件管理界面，从而实现业务服务文件的动态化。

## 安装

```xml
<dependency>
    <groupId>com.codingapi.components</groupId>
    <artifactId>oss-restapi</artifactId>
    <version>${components.version}</version>
</dependency>
```

## 使用

前端通过文件上传组件，可实现文件的上传和下载。

```ts

// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

export async function upload(file: File) {
  const formData = new FormData();
  formData.append('files', file);

  return request<API.Response<any>>('/api/oss/upload', {
    method: 'POST',
    data: formData,
  });
}

```

upload 返回的结果如下：

```json
{
  "code": 0,
  "msg": "success",
  "data": "/oss/xxxx.jpg"  
}
```

oss/xxxx.jpg 是文件的访问路径，前端可以通过该路径访问文件。
