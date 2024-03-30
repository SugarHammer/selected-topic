package com.zy.selecttopic.service;

import com.zy.selecttopic.entity.User;

public interface IUserService {
    /**
     * 用户注册
     * @param user 用户数据
     */
    void reg(User user);
    /**
     * 用户登录
     * @param username 用户名
     * @param password 密码
     * @return 登录成功的用户的数据
     */
    User login(String username,String password);
}
