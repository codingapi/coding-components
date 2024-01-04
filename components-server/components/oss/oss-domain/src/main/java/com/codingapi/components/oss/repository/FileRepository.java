package com.codingapi.components.oss.repository;



import com.codingapi.components.oss.domain.OSSFile;

import java.io.InputStream;
import java.util.List;

public interface FileRepository {

    void upload(String filename, InputStream inputStream);

    InputStream download(String filename);

    void delete(String filename);

    List<OSSFile> findAll();


}
