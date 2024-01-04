package com.codingapi.components.menu.context;

import com.codingapi.components.menu.domain.Menu;
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

    public Menu getParam(String code){
        return menuRepository.getParam(code);
    }

    public int getIntParam(String code,int defaultValue){
        Menu menu =  menuRepository.getParam(code);
        if(menu !=null){
            return menu.getIntValue();
        }
        return defaultValue;
    }


    public String getStringParam(String code,String defaultValue){
        Menu menu =  menuRepository.getParam(code);
        if(menu !=null){
            return menu.getValue();
        }
        return defaultValue;
    }


    public long getLongParam(String code,long defaultValue){
        Menu menu =  menuRepository.getParam(code);
        if(menu !=null){
            return menu.getLongValue();
        }
        return defaultValue;
    }

    public float getFloatParam(String code,float defaultValue){
        Menu menu =  menuRepository.getParam(code);
        if(menu !=null){
            return menu.getFloatValue();
        }
        return defaultValue;
    }


    public double getDoubleParam(String code,double defaultValue){
        Menu menu =  menuRepository.getParam(code);
        if(menu !=null){
            return menu.getDoubleValue();
        }
        return defaultValue;
    }

}
