package com.codingapi.components.infrastructure.oss.config;

import com.codingapi.components.infrastructure.oss.client.MinIOClient;
import com.codingapi.components.infrastructure.oss.properties.OSSProperties;
import com.codingapi.components.infrastructure.oss.repository.impl.FileRepositoryImpl;
import com.codingapi.components.oss.repository.FileRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnProperty(prefix = "codingapi.components.oss", name = "enabled", havingValue = "true", matchIfMissing = true)
public class OSSInfrastructureConfiguration {


    @Bean
    @ConfigurationProperties(prefix = "codingapi.components.oss")
    public OSSProperties ossProperties() {
        return new OSSProperties();
    }

    @Bean
    public MinIOClient minIOClient(OSSProperties ossProperties) {
        return new MinIOClient(ossProperties);
    }

    @Bean
    public FileRepository fileRepository(MinIOClient minIOClient) {
        return new FileRepositoryImpl(minIOClient);
    }

}
