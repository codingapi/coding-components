package com.codingapi.components.api.service;

import com.codingapi.components.api.domain.Api;
import com.codingapi.components.api.gateway.ScriptMappingGateway;
import com.codingapi.components.api.repository.ApiRepository;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import com.codingapi.springboot.framework.dto.request.SearchRequest;
import com.codingapi.springboot.framework.dto.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.data.domain.Page;

@AllArgsConstructor
public class ApiService implements InitializingBean {

    private final ApiRepository apiRepository;

    private final ScriptMappingGateway scriptMappingGateway;

    public void save(Api api) {
        api.verify();
        if (api.hasId()) {
            Api old = apiRepository.get(api.getId());
            scriptMappingGateway.removeMapping(old);
        }
        if (api.hasDisabled()) {
            scriptMappingGateway.removeMapping(api);
        } else {
            scriptMappingGateway.addMapping(api);
        }
        apiRepository.save(api);
    }

    public void delete(int id) {
        Api api = apiRepository.get(id);
        if(api !=null) {
            scriptMappingGateway.removeMapping(api);
            apiRepository.delete(id);
        }
    }

    public Response test(Api api) {
        api.verify();
        return scriptMappingGateway.test(api);
    }


    public Page<Api> list(SearchRequest request) {
        return apiRepository.list(request);
    }

    public void registerAll() {
        int pageNumber = 0;
        PageRequest request = PageRequest.of(pageNumber, 100);
        Page<Api> page = apiRepository.list(request);
        while (page.hasContent()) {
            page.getContent().forEach(apiMapping -> {
                if (apiMapping.hasDisabled()) {
                    return;
                }
                scriptMappingGateway.addMapping(apiMapping);
            });

            page = apiRepository.list(request.next());
        }
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        registerAll();
    }
}
