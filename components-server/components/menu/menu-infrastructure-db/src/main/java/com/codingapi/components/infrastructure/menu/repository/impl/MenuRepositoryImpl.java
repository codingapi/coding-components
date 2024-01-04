package com.codingapi.components.infrastructure.menu.repository.impl;

import com.codingapi.components.infrastructure.menu.jpa.JpaMenuRepository;
import com.codingapi.components.menu.domain.Menu;
import com.codingapi.components.menu.repository.MenuRepository;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;

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
    public List<Menu> findAll() {
        return jpaParameterRepository.findAll(Sort.by("sort").ascending());
    }

    @Override
    public Menu tree() {
        List<Menu> list = findAll();
        Menu root = Menu.root();
        fetchChildren(root, list);
        return root;
    }

    private void fetchChildren(Menu parent, List<Menu> typeList) {
        for (Menu type : typeList) {
            if (parent.getId() == type.parentId()) {
                parent.addChild(type);
                fetchChildren(type, typeList);
            }
        }
    }


}
