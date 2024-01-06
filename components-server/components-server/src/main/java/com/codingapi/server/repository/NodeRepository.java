package com.codingapi.server.repository;

import com.codingapi.server.domain.Node;
import com.codingapi.springboot.fast.jpa.repository.FastRepository;
import com.codingapi.springboot.fast.jpa.repository.SortRepository;

public interface NodeRepository extends FastRepository<Node, Integer>, SortRepository<Node,Integer> {

}
