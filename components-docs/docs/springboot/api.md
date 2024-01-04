---
toc: content
nav: 后端Framework  
group:
  title: 模块
  order: 1
title: 动态接口
order: 1
---

# 说明

动态模块基于grovvvy脚本实现，通过groovy脚本实现动态接口的实现。

## 安装

```xml
<dependency>
    <groupId>com.codingapi.components</groupId>
    <artifactId>api-restapi</artifactId>
    <version>${components.version}</version>
</dependency>
```


## 脚本教程
支持三种对象
- request 请求对象
- jdbc 数据库操作对象
- jpa jpa操作对象


### request
```groovy
// 获取参数name的值，如果参数不存在，则返回默认值
var name = $request.getParameter("name","");
// 获取分页对象
var pageRequest = $request.pageRequest(0,10);
// 获取分页对象的页码
var pageNumber = pageRequest.getPageNumber();
// 获取分页对象的每页记录数
var pageSize = pageRequest.getPageSize();
// 获取分页对象的偏移量
var offset = pageRequest.getOffset();
```

### jdbc
```groovy
// 查询jdbcSQL $jdbc.queryForList({sql},{params})

// 查询无条件的数据
var res = $jdbc.queryForList("select * from api_mapping");
// 查询有条件的数据
var res = $jdbc.queryForList("select * from api_mapping where name = ?",name);
// 查询多条件的数据
var res = $jdbc.queryForList("select * from api_mapping where name = ? and url = ?",name,url);

// 分页查询 $jdbc.queryForPage({sql},{countSql},{pageRequest},{params})
var res = $jdbc.queryForPage("select * from api_mapping where name = ? and url = ?",
"select count(1) from api_mapping where name = ? and url = ?",pageRequest,params.toArray());
```

### jpa
```groovy
// 查询jpa $jpa.listQuery({clazz},{sql},{params})

// 查询无条件的数据
var res = $jpa.listQuery(com.example.entity.NodeEntity.class,"from NodeEntity");
// 查询有条件的数据
var res = $jpa.listQuery(com.example.entity.NodeEntity.class,"from NodeEntity where name = ?",name);

```


## 示例脚本

1.动态条件查询

```groovy
// 获取name的请求参数
var name = $request.getParameter("name","");
// 动态组织sql
String sql = "select * from api_mapping where 1=1 ";
// 动态组织参数
var params = [];
if(!"".equals(name)){
    sql += " and name = ? ";
    params.add(name);
}
// 执行查询
return $jdbc.queryForList(sql,params.toArray());

```

2.动态分页查询

```groovy
// 获取name的请求参数
var name = $request.getParameter("name","");
var pageNumber = $request.getParameter("pageNumber",0);
var pageSize = $request.getParameter("pageSize",10);
// 创建分页对象
var pageRequest = $request.pageRequest(pageNumber,pageSize);
// 动态组织sql
var sql = "select * from api_mapping where 1 =1 ";
var countSql = "select count(1) from api_mapping where 1 =1 ";
// 动态组织参数
var params = [];
if(!"".equals(name)){
    sql += " and name = ? ";
    countSql += " and name = ? ";
    params.push(name);
}
sql += " limit ?,?";
// 添加分页参数
params.add(pageRequest.getOffset());
params.add(pageRequest.getPageSize());
// 执行分页查询
return $jdbc.queryForPage(sql,countSql,pageRequest,params.toArray());
```
