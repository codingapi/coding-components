package com.codingapi.components.oss.controller;

import com.codingapi.components.oss.domain.OSSFile;
import com.codingapi.components.oss.repository.FileRepository;
import com.codingapi.springboot.framework.dto.request.IdRequest;
import com.codingapi.springboot.framework.dto.response.MultiResponse;
import com.codingapi.springboot.framework.dto.response.Response;
import com.codingapi.springboot.framework.exception.LocaleMessageException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/oss")
@AllArgsConstructor
public class OSSController {

    private final FileRepository fileRepository;

    @GetMapping("/list")
    public MultiResponse<OSSFile> list(HttpServletRequest request) {
        List<OSSFile> list = fileRepository.findAll();
        String name = request.getParameter("name");

        if (!StringUtils.hasText(name)) {
            return MultiResponse.of(list);
        }
        list = list.stream().filter(ossFile -> ossFile.getName().contains(name))
                .collect(Collectors.toList());
        return MultiResponse.of(list);
    }

    @SneakyThrows
    @PostMapping("/upload")
    public String upload(@RequestParam("files") MultipartFile files) {
        if (files.isEmpty()) {
            throw new LocaleMessageException("oss.upload.file.empty", "File is empty");
        }
        String filename = files.getOriginalFilename();
        fileRepository.upload(filename, files.getInputStream());
        return "/oss/" + filename;
    }


    @PostMapping("/delete")
    public Response delete(@RequestBody IdRequest request) {
        fileRepository.delete(request.getId());
        return Response.buildSuccess();
    }

}
