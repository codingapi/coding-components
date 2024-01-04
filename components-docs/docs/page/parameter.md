---
toc: content
nav: Page组件  
group:
  title: 组件
  order: 1
title: 参数管理
order: 2
---

# 说明

参数管理是指通过配置的方式，动态生成参数管理界面，从而实现业务服务参数的动态化。


## 安装

```ts
import { ParameterPage } from 'coding-components';
```

## 使用

```ts
import { list, save, del } from '@/services/api/parameter';
import { PageContainer } from '@ant-design/pro-components';
import { ParameterPage } from 'coding-components';
import React from 'react';

const MyPage: React.FC = () => {

  return (
    <PageContainer>
      <ParameterPage
        list={list}
        save={save}
        del={del} />

    </PageContainer>
  );
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
  return request<API.Response<any>>('/api/parameter/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function save(body: Table.SaveCommand, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/parameter/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function del(body: {
  id:string,
}, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/parameter/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

```
