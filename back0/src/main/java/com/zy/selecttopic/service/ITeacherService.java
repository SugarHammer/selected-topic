package com.zy.selecttopic.service;

import com.zy.selecttopic.entity.Teacher;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ITeacherService {
    /**
     * 用户注册
     * @param teacher 用户数据
     */
    void reg(Teacher teacher);

    /**
     * 查询全部教师信息
     * @return 匹配的教师信息数据，如果没有匹配到，返回null
     */
    List<Teacher> getTeacherAllData();

    /**
     * 条件查询教师信息
     * @param tname
     * @return 返回查询成功之后的数据
     */
    List<Teacher> getTeacher(String tname);

    /**
     * 模糊查询
     */
    List<Teacher> getLikeTeacher(String tname,String tid);

    /**
     * 删除
     * @param tid
     */
    void deleteTeacher(String tid);

    /**
     * 修改教师信息
     * @param tid
     * @param tname
     * @param tqq
     * @param tphone
     * @param tnum
     */
    void changeTeacher(String tid,String tname,String tqq,String tphone,String tnum);
}
