package com.codingapi.components.parameter.config;

import com.codingapi.components.parameter.context.ParameterContextRegister;
import com.codingapi.components.parameter.domain.Parameter;
import com.codingapi.components.parameter.repository.ParameterRepository;
import com.codingapi.components.parameter.service.ParameterService;
import com.codingapi.springboot.framework.dto.request.SearchRequest;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;

@Configuration
public class ParameterDomainConfiguration {


    @Bean
    @ConditionalOnMissingBean
    public ParameterRepository parameterRepository() {
        return new ParameterRepository() {

            @Override
            public void save(Parameter parameter) {

            }

            @Override
            public void delete(int id) {

            }

            @Override
            public Page<Parameter> list(SearchRequest request) {
                return null;
            }

            @Override
            public Parameter getParam(String code) {
                return null;
            }
        };
    }


    @Bean
    @ConditionalOnMissingBean
    public ParameterService parameterService(ParameterRepository parameterRepository) {
        return new ParameterService(parameterRepository);
    }

    @Bean
    @ConditionalOnMissingBean
    public ParameterContextRegister parameterContextRegister(ParameterRepository parameterRepository){
        return new ParameterContextRegister(parameterRepository);
    }
}
