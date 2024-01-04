---
toc: content
nav: Page组件  
group:
  title: 组件
  order: 1
title: 文件服务
order: 3
---

# 说明

文件服务是指通过配置的方式，动态生成文件服务界面，从而实现业务服务文件的动态化。

## 安装

```ts
import { OSSPage } from 'coding-components';
```

## 使用

```ts
import { del, list, upload } from '@/services/api/oss';
import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import { OSSPage } from 'coding-components';

const MyPage: React.FC = () => {

  return (
    <PageContainer>
      <OSSPage
        list={list}
        upload={upload}
        del={del}
      />
    </PageContainer >
  )
};

export default MyPage;

```

接口的定义如下：

```ts
// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';


export async function list(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response<any>>('/api/oss/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}



export async function upload(file: File) {
  const formData = new FormData();
  formData.append('files', file);

  return request<API.Response<any>>('/api/oss/upload', {
    method: 'POST',
    data: formData,
  });
}


export async function del(body: {
  id:string,
}, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/oss/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

```
