package com.codingapi.server.service;

import com.codingapi.server.domain.Node;
import com.codingapi.server.repository.NodeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class NodeService {

    private final NodeRepository nodeRepository;

    public void save(Node node) {
        nodeRepository.save(node);
    }

    public void delete(int id) {
        nodeRepository.deleteById(id);
    }

}
