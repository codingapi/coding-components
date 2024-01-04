package com.codingapi.components.menu.config;

import com.codingapi.components.menu.domain.Menu;
import com.codingapi.components.menu.repository.MenuRepository;
import com.codingapi.components.menu.service.MenuService;
import com.codingapi.components.menu.context.MenuContextRegister;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;

import java.util.List;

@Configuration
public class MenuDomainConfiguration {


    @Bean
    @ConditionalOnMissingBean
    public MenuRepository menuRepository() {
        return new MenuRepository() {

            @Override
            public void save(Menu menu) {

            }

            @Override
            public void delete(int id) {

            }

            @Override
            public Page<Menu> list(PageRequest request) {
                return null;
            }

            @Override
            public List<Menu> findAll() {
                return null;
            }

            @Override
            public Menu tree() {
                return null;
            }

            @Override
            public void afterPropertiesSet() throws Exception {

            }
        };
    }


    @Bean
    @ConditionalOnMissingBean
    public MenuService menuService(MenuRepository menuRepository) {
        return new MenuService(menuRepository);
    }

    @Bean
    @ConditionalOnMissingBean
    public MenuContextRegister menuContextRegister(MenuRepository menuRepository){
        return new MenuContextRegister(menuRepository);
    }
}
