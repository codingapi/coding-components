package com.codingapi.components.menu.controller;

import com.codingapi.components.menu.domain.Menu;
import com.codingapi.components.menu.repository.MenuRepository;
import com.codingapi.components.menu.service.MenuService;
import com.codingapi.springboot.framework.dto.request.IdRequest;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import com.codingapi.springboot.framework.dto.response.MultiResponse;
import com.codingapi.springboot.framework.dto.response.Response;
import com.codingapi.springboot.framework.dto.response.SingleResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/menu")
@AllArgsConstructor
public class MenuController {

    private final MenuService menuService;

    private final MenuRepository menuRepository;

    @PostMapping("/save")
    public Response save(@RequestBody Menu menu) {
        menuService.save(menu);
        return Response.buildSuccess();
    }


    @PostMapping("/delete")
    public Response delete(@RequestBody IdRequest request) {
        menuService.delete(request.getIntId());
        return Response.buildSuccess();
    }


    @GetMapping("/list")
    public MultiResponse<Menu> list(PageRequest request) {
        return MultiResponse.of(menuService.list(request));
    }


    @GetMapping("/tree")
    public SingleResponse<Menu> tree() {
        return SingleResponse.of(menuRepository.tree());
    }
}
