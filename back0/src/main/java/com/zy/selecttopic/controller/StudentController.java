package com.zy.selecttopic.controller;

import com.alibaba.fastjson.JSONObject;
import com.zy.selecttopic.entity.Student;
import com.zy.selecttopic.service.IStudentService;
import com.zy.selecttopic.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/students")
public class StudentController extends BaseController{
    @Autowired
    private IStudentService studentService;

    //添加
    @RequestMapping("reg")
    public JsonResult<Void> reg(@RequestBody Student student) {//@RequestBody方便绑定数据，传输参数用的
//        System.out.println(data);
//        Teacher teacher = null;
        System.out.println(student);
        //调用业务对象执行注册
        studentService.reg(student);
        //返回
        return new JsonResult<Void>(OK);
    }

    //获取所有学生信息
    @RequestMapping("getAllStudent")
    public List<Student> getAllStudent(){
        List<Student> data = studentService.getAllStudent();
        return data;
    }

    //条件查询
    @RequestMapping("getStudent")
    public List<Student> getStudent(@RequestBody String sid){
        List<Student> data = studentService.getStudent(sid);
        return data;
    }

    //修改学生信息
    @RequestMapping("changeStudent")
    public JsonResult<Void> changeStudent(@RequestBody JSONObject data){
        String sid = data.getString("sid");
        String sname = data.getString("sname");
        String sqq = data.getString("sqq");
        String sphone = data.getString("sphone");
        studentService.changeStudent(sid,sname,sqq,sphone);
        return new JsonResult<Void>(OK);
    }

    //删除学生
    @RequestMapping("deleteStudent")
    public void deleteStudent(@RequestBody String sid){
        studentService.deleteStudent(sid);
    }
}
