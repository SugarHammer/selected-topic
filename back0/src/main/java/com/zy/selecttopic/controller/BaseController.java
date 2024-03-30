package com.zy.selecttopic.controller;


import com.zy.selecttopic.service.ex.*;
import com.zy.selecttopic.util.JsonResult;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.Serializable;

//控制器类的基类
public class BaseController {
    //操作成功的状态码
    public static final int OK = 200;

    //@ExceptionHandler用于统一处理方法抛出的异常
    @ExceptionHandler(ServiceException.class)
    public JsonResult<Void> handleException(Throwable e){
        JsonResult<Void> result = new JsonResult<Void>(e);
        if(e instanceof UsernameDuplicateException){
            result.setState(4000);
        }else if(e instanceof InsertException){
            result.setState(5000);
        }else if(e instanceof UserNotFoundException){
            result.setState(4001);
        }else if(e instanceof PasswordNotMatchException){
            result.setState(4002);
        }else if(e instanceof UpdateException){
            result.setState(4003);
        }
        return result;
    }
}
