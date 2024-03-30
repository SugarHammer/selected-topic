package com.zy.selecttopic.controller;

import com.zy.selecttopic.entity.User;
import com.zy.selecttopic.service.IUserService;
import com.zy.selecttopic.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
//import sun.plugin2.message.transport.Transport;

import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.Session;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;

import java.util.Date;
import java.util.Properties;
import java.util.Random;
import java.util.*;


//处理用户相关请求的控制器类
@CrossOrigin
@RestController
@RequestMapping("users")
public class UserController extends BaseController {
    @Autowired
    private IUserService userService;

    //用户注册
    @RequestMapping("reg")
    public JsonResult<Void> reg(User user) {
        //调用业务对象执行注册
        userService.reg(user);
        //返回
        return new JsonResult<Void>(OK);
    }

    //用户登录
    @RequestMapping("login")
    public JsonResult<User> login(String username,String password){
        //调用业务对象的方法执行登录，并获取返回值
        User data = userService.login(username,password);
        //将以上返回值和状态码OK封装到响应结果中并返回
        return new JsonResult<User>(OK,data);
    }
    /** 发送邮件 */
    @RequestMapping(value = "sendMail")
    @ResponseBody
    public String sendMail(String email){
        String sendEmailAccount="2112708231@qq.com";        //发件人邮箱
        String sendEmailAccountPassword="shmnnzlhfnhndgaj"; //发件人密码(SMTP授权码,没有空格)
        String sendEmailHost="smtp.qq.com";                 //发件邮件主机
        String sendEmailPort="465";                         //端口
        String receiveEmail=email;                          //收件人邮箱
        MimeMessage msg =null;
        String res="";
        try {
            Properties props=new Properties();
            props.setProperty("mail.transport.protocol", "smtp");   // 使用的协议（JavaMail规范要求）
            props.setProperty("mail.smtp.host", sendEmailHost);     // 发件人的邮箱的 SMTP 服务器地址
            props.setProperty("mail.smtp.auth", "true");
            props.setProperty("mail.smtp.port", sendEmailPort);
            props.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            props.setProperty("mail.smtp.socketFactory.fallback", "false");
            props.setProperty("mail.smtp.socketFactory.port", sendEmailPort);

            Session session=Session.getDefaultInstance(props); //创建会话
            session.setDebug(true);

            msg =new MimeMessage(session);
            msg.setFrom(new InternetAddress(sendEmailAccount,"CAUC","UTF-8"));
            msg.setRecipient(MimeMessage.RecipientType.TO,new InternetAddress(receiveEmail,receiveEmail,"UTF-8"));
            msg.setSubject("用户注册邮箱验证","UTF-8");  //邮件主题

            //获得随机六位数
            Random random =new Random();
            for (int i = 0; i < 6; i++) {
                res+=String.valueOf(random.nextInt(9));     //6位0~9随机数
            }

            msg.setContent("欢迎使用毕业设计选题系统，注册验证码为："+res,"text/html;charset=UTF-8");//邮件正文
            msg.setSentDate(new Date());
            msg.saveChanges();

            Transport transport =session.getTransport();
            transport.connect(sendEmailAccount,sendEmailAccountPassword);
            transport.sendMessage(msg,msg.getAllRecipients());
            transport.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return res;
    }
}

