package com.zy.selecttopic.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户数据的实体类
 */
@Data
public class User implements Serializable {
    private Integer uid;
    private String username;
    private String password;
    private String role;
    private String email;
//    盐值
    private String salt;
//    是否删除 0-未删除 1-已删除
    private Integer isDelete;

}
