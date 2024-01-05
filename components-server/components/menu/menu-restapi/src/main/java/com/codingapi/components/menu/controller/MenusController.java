package com.codingapi.components.menu.controller;

import com.codingapi.components.menu.domain.Menu;
import com.codingapi.components.menu.gateway.MenuGateway;
import com.codingapi.springboot.framework.dto.response.SingleResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@RequestMapping("/api/menus")
public class MenusController {

    private final MenuGateway menuGateway;

    @GetMapping
    public SingleResponse<Menu> index() {
        return SingleResponse.of(menuGateway.loadMenus());
    }

}
