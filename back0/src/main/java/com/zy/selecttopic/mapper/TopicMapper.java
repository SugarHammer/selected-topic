package com.zy.selecttopic.mapper;

import com.zy.selecttopic.entity.Topic;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface TopicMapper {

    /**
     * 申报题目
     * @param topic
     * @return
     */
    Integer insertTopic(Topic topic);

    /**
     * 获取所有题目
     * @return
     */
    List<Topic> selectAllTopic();

    /**
     *条件查询
     * @param tid
     * @return
     */
    List<Topic> selectTopic(String tid);

    /**
     * 模糊查询
     * @param tlname
     * @return
     */
    List<Topic> selectLikeTopic(String tlname);

    /**
     *学生中选结果
     * @param sname
     * @return
     */
    List<Topic> selectStudentTopic(String sname);

    /**
     *目前弃用
     * @param tname
     * @return
     */
    List<Topic> selectTeacherTopic(String tname);

    /**
     * 查询中选学生名单
     * @param tname
     * @return
     */
    List selectSTopic(String tname);

    /**
     * 更新
     * @param tlid
     * @param tlname
     * @param tid
     * @param tname
     * @param sname
     * @return
     */
    Integer updateTopic(@Param("tlid") Integer tlid,@Param("tlname") String tlname, @Param("tid")  String tid, @Param("tname")  String tname, @Param("sname")  String sname);

    /**
     * 题目中包含“PHP”的行
     * @return
     */
    List<Topic> selectPHP();

    /**
     * 题目中包含“SpringBoot”的行
     * @return
     */
    List<Topic> selectSpringBoot();

    /**
     * 题目中包含“SpringMVC”的行
     * @return
     */
    List<Topic> selectSpringMVC();

    /**
     * 题目中包含“Hadoop”的行
     * @return
     */
    List<Topic> selectAndroid();

    /**
     * 题目中包含“Hadoop”的行
     * @return
     */
    List<Topic> selectHadoop();

    /**
     *查询题目关键词
     * @return
     */
    List<Topic> selectTopicCiyun();

}
