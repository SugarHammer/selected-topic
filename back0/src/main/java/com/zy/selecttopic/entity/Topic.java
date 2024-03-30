package com.zy.selecttopic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Topic implements Serializable {
    private Integer tlid;
    private String tlname;
    private String tid;
    private String tname;
    private String sname;

    private Student student;
}
