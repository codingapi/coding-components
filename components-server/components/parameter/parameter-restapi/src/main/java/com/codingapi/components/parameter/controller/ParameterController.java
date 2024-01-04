package com.codingapi.components.parameter.controller;

import com.codingapi.components.parameter.domain.Parameter;
import com.codingapi.components.parameter.service.ParameterService;
import com.codingapi.springboot.framework.dto.request.IdRequest;
import com.codingapi.springboot.framework.dto.request.PageRequest;
import com.codingapi.springboot.framework.dto.response.MultiResponse;
import com.codingapi.springboot.framework.dto.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parameter")
@AllArgsConstructor
public class ParameterController {

    private final ParameterService parameterService;

    @PostMapping("/save")
    public Response save(@RequestBody Parameter parameter) {
        parameterService.save(parameter);
        return Response.buildSuccess();
    }


    @PostMapping("/delete")
    public Response delete(@RequestBody IdRequest request) {
        parameterService.delete(request.getIntId());
        return Response.buildSuccess();
    }


    @GetMapping("/list")
    public MultiResponse<Parameter> list(PageRequest request) {
        return MultiResponse.of(parameterService.list(request));
    }
}
