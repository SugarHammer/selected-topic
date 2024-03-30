import React from 'react';
// import ReactDOM from 'react-dom';
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
        tid:this.props.location.query.tid,
        tname:this.props.location.query.tname,
        tqq:this.props.location.query.tqq,
        tphone:this.props.location.query.tphone,
        tnum:this.props.location.query.tnum,
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.getTeacherAllData = this.getTeacherAllData.bind(this);
    }

    getTeacherAllData(){
        axios({
            url:"http://localhost:8088/teachers/getTeacherAllData",
        })
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                let datas = res.data;
                for(let i = 0;i <datas.length;i++){
                    datas[i]["key"] = datas[i].tid;
                }
                this.setState({
                    data1:datas,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let params = {
                    tid: values.tid,
                    tname: values.tname,
                    tqq: values.tqq,
                    tphone: values.tphone,
                    tnum: values.tnum,
                }
                // axios
                //     .get(`http://localhost:8088/teachers/reg`, params)
                //     .then((response)=>{
                //         console.log(response.data);
                //     })

                axios({
                    method:'post',
                    url:"http://localhost:8088/teachers/changeTeacher",
                    data:params
                })
                    .then((res) => {
                        console.log(res);
                        this.props.history.push("/admin");
                    })
                    .catch((error) => {
                        // console.log(error.response.data);
                    });
            }
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
                {/*教师工号*/}
                <Form.Item label={<span>教师工号&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('tid', {
                        rules: [{required: true, message: '请输入教师工号!', whitespace: true}],
                        initialValue:this.state.tid,
                    })(<Input/>)}
                </Form.Item>
                {/*教师姓名*/}
                <Form.Item label={<span>教师姓名&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('tname', {
                        rules: [{required: true, message: '请输入教师姓名!', whitespace: true}],
                        initialValue:this.state.tname,
                    })(<Input/>)}
                </Form.Item>
                {/*教师QQ*/}
                <Form.Item label={<span>教师QQ&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('tqq', {
                        rules: [{required: true, message: '请输入教师QQ!', whitespace: true}],
                        initialValue:this.state.tqq,
                    })(<Input/>)}
                </Form.Item>
                {/*教师手机号*/}
                <Form.Item label={<span>教师手机号&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('tphone', {
                        rules: [{required: true, message: '请输入教师手机号!', whitespace: true}],
                        initialValue:this.state.tphone,
                    })(<Input/>)}
                </Form.Item>
                {/*教师所带学生数量*/}
                <Form.Item label={<span>教师名额&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('tnum', {
                        rules: [{required: true, message: '请输入教师所带学生数量!', whitespace: true}],
                        initialValue:this.state.tnum,
                    })(<Input/>)}
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

const UpdateTeacher = Form.create({name: 'register'})(RegistrationForm);

export default UpdateTeacher;
