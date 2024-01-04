package com.codingapi.components.parameter.repository;

import com.codingapi.components.parameter.domain.Parameter;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import org.springframework.data.domain.Page;

public interface ParameterRepository {

    void save(Parameter parameter);

    void delete(int id);

    Page<Parameter> list(PageRequest request);

    Parameter getParam(String code);

}
