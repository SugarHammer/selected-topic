package com.zy.selecttopic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Teacher implements Serializable {
    private String tid;
    private String tname;
    private String tqq;
    private String tphone;
    private Integer tnum;

}
