package com.codingapi.components.oss.controller;

import com.codingapi.components.oss.repository.FileRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.apache.hc.core5.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/oss")
@AllArgsConstructor
public class OssDownloadController {

    private final FileRepository fileRepository;

    @GetMapping("/{filename}")
    public void download(@PathVariable("filename") String filename, HttpServletResponse response) {
        try (InputStream inputStream = fileRepository.download(filename)) {
            response.setContentType("application/octet-stream");
            // URL encode the filename
            String encodedFilename = URLEncoder.encode(filename, StandardCharsets.UTF_8);
            response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedFilename);
            response.setHeader(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_DISPOSITION);

            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                response.getOutputStream().write(buffer, 0, bytesRead);
            }
        } catch (IOException e) {
            throw new RuntimeException("File download failed: " + e.getMessage());
        }
    }
}
