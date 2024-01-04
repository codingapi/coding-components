---
toc: content
nav:
  title: 后端Framework
  order: 4
group:
  title: 介绍
  order: 1
---
# 说明

后端Framework提供对后端的一些基础功能的封装，包括参数管理、文件服务、动态接口等功能

## 安装
  
```xml
 <dependency>
    <groupId>com.codingapi.components</groupId>
    <artifactId>api-restapi</artifactId>
    <version>${components.version}</version>
</dependency>

<dependency>
    <groupId>com.codingapi.components</groupId>
    <artifactId>parameter-restapi</artifactId>
    <version>${components.version}</version>
</dependency>

<dependency>
    <groupId>com.codingapi.components</groupId>
    <artifactId>oss-restapi</artifactId>
    <version>${components.version}</version>
</dependency>

```

## application.properties 配置

```yaml

server.port=8090

application.version=@project.version@

# 数据库配置
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/coding-components?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=admin123
# 数据库连接池配置
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=10
spring.datasource.hikari.connection-timeout=30000
# JPA配置
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# 开启允许覆盖bean
spring.main.allow-bean-definition-overriding=true

# 放开接口路径
codingapi.security.ignore-urls=/open/**,/oss/**,/#/**,/,/**.css,/**.js,/**.svg,/**.png,/**.ico

# OSS文件服务配置
codingapi.components.oss.endpoint=http://localhost:9000
codingapi.components.oss.access-key=admin
codingapi.components.oss.secret-key=admin123
codingapi.components.oss.bucket=oss

```
