import React, {Component} from 'react';
// import React from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./selectStudent.css";
import {Link} from 'react-router-dom';
import { Table, Icon, Input, Button } from "antd";
import axios from "axios";



const data = [
    {
        key: "1",
        sid: "111",
        sname: "学生1",
        sqq: "1q",
        sphone: "1p"
    },
    {
        key: "2",
        sid: "222",
        sname: "学生2",
        sqq: "2q",
        sphone: "2p"
    },
    {
        key: "3",
        sid: "333",
        sname: "学生3",
        sqq: "3q",
        sphone: "3p"
    },
    {
        key: "4",
        sid: "444",
        sname: "学生4",
        sqq: "4q",
        sphone: "4p"
    }
];

class SelectStudent extends Component {

    state = {
        data1:[],
        sidValue:"",
        data:[],
    }

    columns = [
        {
            title: "学生学号",
            dataIndex: "sid",
            key: "sid"
        },
        {
            title: "学生姓名",
            dataIndex: "sname",
            key: "sname"
        },
        {
            title: "学生QQ号",
            dataIndex: "sqq",
            key: "sqq"
        },
        {
            title: "学生手机号",
            key: "sphone",
            dataIndex: "sphone"
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <span>
        <Link to={{pathname:"/admin/updatestudent",query:{sid:record.sid,
                sname:record.sname,
                sqq:record.sqq,
                sphone:record.sphone}}}>
          <Icon type="edit" />
          修改
        </Link>
        <a onClick={this.btnClick.bind(this,record)}>
          <Icon type="delete" />
          删除
        </a>
      </span>
            )
        }
    ];

    btnClick=(name,e) =>{
        //onClick(){
        //let tidValue = this.state.tidValue;
        this.state.sid = name.sid;
        console.log(this.state.sid);
        axios({
            method:'post',
            url:"http://localhost:8088/students/deleteStudent",
            data:this.state.sid,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                console.log(res);
                this.getAllStudent();
                // let datas = res.data;
                // console.log(datas);
                // for(let i = 0;i <datas.length;i++){
                //     datas[i]["key"] = datas[i].tid;
                // }
                // this.setState({
                //     data1:datas,
                // })
                alert("删除成功！")
            })
            .catch((error) => {
                // console.log(error.response.data);
            });

    }

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.getAllStudent = this.getAllStudent.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.getStudent = this.getStudent.bind(this);
        this.btnClick = this.btnClick.bind(this);
    }

    componentDidMount() {
        this.getAllStudent();
    }

    getAllStudent(){
        axios({
            url:"http://localhost:8088/students/getAllStudent",
        })
            .then((res) => {
                // console.log(res);
                console.log(res.data);
                let datas = res.data;
                for(let i = 0;i <datas.length;i++){
                    datas[i]["key"] = datas[i].sid;
                }
                this.setState({
                    data1:datas,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onClick(){
        this.getStudent();
    }
    getStudent(){
        let sidValue = this.state.sidValue;
        axios({
            method:'post',
            url:"http://localhost:8088/students/getStudent",
            data:sidValue,
        })
            .then((res) => {
                console.log(res);
                let datas = res.data;
                console.log(datas);
                for(let i = 0;i <datas.length;i++){
                    datas[i]["key"] = datas[i].sid;
                }
                this.setState({
                    data1:datas,
                })
            })
            .catch((error) => {
                // console.log(error.response.data);
            });
    }

    inputChange(e){
        this.setState({
            sidValue:e.target.value
        })
    }

    render() {
        const {data1,sidValue} = this.state;
        return (
            <div>
                {/* 查询导航栏 */}
                <div className="dh">
                    学生学号：
                    <Input placeholder="请输入学生学号" value={sidValue} onChange={(e)=>this.inputChange(e)} className="inputid" />
                    {/*学生姓名：*/}
                    {/*<Input placeholder="请输入学生姓名" className="inputid" />*/}
                    <Button type="primary" icon="search" className="sbtn" onClick={this.onClick}>
                        查询
                    </Button>
                </div>
                <Table columns={this.columns} dataSource={data1} />
            </div>
        );
    }
}

export default SelectStudent;
