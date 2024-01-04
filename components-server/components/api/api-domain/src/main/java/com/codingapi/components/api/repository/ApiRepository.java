package com.codingapi.components.api.repository;

import com.codingapi.components.api.domain.Api;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import org.springframework.data.domain.Page;

public interface ApiRepository {

    void save(Api api);

    Api get(int id);

    void delete(int id);

    Page<Api> list(PageRequest request);



}
