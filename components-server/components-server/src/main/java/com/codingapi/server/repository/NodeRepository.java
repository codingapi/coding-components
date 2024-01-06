package com.codingapi.server.repository;

import com.codingapi.server.domain.Node;
import com.codingapi.springboot.fast.jpa.repository.FastRepository;

public interface NodeRepository extends FastRepository<Node, Integer>,SortRepository<Node,Integer> {

}
