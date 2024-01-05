---
toc: content
nav: 后端Framework  
group:
  title: 模块
  order: 1
title: 菜单管理
order: 4
---

# 说明

菜单管理是控制前端展示菜单列表的功能。

## 安装

```xml
<dependency>
    <groupId>com.codingapi.components</groupId>
    <artifactId>menu-restapi</artifactId>
    <version>${components.version}</version>
</dependency>
```

## 自定义菜单权限

模型代码提供的对所有菜单的可见控制。

前端是通过/api/menus接口来获取用户的菜单数据的，由于菜单模块本身并没有提供权限控制的功能，因此只引入菜单模块时调用菜单接口将返回所有配置的菜单列表数据。
如果想要控制权限，可重写`MenuGateway`接口。

实例代码如下：

```java

import com.codingapi.components.menu.domain.Menu;
import com.codingapi.components.menu.gateway.MenuGateway;
import com.codingapi.components.menu.repository.MenuRepository;
import com.codingapi.springboot.security.jwt.TokenContext;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@AllArgsConstructor
public class MyMenuGateway implements MenuGateway {

    private final MenuRepository menuRepository;

    @Override
    public Menu loadMenus() {
        String username = TokenContext.current().getToken();
        log.info("username:{}",username);
        // todo 根据当前用户获取对应的菜单，下面的代码是伪代码
        return menuRepository.tree();
    }
}

```
