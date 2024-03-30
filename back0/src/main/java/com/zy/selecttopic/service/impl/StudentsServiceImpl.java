package com.zy.selecttopic.service.impl;


import com.zy.selecttopic.entity.Student;
import com.zy.selecttopic.mapper.StudentMapper;
import com.zy.selecttopic.service.IStudentService;
import com.zy.selecttopic.service.ex.InsertException;
import com.zy.selecttopic.service.ex.UpdateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentsServiceImpl implements IStudentService {
    @Autowired
    private StudentMapper studentMapper;

    @Override
    public void reg(Student student){
        student.getSid();
        student.getSname();
        student.getSqq();
        student.getSphone();
        Integer rows = studentMapper.insertStudent(student);
        //判断受影响的行数是否不为1
        if (rows != 1){
            //是：插入数据时出现某种错误，则抛出InsertException异常
            throw new InsertException("添加用户数据出现未知错误，请联系系统管理员");
        }
    }

    @Override
    public List<Student> getAllStudent(){
        List<Student> result = studentMapper.selectAllStudent();
        return result;
    }

    @Override
    public List<Student> getStudent(String sid){
        List<Student> result = studentMapper.selectStudent(sid);
        return result;
    }

    @Override
    public void changeStudent(String sid,String sname,String sqq,String sphone){
        Integer rows = studentMapper.updateStudent(sid,sname,sqq,sphone);
        if(rows != 1){
            throw new UpdateException("更新出现错误");
        }
    }

    @Override
    public void deleteStudent(String sid){
        studentMapper.deleteStudent(sid);
    }
}
