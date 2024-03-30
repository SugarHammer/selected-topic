package com.zy.selecttopic.controller;

import com.alibaba.fastjson.JSONObject;
import com.zy.selecttopic.entity.Teacher;
import com.zy.selecttopic.service.ITeacherService;
import com.zy.selecttopic.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/teachers")
public class TeacherController extends BaseController{
    @Autowired
    private ITeacherService teacherService;

    //添加教师信息
    @RequestMapping("reg")
    public JsonResult<Void> reg(@RequestBody Teacher teacher) {//@RequestBody方便绑定数据，传输参数用的
//        System.out.println(data);
//        Teacher teacher = null;
//        System.out.println(teacher);
        //调用业务对象执行注册
        teacherService.reg(teacher);
        //返回
        return new JsonResult<Void>(OK);
    }

    //查询所有教师信息
    @RequestMapping("getTeacherAllData")
    public List<Teacher> getTeacherAllData(){
        List<Teacher> data = teacherService.getTeacherAllData();
//        System.out.println(data);
//        System.out.println(new JsonResult<List<Teacher>>(OK,data));
        return data;
    }

    //条件查询教师信息
    @RequestMapping("getTeacher")
    public List<Teacher> getTeacher(@RequestBody String tname){
        List<Teacher> data = teacherService.getTeacher(tname);
        System.out.println(data);
//        System.out.println(new JsonResult<List<Teacher>>(OK,data));
        return data;
    }

    //模糊查询
    @RequestMapping("getLikeTeacher")
    public List<Teacher> getLikeTeacher(@RequestBody JSONObject data){
        String tname = data.getString("tname");
        String tid = data.getString("tid");
        System.out.println(tname);
        System.out.println(tid);
        List<Teacher> data1 = teacherService.getLikeTeacher(tname,tid);
        System.out.println(data1);
        return data1;
    }

    //修改
    @RequestMapping("changeTeacher")
    public JsonResult<Void> changeTeacher(@RequestBody JSONObject data){
        String tid = data.getString("tid");
        String tname = data.getString("tname");
        String tqq = data.getString("tqq");
        String tphone = data.getString("tphone");
        String tnum = data.getString("tnum");
        teacherService.changeTeacher(tid,tname,tqq,tphone,tnum);
        return new JsonResult<Void>(OK);
    }

    //删除教师信息
    @RequestMapping("deleteTeacher")
    public void deleteTeacher(@RequestBody String tid){
        teacherService.deleteTeacher(tid);
//        System.out.println(tid);
    }

}
