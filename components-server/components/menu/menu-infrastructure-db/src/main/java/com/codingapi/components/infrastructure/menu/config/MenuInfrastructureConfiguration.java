package com.codingapi.components.infrastructure.menu.config;

import com.codingapi.components.infrastructure.menu.jpa.JpaMenuRepository;
import com.codingapi.components.infrastructure.menu.repository.impl.MenuRepositoryImpl;
import com.codingapi.components.menu.repository.MenuRepository;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.codingapi.components.infrastructure.menu")
@EntityScan(basePackages = "com.codingapi.components.menu.domain")
@Configuration
public class MenuInfrastructureConfiguration {


    @Bean
    public MenuRepository menuRepository(JpaMenuRepository jpaMenuRepository) {
        return new MenuRepositoryImpl(jpaMenuRepository);
    }

}