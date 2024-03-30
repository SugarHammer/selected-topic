package com.zy.selecttopic.mapper;

import com.zy.selecttopic.entity.Teacher;
import com.zy.selecttopic.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface TeacherMapper {
    /**
     * 插入用户数据
     * @param teacher 用户数据
     * @return 受影响的行数
     */
    Integer insertTeacher(Teacher teacher);



    /**
     * 查询所有教师数据
     */
    List<Teacher> selectAllTeacher();

    /**
     * 条件查询教师信息
     */
    List<Teacher> selectTeacher(String tname);

    /**
     * 模糊查询教师
     */
    List<Teacher> selectLikeTeacher(String tname,String tid);

    /**
     * 删除教师信息
     */
    void deleteTeacher(String tid);

    /**
     * 修改教师信息
     * @param tid
     * @param tname
     * @param sqq
     * @param tphone
     * @param tnum
     * @return
     */
    Integer updateTeacher(@Param("tid") String tid, @Param("tname")  String tname, @Param("tqq")  String sqq, @Param("tphone")  String tphone,@Param("tnum")  String tnum);



}
