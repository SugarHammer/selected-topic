import React, {Component} from 'react';
import axios from "axios";
import {Button, Icon, Table} from "antd";


class Result extends Component {
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

    state = {
        data1:[],
    }
    constructor() {
        super();

        this.getStudentTopic = this.getStudentTopic.bind(this);
    }
    componentDidMount() {
        this.getStudentTopic();
        console.log("111");
        // console.log(this.state.data1);
    }

    getStudentTopic(){
        let sname = {
            sname:this.props.location.state.sname
        };
        console.log(sname);
        axios({
            method:'post',
            url:"http://localhost:8088/topics/getStudentTopic",
            data:sname,
        })
            .then((res) => {
                // console.log(res);
                let datas = res.data;
                console.log(datas);
                for(let i = 0;i <datas.length;i++){
                    datas[i]["key"] = datas[i].tlid;
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
                <Table columns={this.columns} dataSource={data1} />
                {/*<div>*/}
                {/*    学生姓名:*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    教师姓名：*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    毕设题目：*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default Result;