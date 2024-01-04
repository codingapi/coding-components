package com.codingapi.components.infrastructure.oss.properties;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OSSProperties {

    private String endpoint;
    private String accessKey;
    private String secretKey;
    private String bucket;
}
