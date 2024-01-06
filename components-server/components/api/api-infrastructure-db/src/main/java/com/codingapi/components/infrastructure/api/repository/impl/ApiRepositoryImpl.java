package com.codingapi.components.infrastructure.api.repository.impl;

import com.codingapi.components.api.domain.Api;
import com.codingapi.components.infrastructure.api.jpa.JpaApiMappingRepository;
import com.codingapi.components.api.repository.ApiRepository;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import com.codingapi.springboot.framework.dto.request.SearchRequest;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class ApiRepositoryImpl implements ApiRepository {

    private final JpaApiMappingRepository jpaApiMappingRepository;

    @Override
    public void save(Api api) {
        jpaApiMappingRepository.save(api);
    }

    @Override
    public Api get(int id) {
        return jpaApiMappingRepository.getById(id);
    }

    @Override
    public void delete(int id) {
        jpaApiMappingRepository.deleteById(id);
    }

    @Override
    public Page<Api> list(PageRequest request) {
        return jpaApiMappingRepository.pageRequest(request);
    }

    @Override
    public Page<Api> list(SearchRequest request) {
        return jpaApiMappingRepository.searchRequest(request);
    }
}
