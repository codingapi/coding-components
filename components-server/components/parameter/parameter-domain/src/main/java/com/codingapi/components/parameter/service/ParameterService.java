package com.codingapi.components.parameter.service;

import com.codingapi.components.parameter.domain.Parameter;
import com.codingapi.components.parameter.repository.ParameterRepository;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

@AllArgsConstructor
public class ParameterService {

    private final ParameterRepository parameterRepository;


    public void delete(int id) {
        parameterRepository.delete(id);
    }

    public void save(Parameter parameter) {
        parameterRepository.save(parameter);
    }


    public Page<Parameter> list(PageRequest request) {
        request.addSort(Sort.by("sort").ascending());
        return parameterRepository.list(request);
    }
}
