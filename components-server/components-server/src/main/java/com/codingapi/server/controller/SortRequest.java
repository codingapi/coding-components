package com.codingapi.server.controller;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SortRequest {

    private Object beforeId;
    private Object afterId;
}
