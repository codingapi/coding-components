package com.codingapi.components.api.config;

import com.codingapi.components.api.gateway.ScriptMappingGateway;
import com.codingapi.components.api.gateway.impl.ScriptMappingGatewayImpl;
import com.codingapi.springboot.fast.script.ScriptMappingRegister;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@ComponentScan(basePackages = "com.codingapi.components.api")
@Configuration
public class ApiRestApiConfiguration {

    @Bean
    public ScriptMappingGateway scriptMappingGateway(ScriptMappingRegister scriptMappingRegister) {
        return new ScriptMappingGatewayImpl(scriptMappingRegister);
    }
}
