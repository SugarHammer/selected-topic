# 毕业设计选题系统(数据库加VX获取☟)

#### 介绍
基于数据统计分析的毕业设计选题系统（springboot+vue）
有BUG可留言加微

#### 软件架构
Java + SpringBoot + Mybatis + Vue + Mysql


#### 项目说明

1.  登录注册功能
> 对于该系统的登录注册模块除了验证登录账号的用户名和密码之外，还对登录用户的角色身份加以判定。管理员登录、教师登录与学生登录成功后的管理界面是不相同的，跟其所要处理的事情息息相关
2.  管理员管理功能
> 管理员的管理功能是整个系统中最多的，可以对教师和学生进行增删改查的操作。除此之外，还可以查看所有的题目信息，以及对题目信息进行统计分析
3.  教师管理功能
> 教师在本系统的教师模块中主要功能有查看该教师名下的所有中选学生信息、完成毕业设计课题的申报工作、以及查看所有题目信息。其中最主要的功能为教师的申报题目功能，在本系统中，将自动填充教师的基本信息，教师仅需添加课题名称即可，极大的简化了教师的工作，提升了其工作效率
4.  学生管理功能
> 学生在本模块中的功能为查看所有的题目信息、选择导师、选择题目、查看中选结果。其中最主要的功能为对导师和题目的选择功能。学生仅能选择还有名额的教师，且仅能选择题目未被选择的课题。学生进行选择时，通过点击事件，将选择的结果传回后端，同时同步至数据库题目信息表中


#### 功能概览图
![输入图片说明](photo/%E5%8A%9F%E8%83%BD%E6%B5%81%E7%A8%8B%E5%9B%BE.gif)

### 部分功能演示

#### 管理员功能
![输入图片说明](photo/%E7%AE%A1%E7%90%86%E5%91%98%E5%8A%9F%E8%83%BD.gif)

#### 教师功能
![输入图片说明](photo/%E6%95%99%E5%B8%88%E5%8A%9F%E8%83%BD.gif)


### 环境需求(可免费提供)
- idea/eclipse、jdk-1.8、maven-3.8.6、mysql、node.js

## 有项目修改、安装调试需求 请联系微信
![输入图片说明](photo/0-WeChat.png)

## 其他项目定制加微☝☝☝