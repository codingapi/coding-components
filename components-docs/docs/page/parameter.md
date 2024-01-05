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

参数管理是系统全局的参数控制，开启模块以后可以在后台管理参数，并在代码中获取参数用于业务控制。


## 效果

参数设置界面

![index](/imgs/parameter/index.png)

在后端中使用：

```java
import com.codingapi.components.parameter.context.ParameterContext;

public class Test {
    
    void test(){

        int test = ParameterContext.getInstance().getIntParam("test",1);
    }
}

```

通过`ParameterContext.getInstance().getIntParam("test",1)`既可以获取参数，支持Float、Doule、Long、Int、String等常用的数据格式。

后端更多使用说明见 [参数管理](/springboot/parameter)


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


export async function save(body: any, options?: { [key: string]: any }) {
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
