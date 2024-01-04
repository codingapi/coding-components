package com.codingapi.components.menu.service;

import com.codingapi.components.menu.domain.Menu;
import com.codingapi.components.menu.repository.MenuRepository;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

@AllArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;


    public void delete(int id) {
        menuRepository.delete(id);
    }

    public void save(Menu menu) {
        menuRepository.save(menu);
    }

    public Page<Menu> list(PageRequest request) {
        request.addSort(Sort.by("sort").ascending());
        return menuRepository.list(request);
    }
}
