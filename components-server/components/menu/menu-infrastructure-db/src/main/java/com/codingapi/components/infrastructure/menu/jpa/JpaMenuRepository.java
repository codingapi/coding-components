package com.codingapi.components.infrastructure.menu.jpa;

import com.codingapi.components.menu.domain.Menu;
import com.codingapi.springboot.fast.jpa.repository.FastRepository;

public interface JpaMenuRepository extends FastRepository<Menu,Integer> {

}
