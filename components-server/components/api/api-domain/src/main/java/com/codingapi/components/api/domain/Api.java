package com.codingapi.components.api.domain;

import com.codingapi.springboot.framework.em.IEnum;
import com.codingapi.springboot.framework.exception.LocaleMessageException;
import com.codingapi.springboot.framework.serializable.EnumSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Api {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String url;

    @Lob
    @Column(columnDefinition = "text")
    private String description;
    private String method;
    @Lob
    @Column(columnDefinition = "text")
    private String script;

    @JsonSerialize(using = EnumSerializer.class)
    private State state;

    public void verify() {
        if (name == null || name.isEmpty()) {
            throw new LocaleMessageException("api.error", "name is null");
        }
        if (url == null || url.isEmpty()) {
            throw new LocaleMessageException("api.error", "url is null");
        }
        if (method == null || method.isEmpty()) {
            throw new LocaleMessageException("api.error", "method is null");
        }
        if (state == null) {
            throw new LocaleMessageException("api.error", "state is null");
        }
    }

    public boolean hasDisabled() {
        return state == State.DISABLED;
    }

    @Getter
    public enum State implements IEnum {
        /**
         * 0 未启用
         */
        DISABLED(0),
        /**
         * 1 启用
         */
        ENABLED(1);

        private final int value;

        State(int value) {
            this.value = value;
        }


        @Override
        public int getCode() {
            return value;
        }
    }

    public boolean hasId() {
        return id > 0;
    }

}
