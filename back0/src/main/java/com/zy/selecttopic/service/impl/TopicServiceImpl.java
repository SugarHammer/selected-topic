package com.zy.selecttopic.service.impl;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonObject;
import com.zy.selecttopic.entity.Student;
import com.zy.selecttopic.entity.Teacher;
import com.zy.selecttopic.entity.Topic;
import com.zy.selecttopic.mapper.TopicMapper;
import com.zy.selecttopic.service.ITopicService;
import com.zy.selecttopic.service.ex.InsertException;
import com.zy.selecttopic.service.ex.UpdateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.StringUtils;

import java.util.List;
import java.util.Random;

@Service
public class TopicServiceImpl implements ITopicService {
    @Autowired
    private TopicMapper topicMapper;

    @Override
    public void reg(Topic topic){
        topic.getTlname();
        topic.getTname();
        topic.getSname();
        Integer rows = topicMapper.insertTopic(topic);
        //判断受影响的行数是否不为1
        if (rows != 1){
            //是：插入数据时出现某种错误，则抛出InsertException异常
            throw new InsertException("添加用户数据出现未知错误，请联系系统管理员");
        }
    }

    @Override
    public List<Topic> getAllTopic(){
        List<Topic> result = topicMapper.selectAllTopic();
        return result;
    }

    @Override
    public List<Topic> getTopic(String tid){
        List<Topic> result = topicMapper.selectTopic(tid);
        return result;
    }

    @Override
    public List<Topic> getStudentTopic(String sname){
        List<Topic> result = topicMapper.selectStudentTopic(sname);
        return result;
    }

    @Override
    public List<Topic> getTeacherTopic(String tname){
        List<Topic> result = topicMapper.selectTeacherTopic(tname);
        return result;
    }

    @Override
    public List getSTopic(String tname){
        List result = topicMapper.selectSTopic(tname);
        return result;
    }

    @Override
    public void changeTopic(Integer tlid,String tlname,String tid,String tname,String sname){
        Integer rows = topicMapper.updateTopic(tlid,tlname,tid,tname,sname);
        if(rows != 1){
            throw new UpdateException("更新出现错误");
        }
    }

    @Override
    public JSONObject data(){
        JSONObject jdata = new JSONObject();
        List<Topic> r1 = topicMapper.selectPHP();
        List<Topic> r2 = topicMapper.selectSpringBoot();
        List<Topic> r3 = topicMapper.selectSpringMVC();
        List<Topic> r4 = topicMapper.selectAndroid();
        List<Topic> r5 = topicMapper.selectHadoop();
        System.out.println(r4.size());
        System.out.println(r5.size());
        jdata.put("PHP",r1.size());
        jdata.put("SpringBoot",r2.size());
        jdata.put("SpringMVC",r3.size());
        jdata.put("Android",r4.size());
        jdata.put("Hadoop",r5.size());
        return jdata;
    }
    @Override
    public JSONArray data1(){
        JSONArray jdata = new JSONArray();
        List<Topic> t = topicMapper.selectTopicCiyun();
//        Random r = new Random();
        for(int i=0;i<t.size();i++){
            JSONObject temp = new JSONObject();
            Object ob = t.get(i);
            System.out.println("service");
            System.out.println(ob);
            char separator = '的';
            String[] strings = StrUtil.splitToArray(ob.toString(),separator);
            String str = StringUtils.substringBefore(strings[1],"系");
            String s = JSONUtil.toJsonStr(str);
            temp.put("name",s);
//            temp.put("value",r.nextInt(1200)+1);
            temp.put("value",1);
            jdata.add(temp);
        }
        return jdata;
    }

    public void sep(String str){
        char separator = '的';
        String[] strings = StrUtil.splitToArray(str,separator);

    }

    @Override
    public List<Topic> getLikeTopic(String tlname){
        List<Topic> result = topicMapper.selectLikeTopic(tlname);
        return result;
    }
}
