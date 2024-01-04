package com.codingapi.components.menu.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer sort;

    private String name;

    @Column(unique = true)
    private String code;

    private String icon;

    @ManyToOne
    @JsonIgnore
    private Menu parent;

    public static Menu root() {
        Menu root = new Menu();
        root.setId(1);
        root.setName("所有菜单");
        return root;
    }

    public int parentId() {
        return parent == null ? 0 : parent.getId();
    }

    @Transient
    protected List<Menu> children;

    public void addChild(Menu child) {
        if (children == null) {
            this.children = new ArrayList<>();
        }
        children.add(child);
    }

}
