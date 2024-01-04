package com.codingapi.components.infrastructure.api.config;

import com.codingapi.components.infrastructure.api.repository.impl.ApiRepositoryImpl;
import com.codingapi.components.infrastructure.api.jpa.JpaApiMappingRepository;
import com.codingapi.components.api.repository.ApiRepository;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.codingapi.components.infrastructure.api")
@EntityScan(basePackages = "com.codingapi.components.api.domain")
@Configuration
public class ApiInfrastructureConfiguration {


    @Bean
    public ApiRepository apiMappingRepository(JpaApiMappingRepository jpaApiMappingRepository) {
        return new ApiRepositoryImpl(jpaApiMappingRepository);
    }

}
