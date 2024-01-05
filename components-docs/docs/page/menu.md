---
toc: content
nav: Page组件  
group:
  title: 组件
  order: 1
title: 菜单管理
order: 5
---

# 说明

提供对后台菜单的控制能力。

## 效果

菜单管理  

![index](/imgs/menu/index.png)

添加菜单

![index](/imgs/menu/add.png)

当配置完成菜单以后，登录将会根据配置的菜单来渲染菜单数据。如果需要自定义菜单权限可见 [菜单管理](/springboot/menu)文档。
在没有配置之前，菜单将完全由前端代码中的 `config/routes.ts`配置的来启用。

```ts
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
    access: 'hasAuthentication',
  },
```
access是增加了对菜单权限访问控制，如果没有开启菜单权限的情况下hasAuthentication将不会产生影响，建议所有配置的菜单都增加hasAuthentication数据。


## 原理说明

菜单的控制，是在登录以后获取的菜单列表数据，当后端配置了菜单模块以后，系统将提供`/api/menus`接口。
该接口即对应该用户下可访问的菜单列表。
由于react的界面是通过路由控制的，因此菜单管理，并不是只需要在后端增加菜单就可以生效，还需要在前端的代码中维护 `config/routes.ts`的路由配置。
后端菜单中的地址参数就是对应路由的地址的。

由于默认情况下前端配置的所有路由都可以被访问，为了控制权，增加了hasAuthentication的权限鉴别控制。该属性仅当开启了后端菜单模块以后才生效。
 

## 安装

```ts
import { OSSPage } from 'coding-components';
```

## 使用

```ts
import { list, save, del, tree } from '@/services/api/menu';
import { MenuPage } from 'coding-components';
import { PageContainer } from '@ant-design/pro-components';

export default () => {

  return (
    <PageContainer>
      <MenuPage
        save={save}
        list={list}
        del={del}
        tree={tree}
      />
    </PageContainer>
  )
};


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
  return request<API.Response<any>>('/api/menu/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function del(body: {
  id:string,
}, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/menu/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function save(body: any, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/menu/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function tree() {
  return request<API.Response<any>>('/api/menu/tree', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

```


