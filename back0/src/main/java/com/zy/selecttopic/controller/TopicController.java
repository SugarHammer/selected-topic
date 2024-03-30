package com.zy.selecttopic.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zy.selecttopic.entity.Student;
import com.zy.selecttopic.entity.Teacher;
import com.zy.selecttopic.entity.Topic;
import com.zy.selecttopic.service.ITopicService;
import com.zy.selecttopic.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/topics")
public class TopicController extends BaseController{
    @Autowired
    private ITopicService topicService;

    //添加
    @RequestMapping("reg")
    public JsonResult<Void> reg(@RequestBody Topic topic) {//@RequestBody方便绑定数据，传输参数用的
//        System.out.println(data);
//        Teacher teacher = null;
        System.out.println(topic);
        //调用业务对象执行注册
        topicService.reg(topic);
        //返回
        return new JsonResult<Void>(OK);
    }

    //获取所有题目信息
    @RequestMapping("getAllTopic")
    public List<Topic> getAllTopic(){
        List<Topic> data = topicService.getAllTopic();
        return data;
    }

    //模糊查询
    @RequestMapping("getLikeTopic")
    public List<Topic> getLikeTopic(@RequestBody JSONObject data1){
        String tlname = data1.getString("tlname");
        System.out.println(tlname);
        List<Topic> data = topicService.getLikeTopic(tlname);
        System.out.println(data);
        return data;
    }

    //条件查询
    @RequestMapping("getTopic")
    public List<Topic> getTopic(@RequestBody JSONObject data){
        String tid = data.getString("tid");
        List<Topic> data1 = topicService.getTopic(tid);
        System.out.println(tid);
        System.out.println(data1);
        return data1;
    }

    //学生查看中选结果
    @RequestMapping("getStudentTopic")
    public List<Topic> getStudentTopic(@RequestBody JSONObject data){
        String sname = data.getString("sname");
        List<Topic> data1 = topicService.getStudentTopic(sname);
        System.out.println(sname);
        System.out.println(data1);
        return data1;
    }

    //弃用
    @RequestMapping("getTeacherTopic")
    public List<Topic> getTeacherTopic(@RequestBody JSONObject data){
        String tname = data.getString("tname");
        List<Topic> data1 = topicService.getTeacherTopic(tname);
        System.out.println(tname);
        System.out.println(data1);
        return data1;
    }

    //查询教师所带学生名单
    @RequestMapping("getSTopic")
    public List getSTopic(@RequestBody JSONObject data){
        String tname = data.getString("tname");
        List data1 = topicService.getSTopic(tname);
        System.out.println(tname);
        System.out.println(data1);
        return data1;
    }

    //技术分析
    @RequestMapping("getData")
    public JSONObject getData(){
        JSONObject data = new JSONObject();
        data = topicService.data();
        System.out.println(data);
        return data;
    }

    //词云
    @RequestMapping("getCiyun")
    public JSONArray getCiyun(){
        JSONArray data1 = new JSONArray();
        data1 = topicService.data1();
        System.out.println(data1);
        return data1;
    }

    //改
    @RequestMapping("changeTopic")
    public JsonResult<Void> changeStudent(@RequestBody JSONObject data){
        Integer tlid = data.getInteger("tlid");
        String tlname = data.getString("tlname");
        String tid = data.getString("tid");
        String tname = data.getString("tname");
        String sname = data.getString("sname");
        topicService.changeTopic(tlid,tlname,tid,tname,sname);
        return new JsonResult<Void>(OK);
    }
}
