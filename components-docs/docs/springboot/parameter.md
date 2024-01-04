---
toc: content
nav: 后端Framework  
group:
  title: 模块
  order: 1
title: 参数管理
order: 2
---

# 说明

参数管理是指通过配置的方式，动态生成参数管理界面，从而实现业务服务参数的动态化。

## 安装

```xml
<dependency>
    <groupId>com.codingapi.components</groupId>
    <artifactId>parameter-restapi</artifactId>
    <version>${components.version}</version>
</dependency>
```


## 使用

```java

import com.codingapi.components.parameter.restapi.ParameterContext;


// (int) 获取参数 name 的值，如果参数不存在，则返回默认值
int key = ParameterContext.getInstance().getIntParam("parameter_code",1);

// (string) 获取参数 name 的值，如果参数不存在，则返回默认值
String key = ParameterContext.getInstance().getStringParam("parameter_code","");

// (long) 获取参数 name 的值，如果参数不存在，则返回默认值
long key = ParameterContext.getInstance().getLongParam("parameter_code",1L);

// (double) 获取参数 name 的值，如果参数不存在，则返回默认值
double key = ParameterContext.getInstance().getDoubleParam("parameter_code",1.0);

// (float) 获取参数 name 的值，如果参数不存在，则返回默认值
float key = ParameterContext.getInstance().getFloatParam("parameter_code",1.0f);

```
