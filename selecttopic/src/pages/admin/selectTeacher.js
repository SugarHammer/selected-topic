// import React from "react";
import React, {Component} from 'react';
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./selectTeacher.css"
import { Table, Icon, Input, Button } from "antd";
import axios from "axios";
import {Link} from "react-router-dom";




const data = [
    {
        key: "1",
        tid: "111",
        tname: "教师1",
        tqq: "1q",
        tphone: "1p",
        tnum: "10"
    },
    {
        key: "2",
        tid: "222",
        tname: "教师2",
        tqq: "2q",
        tphone: "2p",
        tnum: "10"
    },
    {
        key: "3",
        tid: "333",
        tname: "教师3",
        tqq: "3q",
        tphone: "3p",
        tnum: "10"
    },
    {
        key: "4",
        tid: "444",
        tname: "教师4",
        tqq: "4q",
        tphone: "4p",
        tnum: "10"
    }
];

class SelectTeacher extends Component {

    state = {
        data1: [],
        tnameValue:"",
        tidValue:"",
        tid:"",
    }

    columns = [
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
            title: "教师QQ号",
            dataIndex: "tqq",
            key: "tqq"
        },
        {
            title: "教师手机号",
            key: "tphone",
            dataIndex: "tphone"
        },
        {
            title: "教师名额",
            key: "tnum",
            dataIndex: "tnum"
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <span>
        <Link to={{pathname:"/admin/updateteacher",query:{tid:record.tid,
                tname:record.tname,
                tqq:record.tqq,
                tphone:record.tphone,
                tnum:record.tnum}}}>
          <Icon type="edit" />
          修改
        </Link>
        <a onClick={this.onClick.bind(this,record)}>
          <Icon type="delete" />
          删除
        </a>
      </span>
            )
        }
    ];



    constructor() {
        super();

        this.getTeacherAllData = this.getTeacherAllData.bind(this);
        this.selectonClick = this.selectonClick.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.getTeacher = this.getTeacher.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.getTeacherAllData();
    }

    onClick=(name,e) =>{
    //onClick(){
        //let tidValue = this.state.tidValue;
        this.state.tid = name.tid;
        console.log(this.state.tid);
        axios({
            method:'post',
            url:"http://localhost:8088/teachers/deleteTeacher",
            data:this.state.tid,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                console.log(res);
                this.getTeacherAllData();
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
    //查询所有的教师数据，自加载
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

    //条件查询教师信息
    getTeacher(){
        let tidValue = this.state.tidValue;
        axios({
            method:'post',
            url:"http://localhost:8088/teachers/getTeacher",
            data:tidValue,
        })
            .then((res) => {
                console.log(res);
                let datas = res.data;
                console.log(datas);
                for(let i = 0;i <datas.length;i++){
                    datas[i]["key"] = datas[i].tid;
                }
                this.setState({
                    data1:datas,
                })
            })
            .catch((error) => {
                // console.log(error.response.data);
            });
    }

    selectonClick(){
        this.getTeacher();
    }

    inputChange(e){
        this.setState({
            // tnameValue:e.target.value
            tidValue:e.target.value
        })
    }

    render() {
        const {data1,tnameValue,tidValue} = this.state;
        return (
            <div>
                {/* 查询导航栏 */}
                <div className="dh">
                    教师工号：
                    <Input placeholder="请输入教师工号" value={tidValue} onChange={(e)=>this.inputChange(e)} className="inputid" />
                    {/*教师姓名：*/}
                    {/*<Input placeholder="请输入教师姓名" value={tnameValue} onChange={(e)=>this.inputChange(e)} className="inputid" />*/}
                    <Button type="primary" icon="search" className="sbtn" onClick={this.selectonClick}>
                        查询
                    </Button>
                </div>
                <Table columns={this.columns} dataSource={data1} />
            </div>
        );
    }
}

export default SelectTeacher;
