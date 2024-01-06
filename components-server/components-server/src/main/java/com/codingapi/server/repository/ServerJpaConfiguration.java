package com.codingapi.server.repository;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.codingapi.server.repository")
@EntityScan(basePackages = "com.codingapi.server.domain")
public class ServerJpaConfiguration {

}
