package com.zy.selecttopic.service;

import com.zy.selecttopic.entity.Student;

import java.util.List;

public interface IStudentService {
    /**
     * 用户注册
     * @param student 用户数据
     */
    void reg(Student student);

    /**
     * 查询所有学生信息
     * @return
     */
    List<Student> getAllStudent();

    /**
     * 条件查询
     * @param sid
     * @return
     */
    List<Student> getStudent(String sid);

    /**
     * 修改学生信息
     * @param sid
     * @param sname
     * @param sqq
     * @param sphone
     */
    void changeStudent(String sid,String sname,String sqq,String sphone);

    /**
     * 删除
     * @param sid
     */
    void deleteStudent(String sid);
}
