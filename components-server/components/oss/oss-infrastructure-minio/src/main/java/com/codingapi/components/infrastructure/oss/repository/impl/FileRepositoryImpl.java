package com.codingapi.components.infrastructure.oss.repository.impl;

import com.codingapi.components.infrastructure.oss.client.MinIOClient;
import com.codingapi.components.oss.domain.OSSFile;
import com.codingapi.components.oss.repository.FileRepository;
import lombok.AllArgsConstructor;

import java.io.InputStream;
import java.util.List;

@AllArgsConstructor
public class FileRepositoryImpl implements FileRepository {

    private final MinIOClient client;

    @Override
    public void upload(String filename, InputStream inputStream) {
        client.upload(filename, inputStream);
    }

    @Override
    public InputStream download(String filename) {
        return client.download(filename);
    }

    @Override
    public void delete(String filename) {
        client.delete(filename);
    }

    @Override
    public List<OSSFile> findAll() {
        return client.list();
    }
}
