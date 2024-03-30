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
        tname:this.props.location.query.tname,
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {
        console.log("111");
        console.log(this.state.tname);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let params = {
                    tlname:values.tlname,
                    tname: values.tname,
                }
                axios({
                    method:'post',
                    url:"http://localhost:8088/topics/reg",
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
            {/*    /!*学生工号*!/*/}
            {/*    <Form.Item label={<span>教师工号&nbsp;*/}
            {/*</span>*/}
            {/*    }*/}
            {/*    >*/}
            {/*        {getFieldDecorator('tid', {*/}
            {/*            rules: [{required: true, message: '请输入教师工号!', whitespace: true}],*/}
            {/*        })(<Input/>)}*/}
            {/*    </Form.Item>*/}
                {/*学生姓名*/}
                <Form.Item label={<span>教师姓名&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('tname', {
                        rules: [{required: true, message: '请输入教师姓名!', whitespace: true}],
                        initialValue:this.state.tname,
                    })(<Input style={{width:"350px"}}/>)}
                </Form.Item>
                {/*题目*/}
                <Form.Item label={<span>毕设题目&nbsp;
            </span>
                }
                >
                    {getFieldDecorator('tlname', {
                        rules: [{required: true, message: '请输入毕设题目!', whitespace: true}],
                    })(<Input style={{width:"350px"}}/>)}
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

const InsertTitle = Form.create({name: 'register'})(RegistrationForm);

export default InsertTitle;
