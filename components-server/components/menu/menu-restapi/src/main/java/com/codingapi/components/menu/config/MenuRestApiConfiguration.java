package com.codingapi.components.menu.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnProperty(prefix = "codingapi.components.menu", name = "enabled", havingValue = "true", matchIfMissing = true)
@ComponentScan(basePackages = "com.codingapi.components.menu")
public class MenuRestApiConfiguration {


}
