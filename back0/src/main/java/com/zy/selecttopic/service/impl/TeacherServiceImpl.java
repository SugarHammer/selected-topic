package com.zy.selecttopic.service.impl;

import com.zy.selecttopic.entity.Teacher;
import com.zy.selecttopic.mapper.TeacherMapper;
import com.zy.selecttopic.service.ITeacherService;
import com.zy.selecttopic.service.ex.InsertException;
import com.zy.selecttopic.service.ex.UpdateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**处理用户数据的业务层实现类 */
@Service
public class TeacherServiceImpl implements ITeacherService {
    @Autowired
    private TeacherMapper teacherMapper;

    @Override
    public void reg(Teacher teacher){
        //添加教师
        teacher.getTid();
        teacher.getTname();
        teacher.getTqq();
        teacher.getTphone();
        teacher.getTnum();
        Integer rows = teacherMapper.insertTeacher(teacher);
        //判断受影响的行数是否不为1
        if (rows != 1){
            //是：插入数据时出现某种错误，则抛出InsertException异常
            throw new InsertException("添加用户数据出现未知错误，请联系系统管理员");
        }
    }

    @Override
    public List<Teacher> getTeacherAllData(){
        //查询所有的教师信息
        List<Teacher> result = teacherMapper.selectAllTeacher();
        return result;
    }

    /**
     * 条件查询教师信息
     * @param tname
     * @return 返回成功后信息
     */
    @Override
    public List<Teacher> getTeacher(String tname){
        List<Teacher> result = teacherMapper.selectTeacher(tname);
        return result;
    }

    @Override
    public List<Teacher> getLikeTeacher(String tname,String tid){
        List<Teacher> result = teacherMapper.selectLikeTeacher(tname,tid);
        return result;
    }

    @Override
    public void changeTeacher(String tid,String tname,String tqq,String tphone,String tnum){
        Integer rows = teacherMapper.updateTeacher(tid,tname,tqq,tphone,tnum);
        if(rows != 1){
            throw new UpdateException("更新出现错误");
        }
    }

    @Override
    public void deleteTeacher(String tid){
        teacherMapper.deleteTeacher(tid);
    }
}
