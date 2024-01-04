package com.codingapi.components.infrastructure.api.jpa;

import com.codingapi.components.api.domain.Api;
import com.codingapi.springboot.fast.jpa.repository.FastRepository;

public interface JpaApiMappingRepository extends FastRepository<Api,Integer> {

    Api getById(int id);
}
