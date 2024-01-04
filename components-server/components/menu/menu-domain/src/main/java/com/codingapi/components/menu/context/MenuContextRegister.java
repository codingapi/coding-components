package com.codingapi.components.menu.context;

import com.codingapi.components.menu.repository.MenuRepository;

public class MenuContextRegister {

    public MenuContextRegister(MenuRepository menuRepository) {
        MenuContext.getInstance().init(menuRepository);
    }
}
