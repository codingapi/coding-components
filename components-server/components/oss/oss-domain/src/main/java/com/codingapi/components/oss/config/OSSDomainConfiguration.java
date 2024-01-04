package com.codingapi.components.oss.config;

import com.codingapi.components.oss.domain.OSSFile;
import com.codingapi.components.oss.repository.FileRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.util.List;

@Configuration
public class OSSDomainConfiguration {


    @Bean
    @ConditionalOnMissingBean
    public FileRepository fileRepository(){
        return new FileRepository() {
            @Override
            public void upload(String filename, InputStream inputStream) {

            }

            @Override
            public InputStream download(String filename) {
                return null;
            }

            @Override
            public void delete(String filename) {

            }

            @Override
            public List<OSSFile> findAll() {
                return null;
            }
        };
    }

}
