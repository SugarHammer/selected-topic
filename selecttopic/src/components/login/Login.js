import React from 'react';
import 'antd/dist/antd.css';
import './Login.css';
import {withRouter} from "react-router-dom";
//import {browserHistory} from 'react-router';
import {Form, Icon, Input, Button, Checkbox,Select} from 'antd';
import axios from "axios";

const { Option } = Select;

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
            }
        });
    };

    constructor() {
        super();

        this.state = {

        };

        this.onClick = this.onClick.bind(this);
        // this.hanleChange = this.hanleChange.bind(this);
    }

    //登录点击事件
    onClick(){
        let value = this.props.value;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                let params = {
                    username: values.username,
                    password:values.password,
                };
                axios
                    .post(`http://localhost:8088/users/login`,params)
                    .then((res) => {
                        console.log(res);
                        if(values.role == "administrator"){
                            // this.props.history.push("/admin");
                            this.props.history.push({pathname:'/admin'});
                        }
                        if(values.role == "teacher"){
                            this.props.history.push({pathname:"/teacher",query:{
                                tname:values.username
                            }});
                            console.log(values.username);
                        }if(values.role == "student"){
                            this.props.history.push({pathname:"/student",state:{
                                sname:values.username}
                            });
                        }
                    });

            }
        });
    }

    render() {
        function handleChange(value) {
            console.log(value);
            // console.log(`selected ${value}`);
        }
        const {value} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                {/*整体标题*/}
                <div className="titlediv">
                    毕业设计选题系统
                </div>
                <div className="logindiv">
                    <div className="inp">
                        登录
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            身份：
                            {getFieldDecorator('role', {
                                rules: [{required: true, message: 'Please input your role!'}],
                            })(
                                <Select
                                    prefix={<Icon type="idcard" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    Value="select" style={{ width: 220 }} onChange={handleChange}>
                                    <Option value="student">学生</Option>
                                    <Option value="teacher">教师</Option>
                                    <Option value="administrator">管理员</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(<Checkbox>记住密码</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                            <Button onClick={this.onClick} type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            {/*<link to="/register">没有账号？快速注册</link>*/}
                            <a href="/register">没有账号？快速注册</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const Login = Form.create({name: 'normal_login'})(NormalLoginForm);

export default withRouter(Login);
