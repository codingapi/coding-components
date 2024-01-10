package com.codingapi.components.parameter.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.codingapi.components.parameter")
@ConditionalOnProperty(prefix = "codingapi.components.parameter", name = "enabled", havingValue = "true", matchIfMissing = true)
public class ParameterRestApiConfiguration {


}
