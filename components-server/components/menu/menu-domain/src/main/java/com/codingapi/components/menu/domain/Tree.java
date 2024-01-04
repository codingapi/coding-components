package com.codingapi.components.menu.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Transient;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public abstract class Tree<T> {

    @Transient
    protected List<T> children;

    public void addChild(T child){
        if (children == null) {
            this.children = new ArrayList<>();
        }
        children.add(child);
    }

    @JsonIgnore
    public abstract int parentId();
}
