package com.codingapi.components.parameter.context;

import com.codingapi.components.parameter.repository.ParameterRepository;

public class ParameterContextRegister {

    public ParameterContextRegister(ParameterRepository parameterRepository) {
        ParameterContext.getInstance().init(parameterRepository);
    }
}
