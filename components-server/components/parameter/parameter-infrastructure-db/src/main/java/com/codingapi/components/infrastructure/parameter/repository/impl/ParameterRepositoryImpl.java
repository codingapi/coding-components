package com.codingapi.components.infrastructure.parameter.repository.impl;

import com.codingapi.components.parameter.domain.Parameter;
import com.codingapi.components.parameter.repository.ParameterRepository;
import com.codingapi.components.infrastructure.parameter.jpa.JpaParameterRepository;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;

@AllArgsConstructor
public class ParameterRepositoryImpl implements ParameterRepository {

    private final JpaParameterRepository jpaParameterRepository;

    @Override
    public void save(Parameter parameter) {
        jpaParameterRepository.save(parameter);
    }

    @Override
    public void delete(int id) {
        jpaParameterRepository.deleteById(id);
    }

    @Override
    public Page<Parameter> list(PageRequest request) {
        return jpaParameterRepository.pageRequest(request);
    }

    @Override
    public Parameter getParam(String code) {
        return jpaParameterRepository.getParameterByCode(code);
    }
}
