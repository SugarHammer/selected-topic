// import React from "react";
import React, {Component} from 'react';
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./selectTeacher.css"
import { Table, Icon, Input, Button } from "antd";
import axios from "axios";
import {withRouter} from 'react-router-dom';
// import {Link} from "react-router-dom";



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
        data1:[],
        // sname:this.props.location.state.sname,
        tnameValue:"",
        tidValue:"",
        tid:0,
        tname:"",
        tqq:"",
        tphone:"",
        tnum:0,
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
        <Button type="primary" onClick={this.btnClick.bind(this,record)} >
        {/*    <Link to={{pathname:'/student/selectTitle',query:{tid:record.tid,*/}
        {/*    tname: record.tname,tqq:record.tqq,tphone:record.tphone}*/}
        {/*}}>*/}
          <Icon type="check-circle" />
          选择
        {/*</Link>*/}
                </Button>
      </span>
            )
        }
    ];

    constructor() {
        super();
        this.getTeacherAllData = this.getTeacherAllData.bind(this);
        this.getTeacher = this.getTeacher.bind(this);
        this.onClick = this.onClick.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.btnClick = this.btnClick.bind(this);
    }

    // btnClick(){
    //     console.log("111");
    //     this.updateTeacher();
    // }
    btnClick=(name,e) =>{
        // console.log("111");
        // console.log(name);
        this.state.tid=name.tid;
        this.state.tname=name.tname;
        this.state.tqq=name.tqq;
        this.state.tphone=name.tphone;
        this.state.tnum=name.tnum;
        if(this.state.tnum > 0){
            this.updateTeacher();
            this.props.history.push({pathname:'/student/selectTitle',state:{tid:name.tid,sname:this.props.location.state.sname}
            });
        }else {
            alert("该教师没有名额，无法选择！")
        }

    }

    updateTeacher(){
        let params = {
            tid: this.state.tid,
            tname: this.state.tname,
            tqq: this.state.tqq,
            tphone: this.state.tphone,
            tnum: this.state.tnum-1,
        }
        // console.log(params);
        axios({
            method:'post',
            url:"http://localhost:8088/teachers/changeTeacher",
            data:params
        })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                // console.log(error.response.data);
            });
    }

    componentDidMount() {
        console.log(this.props.location.state.sname)
        this.getTeacherAllData()
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

    //条件查询教师信息-模糊查询
    getTeacher(){
        let tidValue = this.state.tidValue;
        let tnameValue = this.state.tnameValue;
        let param = {
            tname : tnameValue,
            tid : tidValue,
        }
        axios({
            method:'post',
            url:"http://localhost:8088/teachers/getLikeTeacher",
            data:param,
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((res) => {
                console.log(tnameValue);
                console.log(res);
                let datas = res.data;
                // console.log(datas);
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

    onClick(){
        this.getTeacher();
    }

    inputChange(e){
        this.setState({
            // tnameValue:e.target.value
            tidValue:e.target.value
        })
    }
    nameChange(e){
        this.setState({
            tnameValue:e.target.value
        })
    }
    render() {
        const {data1,tnameValue,tidValue} = this.state;

        return (
            <div>
                {/* 查询导航栏 */}
                <div className="dh">
                    教师工号：
                    <Input placeholder="请输入教师工号" className="inputid" value={tidValue} onChange={(e)=>this.inputChange(e)}  />
                    教师姓名：
                    <Input placeholder="请输入教师姓名" className="inputid" value={tnameValue} onChange={(e)=>this.nameChange(e)}/>
                    <Button type="primary" icon="search" className="sbtn" onClick={this.onClick}>
                        查询
                    </Button>
                </div>
                <Table columns={this.columns} dataSource={data1}
                       pagination={{
                           total: 50,
                           defaultCurrent:1,
                           pageSize:7,
                           showSizeChanger: true,
                           //onShowSizeChange: this.onShowSizeChange,
                           showQuickJumper: true,
                           //onChange: this.onChange,
                           pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
                       }}/>
            </div>
        );
    }
}

export default withRouter(SelectTeacher);
