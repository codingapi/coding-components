package com.codingapi.components.parameter.context;

import com.codingapi.components.parameter.domain.Parameter;
import com.codingapi.components.parameter.repository.ParameterRepository;
import lombok.Getter;

public class ParameterContext {

    @Getter
    public static final ParameterContext instance = new ParameterContext();

    private ParameterRepository parameterRepository;

    void init(ParameterRepository parameterRepository){
        this.parameterRepository = parameterRepository;
    }

    private ParameterContext(){

    }

    public Parameter getParam(String code){
        return parameterRepository.getParam(code);
    }

    public int getIntParam(String code,int defaultValue){
        Parameter parameter =  parameterRepository.getParam(code);
        if(parameter!=null){
            return parameter.getIntValue();
        }
        return defaultValue;
    }


    public String getStringParam(String code,String defaultValue){
        Parameter parameter =  parameterRepository.getParam(code);
        if(parameter!=null){
            return parameter.getValue();
        }
        return defaultValue;
    }


    public long getLongParam(String code,long defaultValue){
        Parameter parameter =  parameterRepository.getParam(code);
        if(parameter!=null){
            return parameter.getLongValue();
        }
        return defaultValue;
    }

    public float getFloatParam(String code,float defaultValue){
        Parameter parameter =  parameterRepository.getParam(code);
        if(parameter!=null){
            return parameter.getFloatValue();
        }
        return defaultValue;
    }


    public double getDoubleParam(String code,double defaultValue){
        Parameter parameter =  parameterRepository.getParam(code);
        if(parameter!=null){
            return parameter.getDoubleValue();
        }
        return defaultValue;
    }

}
