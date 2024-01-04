package com.codingapi.components.api.gateway.impl;

import com.codingapi.components.api.domain.Api;
import com.codingapi.components.api.gateway.ScriptMappingGateway;
import com.codingapi.springboot.fast.script.ScriptMapping;
import com.codingapi.springboot.fast.script.ScriptMappingRegister;
import com.codingapi.springboot.fast.script.ScriptMethod;
import com.codingapi.springboot.framework.dto.response.Response;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ScriptMappingGatewayImpl implements ScriptMappingGateway {

    private final ScriptMappingRegister scriptMappingRegister;


    @Override
    public void addMapping(Api api) {
        ScriptMapping scriptMapping = new ScriptMapping(api.getUrl(), ScriptMethod.valueOf(api.getMethod()), api.getScript());
        scriptMappingRegister.addMapping(scriptMapping);
    }

    @Override
    public Response test(Api api) {
        ScriptMapping scriptMapping = new ScriptMapping(api.getUrl(), ScriptMethod.valueOf(api.getMethod()), api.getScript());
        return scriptMappingRegister.test(scriptMapping);
    }

    @Override
    public void removeMapping(Api api) {
        scriptMappingRegister.removeMapping(api.getUrl(), ScriptMethod.valueOf(api.getMethod()));
    }
}
