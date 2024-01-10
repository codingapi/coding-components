package com.codingapi.components.infrastructure.menu.config;

import com.codingapi.components.infrastructure.menu.jpa.JpaMenuRepository;
import com.codingapi.components.infrastructure.menu.repository.impl.MenuRepositoryImpl;
import com.codingapi.components.menu.repository.MenuRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ConditionalOnProperty(prefix = "codingapi.components.menu", name = "enabled", havingValue = "true", matchIfMissing = true)
@EnableJpaRepositories(basePackages = "com.codingapi.components.infrastructure.menu")
@EntityScan(basePackages = "com.codingapi.components.menu.domain")
public class MenuInfrastructureConfiguration {


    @Bean
    public MenuRepository menuRepository(JpaMenuRepository jpaMenuRepository) {
        return new MenuRepositoryImpl(jpaMenuRepository);
    }

}
