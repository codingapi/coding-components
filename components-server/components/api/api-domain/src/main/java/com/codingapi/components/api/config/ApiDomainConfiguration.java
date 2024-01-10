package com.codingapi.components.api.config;

import com.codingapi.components.api.domain.Api;
import com.codingapi.components.api.gateway.ScriptMappingGateway;
import com.codingapi.components.api.repository.ApiRepository;
import com.codingapi.components.api.service.ApiService;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import com.codingapi.springboot.framework.dto.request.SearchRequest;
import com.codingapi.springboot.framework.dto.response.Response;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;

@Configuration
@ConditionalOnProperty(prefix = "codingapi.components.api", name = "enabled", havingValue = "true", matchIfMissing = true)
public class ApiDomainConfiguration {


    @Bean
    @ConditionalOnMissingBean
    public ScriptMappingGateway scriptMappingGateway(){
        return new ScriptMappingGateway() {
            @Override
            public void addMapping(Api api) {

            }

            @Override
            public Response test(Api api) {
                return null;
            }

            @Override
            public void removeMapping(Api api) {

            }
        };
    }

    @Bean
    @ConditionalOnMissingBean
    public ApiRepository apiMappingRepository() {
        return new ApiRepository() {
            @Override
            public void save(Api api) {

            }

            @Override
            public Api get(int id) {
                return null;
            }

            @Override
            public void delete(int id) {

            }

            @Override
            public Page<Api> list(SearchRequest request) {
                return null;
            }

            @Override
            public Page<Api> list(PageRequest pageRequest) {
                return null;
            }
        };
    }


    @Bean
    @ConditionalOnMissingBean
    public ApiService apiMappingService(ApiRepository apiRepository, ScriptMappingGateway scriptMappingGateway) {
        return new ApiService(apiRepository, scriptMappingGateway);
    }
}
