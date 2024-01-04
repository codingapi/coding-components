package com.codingapi.components.menu.context;

import com.codingapi.components.menu.repository.MenuRepository;
import lombok.Getter;

public class MenuContext {

    @Getter
    public static final MenuContext instance = new MenuContext();

    private MenuRepository menuRepository;

    void init(MenuRepository menuRepository){
        this.menuRepository = menuRepository;
    }

    private MenuContext(){

    }


}
