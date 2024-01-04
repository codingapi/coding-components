package com.codingapi.components.menu.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Menu extends Tree<Menu> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer sort;

    private String name;

    @Column(unique = true)
    private String code;

    private String icon;

    @ManyToOne
    private Menu parent;

    public static Menu root() {
        Menu root = new Menu();
        root.setId(1);
        root.setName("所有菜单");
        return root;
    }

    @Override
    public int getParentId() {
        return parent != null ? parent.getId() : 1;
    }
}
