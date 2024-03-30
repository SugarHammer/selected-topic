import React, {Component} from 'react';
import axios from "axios";
import {Button, Icon, Table} from "antd";


class SelectStudent extends Component {
    columns = [
        {
            title: "序号",
            dataIndex: "tlid",
            key: "tlid"
        },
        {
            title: "题目名称",
            dataIndex: "tlname",
            key: "tlname"
        },
        {
            title: "教师工号",
            dataIndex: "tid",
            key: "tid"
        },
        {
            title: "教师姓名",
            dataIndex: "tname",
            key: "tname"
        },
        {
            title: "学生姓名",
            key: "sname",
            dataIndex: "sname"
        },
    ];

    columns1 = [
        {
            title: "序号",
            dataIndex: "tlid",
            key: "tlid"
        },
        {
            title: "题目名称",
            dataIndex: "tlname",
            key: "tlname"
        },
        {
            title: "学生姓名",
            key: "sname",
            dataIndex: "sname"
        },
        {
            title: "学生QQ",
            dataIndex: "sqq",
            key: "sqq"
        },
        {
            title: "学生手机号",
            dataIndex: "sphone",
            key: "sphone"
        },


    ];
    state = {
        data1:[],
    }
    constructor() {
        super();

        this.getTeacherTopic = this.getTeacherTopic.bind(this);
    }
    componentDidMount() {
        this.getTeacherTopic();
        console.log("111");
        // console.log(this.state.data1);
    }

    getTeacherTopic(){
        let tname = {
            tname:this.props.location.query.tname
        };
        console.log(tname);
        axios({
            method:'post',
            url:"http://localhost:8088/topics/getSTopic",
            data:tname,
        })
            .then((res) => {
                // console.log(res);
                let datas = res.data;
                console.log(datas);
                for(let i = 0;i <datas.length;i++){
                    datas[i]["key"] = datas[i].tlid;
                    datas[i]["sqq"] = datas[i].student.sqq;
                    datas[i]["sphone"] = datas[i].student.sphone;
                }
                this.setState({
                    data1:datas,
                })
                //
            })
            .catch((error) => {
                // console.log(error.response.data);
            });
        // console.log(data1);
    }
    render() {
        const {data1} = this.state;
        return (
            <div>
                <Table columns={this.columns1} dataSource={data1} />
            </div>
        );
    }
}

export default SelectStudent;