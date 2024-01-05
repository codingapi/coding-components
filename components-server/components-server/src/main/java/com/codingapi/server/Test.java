package com.codingapi.server;

import com.codingapi.components.parameter.context.ParameterContext;

public class Test {

    void test(){

        int test = ParameterContext.getInstance().getIntParam("test",1);
    }
}
