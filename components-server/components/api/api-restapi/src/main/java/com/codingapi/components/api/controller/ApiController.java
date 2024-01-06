package com.codingapi.components.api.controller;

import com.codingapi.components.api.domain.Api;
import com.codingapi.components.api.service.ApiService;
import com.codingapi.springboot.framework.dto.request.IdRequest;
import com.codingapi.springboot.framework.dto.request.SearchRequest;
import com.codingapi.springboot.framework.dto.response.MultiResponse;
import com.codingapi.springboot.framework.dto.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/api")
@AllArgsConstructor
public class ApiController {

    private final ApiService apiService;

    @PostMapping("/save")
    public Response save(@RequestBody Api api) {
        apiService.save(api);
        return Response.buildSuccess();
    }


    @PostMapping("/delete")
    public Response delete(@RequestBody IdRequest request) {
        apiService.delete(request.getIntId());
        return Response.buildSuccess();
    }


    @PostMapping("/test")
    public Response delete(@RequestBody Api api) {
        return apiService.test(api);
    }


    @GetMapping("/list")
    public MultiResponse<Api> list(SearchRequest request) {
        return MultiResponse.of(apiService.list(request));
    }
}
