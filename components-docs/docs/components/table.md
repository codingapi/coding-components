---
toc: content
nav: UI组件
group:
  title: 组件
  order: 1
title: MyTable
order: 1
---

# 介绍

MyTable是基于pro-components的ProTable二次封装的表格组件。  

## 功能列表
主要提供如下几个功能：  
1. 支持排序功能
2. 支持表格最大化
3. 支持表格宽度的拖动
4. 增加默认的页数控制

## 属性说明

```ts
export type MyTableProps<T, U> = ProTableProps<T, U> & {
    columns: any[];
    sortable?: boolean;
    dragSortKey?: string;
    onDragSortEnd?: (beforeIndex: number, afterIndex: number, newDataSource: T[]) => Promise<void> | void;
};
```
在默认ProTable属性的基础之上增加了如上四个属性。  
columns 还是对应ProTable的字段属性，强制为必填字段。  
sortable 是否支持开启排序功能，默认为关闭状态  
dragSortKey，onDragSortEnd 均为排序时支持的属性，dragSortKey是在开启排序时手动拖拽的字段。onDragSortEnd是排序完成以后的数据刷新更新操作。


## 效果

![index](/imgs/table/index.png)


## 实例代码如下

```ts
 <MyTable
    headerTitle="表格"
    sortable={true}
    dragSortKey="id"
    actionRef={actionRef}
    onDragSortEnd={async (beforeIndex, afterIndex, newDataSource) => {
      // 默认排序的接口排序
      await Thread.sleep(1000);
      console.log('newDataSource', newDataSource);
    }}
    rowKey="id"
    request={async (params, sorter, filter) => {
      const { data, success } = await queryUserList({
        ...params,
        sorter,
        filter,
      });
      return {
        data: data?.list || [],
        success,
      };
    }}
    columns={columns}

  />
```
