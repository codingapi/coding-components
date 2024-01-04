---
toc: content
nav: Page组件  
group:
  title: 组件
  order: 1
title: 动态接口
order: 1
---

# 说明

动态接口是指通过配置的方式，动态生成接口，从而实现接口的动态化。动态接口仅支持查询接口。


## 安装

```ts
import { ApiPage } from 'coding-components';
```

## 使用

```ts
import { list, save, del, test } from '@/services/api/api';
import { ApiPage } from 'coding-components';
import { PageContainer } from '@ant-design/pro-components';

const MyPage = () =>{
  return (
    <PageContainer>

      <ApiPage
        list={list}
        save={save}
        del={del}
        test={test}
      />
    </PageContainer >
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
  return request<API.Response<any>>('/api/api/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function test(body: any, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/api/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function save(body: any, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/api/save', {
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
  return request<API.Response<any>>('/api/api/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

```
