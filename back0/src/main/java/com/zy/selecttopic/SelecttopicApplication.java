package com.zy.selecttopic;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.zy.selecttopic.mapper")
public class SelecttopicApplication {

    public static void main(String[] args) {
        SpringApplication.run(SelecttopicApplication.class, args);
    }

}
