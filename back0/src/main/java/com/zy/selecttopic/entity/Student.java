package com.zy.selecttopic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Student implements Serializable {
    private String sid;
    private String sname;
    private String sqq;
    private String sphone;
}
