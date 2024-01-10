package com.codingapi.components.oss.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.codingapi.components.oss")
@ConditionalOnProperty(prefix = "codingapi.components.oss", name = "enabled", havingValue = "true", matchIfMissing = true)
public class OSSRestApiConfiguration {


}
