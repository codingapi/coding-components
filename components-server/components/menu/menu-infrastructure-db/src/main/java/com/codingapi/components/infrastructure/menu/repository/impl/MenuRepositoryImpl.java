package com.codingapi.components.infrastructure.menu.repository.impl;

import com.codingapi.components.infrastructure.menu.jpa.JpaMenuRepository;
import com.codingapi.components.menu.domain.Menu;
import com.codingapi.components.menu.repository.MenuRepository;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;

@AllArgsConstructor
public class MenuRepositoryImpl implements MenuRepository {

    private final JpaMenuRepository jpaParameterRepository;

    @Override
    public void save(Menu menu) {
        jpaParameterRepository.save(menu);
    }

    @Override
    public void delete(int id) {
        jpaParameterRepository.deleteById(id);
    }

    @Override
    public Page<Menu> list(PageRequest request) {
        return jpaParameterRepository.pageRequest(request);
    }

    @Override
    public Menu getParam(String code) {
        return jpaParameterRepository.getParameterByCode(code);
    }
}
