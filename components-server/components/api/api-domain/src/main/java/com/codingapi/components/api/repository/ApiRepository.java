package com.codingapi.components.api.repository;

import com.codingapi.components.api.domain.Api;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import com.codingapi.springboot.framework.dto.request.SearchRequest;
import org.springframework.data.domain.Page;

public interface ApiRepository {

    void save(Api api);

    Api get(int id);

    void delete(int id);

    Page<Api> list(SearchRequest request);

    Page<Api> list(PageRequest pageRequest);



}
