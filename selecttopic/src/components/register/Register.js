import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from "react-router-dom";
import 'antd/dist/antd.css';
import './Register.css';
// import './index.css';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
import axios from "axios";

const {Option} = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    constructor() {
        super();

        let username = "";
        let password = "";

        this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {

    }

    onClick(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(values.email);
                axios({
                    url:"http://localhost:8088/users/sendMail",
                    params:{
                        email:values.email
                    }
                })
                    .then((r) => {
                        console.log(r);
                        var txt = "已向所填邮箱发送验证码，请注意查收！"
                        window.wxc.xcConfirm(txt,window.wxc.xcConfirm.typeEnum.success);
                        console.log(r);
                         let vpwd = r;
                        let count = 60;
                        // const countDown = setInterval(() => {
                        //     if (count == 0) {
                        //         $("#feachBtn").text('重新发送').removeAttr('disabled');
                        //         clearInterval(countDown);
                        //     } else {
                        //         // $("#feachBtn").attr("disabled",true);
                        //         $("#feachBtn").attr('disabled', true);
                        //         $("#feachBtn").text(count + 'S');
                        //     }
                        //     count--;
                        // }, 1000);
                    })
                    .catch((error) => {
                        // console.log(error.response.status);
                    })
            }
        });
    }
    // insertUserData(){
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //             console.log(values.nickname);
    //             // axios({
    //             //     url:"http://localhost:8088/users/reg",
    //             //     params:{
    //             //         username:,
    //             //         password:,
    //             //     }
    //             // })
    //         }
    //     });
    // }
    //nickname: 'admin', password: '1', confirm: '1', email: '2112708231@qq.com
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(values.nickname);
                axios({
                    url:"http://localhost:8088/users/reg",
                    params:{
                        username:values.nickname,
                        password:values.password,
                    },
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => {
                        // console.log(error.response.status);
                    });
                this.props.history.push("/");
            }
        });
    };


    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({autoCompleteResult});
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;
        const {value} = this.state;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <div>
                <div className="formdiv">
                    <Form className="register-form" {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item
                            label={
                                <span>
                                    用户名&nbsp;
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o"/>
                                    </Tooltip>
                                </span>
                            }
                        >
                            {getFieldDecorator('nickname', {
                                rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="密码" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        validator: this.validateToNextPassword,
                                    },
                                ],
                            })(<Input.Password/>)}
                        </Form.Item>
                        <Form.Item label="确认密码" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                        </Form.Item>
                        <Form.Item label="电子邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="验证码" extra="We must make sure that your are a human.">
                            <Row gutter={8}>
                                <Col span={12}>
                                    {getFieldDecorator('captcha', {
                                        rules: [{required: false, message: 'Please input the captcha you got!'}],
                                    })(<Input/>)}
                                </Col>
                                <Col span={12}>
                                    <Button onClick={this.onClick} id="feachBtn">获取验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                            })(
                                <Checkbox>
                                    我已知悉并同意 <a href="">相关协议</a>
                                </Checkbox>,
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const Register = Form.create({name: 'register'})(RegistrationForm);

export default withRouter(Register);