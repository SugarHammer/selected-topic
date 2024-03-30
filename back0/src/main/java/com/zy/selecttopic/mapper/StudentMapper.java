package com.zy.selecttopic.mapper;

import com.zy.selecttopic.entity.Student;
import com.zy.selecttopic.entity.Teacher;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface StudentMapper {
    /**
     * 插入用户数据
     * @param student 用户数据
     * @return 受影响的行数
     */
    Integer insertStudent(Student student);

    /**
     * 查询所有学生信息
     * @return 返回成功信息
     */
    List<Student> selectAllStudent();

    /**
     * 条件查询
     * @param sid
     * @return
     */
    List<Student> selectStudent(String sid);

    /**
     * 修改学生信息
     * @param sid
     * @param sname
     * @param sqq
     * @param sphone
     * @return
     */
    Integer updateStudent(@Param("sid") String sid,@Param("sname")  String sname,@Param("sqq")  String sqq,@Param("sphone")  String sphone);

    /**
     * 删除学生信息
     * @param sid
     */
    void deleteStudent(String sid);

}
