
package com.codingapi.components.infrastructure.oss.client;

import com.codingapi.components.infrastructure.oss.properties.OSSProperties;
import com.codingapi.components.oss.domain.OSSFile;
import io.minio.*;
import io.minio.messages.Item;
import lombok.SneakyThrows;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MinIOClient {

    private final MinioClient client;

    private final String bucketName;

    public MinIOClient(OSSProperties ossProperties) {
        this.bucketName = ossProperties.getBucket();
        this.client = MinioClient.builder()
                .endpoint(ossProperties.getEndpoint())
                .credentials(ossProperties.getAccessKey(), ossProperties.getSecretKey())
                .build();
        this.createBucket();
    }

    @SneakyThrows
    private void createBucket(){
        if (!client.bucketExists(BucketExistsArgs.builder()
                .bucket(bucketName)
                .build())) {
            client.makeBucket(MakeBucketArgs.builder()
                    .bucket(bucketName)
                    .build());
        }
    }

    @SneakyThrows
    public List<OSSFile> list(){
        Iterable<Result<Item>> list =  client.listObjects(ListObjectsArgs.builder()
                .bucket(bucketName)
                .build());
        List<OSSFile> files = new ArrayList<>();
        for (Result<Item> itemResult : list) {
            Item item = itemResult.get();
            String contentType = Files.probeContentType(Path.of(item.objectName()));

            OSSFile ossFile = new OSSFile();
            ossFile.setName(item.objectName());
            ossFile.setType(contentType);
            ossFile.setCreateTime(Date.from(item.lastModified().toInstant()));
            ossFile.setUrl("/oss/"+item.objectName());
            files.add(ossFile);
        }
        return files;
    }

    @SneakyThrows
    public void delete(String id) {
        client.removeObject(RemoveObjectArgs.builder()
                .bucket(bucketName)
                .object(id)
                .build());
    }


    @SneakyThrows
    public InputStream download(String filename) {
        InputStream stream =
                client.getObject(
                        GetObjectArgs.builder().bucket(bucketName)
                                .object(filename).build());

       return stream;
    }

    @SneakyThrows
    public void upload(String filename, InputStream inputStream) {
        client.putObject(PutObjectArgs.builder()
                .bucket(bucketName)
                .object(filename)
                .stream(inputStream, -1, 10485760)
                .build());

    }
}
