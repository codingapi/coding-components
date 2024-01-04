package com.codingapi.components.menu.repository;

import com.codingapi.components.menu.domain.Menu;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MenuRepository extends InitializingBean {

    void save(Menu menu);

    void delete(int id);

    Page<Menu> list(PageRequest request);

    List<Menu> findAll();

    Menu tree();

}
