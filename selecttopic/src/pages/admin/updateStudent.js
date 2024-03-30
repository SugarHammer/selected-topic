import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {withRouter} from "react-router-dom";
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
        sid:this.props.location.query.sid,
        sname:this.props.location.query.sname,
        sqq:this.props.location.query.sqq,
        sphone:this.props.location.query.sphone,
    };

    // this.state = {
    //
    // }

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {
        console.log("111");
        console.log(this.state.sid);
    }

    // componentWillMount() {
    //     this.props.location.state.sid;
    //     console.log("111");
    //     console.log(this.props.location.state.sid);
    // }

    handleSubmit = e => {
        console.log(this.props.location.query.sid);
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

                axios({
                    method:'post',
                    url:"http://localhost:8088/students/changeStudent",
                    data:params
                })
                    .then((res) => {
                        console.log(res);
                        this.props.history.push("/admin/selectstudent");
                    })
                    .catch((error) => {
                        // console.log(error.response.data);
                    });
            }
            // this.props.history.push({pathname:'/admin'});
        });
        // this.props.history.push({pathname:'/admin'});
        // this.props.form.resetFields();//提交之后重置
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
        // this.props.history.push({pathname:'/admin'});
        // this.props.form.resetFields();
        // console.log(this.state.sid);
        // let params = {
        //     sid:this.state.sid,
        //     sname:this.state.sname,
        //     sqq:this.state.sqq,
        //     sphone:this.state.sphone,
        // }
        // axios({
        //     method:'post',
        //     url:"http://localhost:8088/students/changeStudent",
        //     data:params
        // })
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((error) => {
        //         // console.log(error.response.data);
        //     });
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
                        initialValue:this.state.sid,
                    })(<Input />)}
                </Form.Item>
            {/*    <Form.Item label={<span>学生学号&nbsp;</span>}>*/}
            {/*        <Input type="text" value="11"></Input>*/}
            {/*    </Form.Item>*/}
                {/*学生姓名*/}
                <Form.Item label={<span>学生姓名&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('sname', {
                        rules: [{required: true, message: '请输入学生姓名!', whitespace: true}],
                        initialValue:this.state.sname,
                    })(<Input placeholder={this.state.sname}/>)}
                </Form.Item>
                {/*学生QQ*/}
                <Form.Item label={<span>学生QQ&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('sqq', {
                        rules: [{required: true, message: '请输入学生QQ!', whitespace: true}],
                        initialValue:this.state.sqq,
                    })(<Input placeholder={this.state.sqq}/>)}
                </Form.Item>
                {/*学生手机号*/}
                <Form.Item label={<span>学生手机号&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('sphone', {
                        rules: [{required: true, message: '请输入学生手机号!', whitespace: true}],
                        initialValue:this.state.sphone,
                    })(<Input placeholder={this.state.sphone}/>)}
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={this.onClick}>
                        修改
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const UpdateStudent = Form.create({name: 'register'})(RegistrationForm);

export default withRouter(UpdateStudent);
