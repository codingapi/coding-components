---
toc: content
nav: 指南
group:
  title: 初始化
  order: 2
title: 服务初始化  
order: 2
---

## 服务初始化

该框架由于尚未上传到中心仓库，因此需要使用者自行搭建组件仓库。

仓库搭建的服务有两个，分别是nexus和verdaccio。

本服务一共开启了四个服务，分别是nexus、verdaccio、mysql、minio。其中mysql和minio是方便后续测试的服务，可以不用启动，注释掉即可。

docker-compose.yml文件内容如下：  
```yaml
version: "3"

services:
  verdaccio:
    image: verdaccio/verdaccio:5
    container_name: verdaccio
    restart: always
    ports:
      - "4873:4873"
    volumes:
      - "./verdaccio-data:/verdaccio/storage/"
      - "./verdaccio-conf:/verdaccio/conf/"
  nexus:
    restart: always    
    image: sonatype/nexus3
    container_name: nexus3
    volumes:
      - "./nexus-data:/nexus-data"
    ports:
      - "8081:8081"
      - "8082:8082"
  mysql:
    image: mysql:8.2.0
    container_name: mysql
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    volumes:
      - "./db-data:/var/lib/mysql"
    environment:
      TZ: "Asia/Shanghai"
      MYSQL_ROOT_PASSWORD: admin123
      MYSQL_DATABASE: components
    restart: always
    ports:
      - "3306:3306"
    healthcheck:
      test: "/usr/bin/mysql --user=root --password=12345678 --execute \"SHOW DATABASES;\""
      interval: 2s
      timeout: 20s
      retries: 10
  minio:
    image: minio/minio:RELEASE.2023-04-20T17-56-55Z
    container_name: minio
    restart: always
    expose:
      - "9000"
      - "9001"
    ports:
      - "9001:9001"
      - "9000:9000"
    environment:
      TZ: "Asia/Shanghai"
      MINIO_ROOT_USER: admin
      MINIO_ROOT_PASSWORD: admin123
    volumes:
      - "./minio-data:/data"
    command: server /data --console-address ":9001"

```
本地的需要保留文件：./verdaccio-conf/config.yaml
```yaml
#
# This is the config file used for the docker images.
# It allows all users to do anything, so don't use it on production systems.
#
# Do not configure host and port under `listen` in this file
# as it will be ignored when using docker.
# see https://verdaccio.org/docs/en/docker#docker-and-custom-port-configuration
#
# Look here for more config file examples:
# https://github.com/verdaccio/verdaccio/tree/master/conf
#

# path to a directory with all packages
storage: /verdaccio/storage/data
# path to a directory with plugins to include
plugins: /verdaccio/plugins

web:
  # WebUI is enabled as default, if you want disable it, just uncomment this line
  #enable: false
  title: Verdaccio
  # comment out to disable gravatar support
  # gravatar: false
  # by default packages are ordercer ascendant (asc|desc)
  # sort_packages: asc
  # darkMode: true

# translate your registry, api i18n not available yet
# i18n:
# list of the available translations https://github.com/verdaccio/ui/tree/master/i18n/translations
#   web: en-US

auth:
  htpasswd:
    file: /verdaccio/storage/htpasswd
    # Maximum amount of users allowed to register, defaults to "+infinity".
    # You can set this to -1 to disable registration.
    # max_users: 1000

# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/

packages:
  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    #
    # you can specify usernames/groupnames (depending on your auth plugin)
    # and three keywords: "$all", "$anonymous", "$authenticated"
    access: $all

    # allow all known users to publish/publish packages
    # (anyone can register by default, remember?)
    publish: $authenticated
    unpublish: $authenticated

    # if package is not available locally, proxy requests to 'npmjs' registry
    proxy: npmjs

middlewares:
  audit:
    enabled: true

# log settings
logs:
  - { type: stdout, format: pretty, level: http }
  #- {type: file, path: verdaccio.log, level: info}
#experiments:
#  # support for npm token command
#  token: false
#  # support for the new v1 search endpoint, functional by incomplete read more on ticket 1732
#  search: false

# This affect the web and api (not developed yet)
#i18n:
#web: en-US

```

服务启动指令：  
```shell
docker-compose up -d
```

### 配置nexus仓库：
访问http://localhost:8081/ ，进入nexus管理界面。

nexus的账户admin的密码默认为可在nexus-data/admin.password中查看。
查看指令如下:
```shell
docker exec -it nexus3 cat /nexus-data/admin.password
```
登录以后需要修改密码，统一设置为admin/admin123。


### 配置verdaccio仓库：
访问http://localhost:4873/ ，进入verdaccio管理界面。

添加用户：  
```shell
npm adduser --registry http://localhost:4873
```
统一设置为admin/admin123。


## 服务账户密码

### nexus
地址：http://localhost:8081/  
账户：admin  
密码：admin123  

### verdaccio
地址：http://localhost:4873/  
账户：admin  
密码：admin123 

### mysql
地址：localhost:3306  
账户：root  
密码：admin123  

### minio
地址：localhost:9000  
账户：admin  
密码：admin123  
