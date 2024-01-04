package com.codingapi.components.parameter.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Parameter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer sort;

    private String name;

    @Column(unique = true)
    private String code;

    private String value;

    @Column(length = 200)
    private String description;

    private String unit;


    @JsonIgnore
    public int getIntValue() {
        return Integer.parseInt(value);
    }

    @JsonIgnore
    public long getLongValue() {
        return Long.getLong(value);
    }

    @JsonIgnore
    public double getDoubleValue() {
        return Double.parseDouble(value);
    }

    @JsonIgnore
    public float getFloatValue() {
        return Float.parseFloat(value);
    }
}
