package com.zy.selecttopic.service;



import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zy.selecttopic.entity.Topic;
//import org.springframework.boot.configurationprocessor.json.JSONObject;

import java.util.List;

public interface ITopicService {

    /**
     * 申报题目
     * @param topic
     */
    void reg(Topic topic);

    /**
     * 获取所有题目
     * @return
     */
    List<Topic> getAllTopic();

    /**
     * 条件查询
     * @param tid
     * @return
     */
    List<Topic> getTopic(String tid);

    /**
     * 模糊查询
     * @param tlname
     * @return
     */
    List<Topic> getLikeTopic(String tlname);

    /**
     *学生中选结果
     * @param sname
     * @return
     */
    List<Topic> getStudentTopic(String sname);

    /**
     *弃用
     * @param tname
     * @return
     */
    List<Topic> getTeacherTopic(String tname);

    /**
     * 教师查看学生名单
     * @param tname
     * @return
     */
    List getSTopic(String tname);
    /**
     *改
     * @param tlid
     * @param tlname
     * @param tid
     * @param tname
     * @param sname
     */
    void changeTopic(Integer tlid,String tlname,String tid,String tname,String sname);

    /**
     * 基于五种技术分析
     * @return
     */
    JSONObject data();

    /**
     * 词云分析
     * @return
     */
    JSONArray data1();
}
