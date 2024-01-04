package com.codingapi.components.menu.repository;

import com.codingapi.components.menu.domain.Menu;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import org.springframework.data.domain.Page;

public interface MenuRepository {

    void save(Menu menu);

    void delete(int id);

    Page<Menu> list(PageRequest request);

    Menu getParam(String code);

}
