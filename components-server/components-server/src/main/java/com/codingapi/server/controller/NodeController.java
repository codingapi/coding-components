package com.codingapi.server.controller;

import com.codingapi.server.domain.Node;
import com.codingapi.server.repository.NodeRepository;
import com.codingapi.server.service.NodeService;
import com.codingapi.springboot.framework.dto.request.IdRequest;
import com.codingapi.springboot.framework.dto.request.SearchRequest;
import com.codingapi.springboot.framework.dto.response.MultiResponse;
import com.codingapi.springboot.framework.dto.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/node")
@AllArgsConstructor
public class NodeController {

    private final NodeService nodeService;

    private final NodeRepository nodeRepository;

    @GetMapping("/list")
    public MultiResponse<Node> list(SearchRequest request) {
        request.addSort(Sort.by("sort").ascending());
        return MultiResponse.of(nodeRepository.searchRequest(request));
    }

    @PostMapping("/resort")
    public Response resort(@RequestBody SortRequest sortRequest) {
        nodeRepository.reSort(sortRequest);
        return Response.buildSuccess();
    }

    @PostMapping("/save")
    public Response save(@RequestBody Node node) {
        nodeService.save(node);
        return Response.buildSuccess();
    }

    @PostMapping("/delete")
    public Response delete(@RequestBody IdRequest request) {
        nodeService.delete(request.getIntId());
        return Response.buildSuccess();
    }
}
