package com.codingapi.components.infrastructure.parameter.config;

import com.codingapi.components.infrastructure.parameter.jpa.JpaParameterRepository;
import com.codingapi.components.infrastructure.parameter.repository.impl.ParameterRepositoryImpl;
import com.codingapi.components.parameter.repository.ParameterRepository;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.codingapi.components.infrastructure.parameter")
@EntityScan(basePackages = "com.codingapi.components.parameter.domain")
@Configuration
public class ParameterInfrastructureConfiguration {


    @Bean
    public ParameterRepository parameterRepository(JpaParameterRepository jpaApiMappingRepository) {
        return new ParameterRepositoryImpl(jpaApiMappingRepository);
    }

}
