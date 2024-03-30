import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
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

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let params = {
                    sid: values.sid,
                    sname: values.sname,
                    sqq: values.sqq,
                    sphone: values.sphone,
                }
                // axios
                //     .get(`http://localhost:8088/teachers/reg`, params)
                //     .then((response)=>{
                //         console.log(response.data);
                //     })

                axios({
                    method:'post',
                    url:"http://localhost:8088/students/reg",
                    data:params
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => {
                        // console.log(error.response.data);
                    });
            }
        });
        this.props.form.resetFields();//提交之后重置
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

    onClick(){
        // this.props.form.resetFields();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;

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
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                {/*学生工号*/}
                <Form.Item label={<span>学生学号&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('sid', {
                        rules: [{required: true, message: '请输入学生学号!', whitespace: true}],
                    })(<Input/>)}
                </Form.Item>
                {/*学生姓名*/}
                <Form.Item label={<span>学生姓名&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('sname', {
                        rules: [{required: true, message: '请输入学生姓名!', whitespace: true}],
                    })(<Input/>)}
                </Form.Item>
                {/*学生QQ*/}
                <Form.Item label={<span>学生QQ&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('sqq', {
                        rules: [{required: true, message: '请输入学生QQ!', whitespace: true}],
                    })(<Input type={"phone"}/>)}
                </Form.Item>
                {/*学生手机号*/}
                <Form.Item label={<span>学生手机号&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('sphone', {
                        rules: [{required: true,pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的学生手机号!', whitespace: true}],
                    })(<Input/>)}
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={this.onClick}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const InsertStudent = Form.create({name: 'register'})(RegistrationForm);

export default InsertStudent;
