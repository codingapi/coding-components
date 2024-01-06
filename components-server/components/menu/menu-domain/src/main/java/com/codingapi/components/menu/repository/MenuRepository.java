package com.codingapi.components.menu.repository;

import com.codingapi.components.menu.domain.Menu;
import com.codingapi.springboot.framework.dto.request.SearchRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MenuRepository {

    void save(Menu menu);

    void delete(int id);

    Page<Menu> list(SearchRequest request);

    List<Menu> findAll();

    Menu tree();

}
