package com.codingapi.components.api.gateway;

import com.codingapi.components.api.domain.Api;
import com.codingapi.springboot.framework.dto.response.Response;

public interface ScriptMappingGateway {


    void addMapping(Api api);


    Response test(Api api);


    void removeMapping(Api api);
}
