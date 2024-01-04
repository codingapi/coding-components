package com.codingapi.components.infrastructure.parameter.jpa;

import com.codingapi.components.parameter.domain.Parameter;
import com.codingapi.springboot.fast.jpa.repository.FastRepository;

public interface JpaParameterRepository extends FastRepository<Parameter,Integer> {

    Parameter getParameterByCode(String code);
}
