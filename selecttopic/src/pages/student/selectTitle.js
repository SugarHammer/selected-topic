import React, {Component} from 'react';
import "antd/dist/antd.css";
import "./selectTitle.css"
import { Table, Icon, Input, Button } from "antd";
import axios from "axios";



// const data = [
//     {
//         key: "1",
//         tlid: "1",
//         tlname:'题目1',
//         tname: "教师1",
//         sname: "学生1",
//     },
//     {
//         key: "2",
//         tlid: "2",
//         tlname:'题目2',
//         tname: "教师1",
//         sname: "--",
//     },
//     {
//         key: "3",
//         tlid: "3",
//         tlname:'题目3',
//         tname: "教师1",
//         sname: "学生2",
//     },
//     {
//         key: "4",
//         tlid: "4",
//         tlname:'题目4',
//         tname: "教师1",
//         sname: "--",
//     }
// ];

class SelectTeacher extends Component {

    state = {
        data1:[],
        // sname:this.props.location.state.sname,
        tlid:0,
        tlname:"",
        tid:"",
        tname:"",
        tlnameValue:"",
        // sname:this.props.location.state.sname,
        // tid:this.props.location.state.tid,
        // tname:this.props.location.query.tname,
        // tqq:this.props.location.query.tqq,
        // tphone:this.props.location.query.tphone,
        // tnum:this.props.location.query.tnum,
    }

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
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <span>
        <Button type="primary" onClick={this.btnClick.bind(this,record)}>
          <Icon type="check-circle" />
          选择
        </Button>
      </span>
            )
        }
    ];

    constructor() {
        super();

        this.getTopic =this.getTopic.bind(this);
        this.btnClick = this.btnClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.updateTopic = this.updateTopic.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }
    componentDidMount() {
        this.getTopic();

        console.log(this.props)
    }

    btnClick=(name,e) =>{
        this.state.tlid=name.tlid;
        this.state.tlname=name.tlname;
        this.state.tid=name.tid;
        this.state.tname=name.tname;
        if(name.sname == ""){
            this.updateTopic();
            alert("选择成功，请点击查看结果！")
        }else {
            alert("该题目无法选择");
        }

    }

    onClick(){
        this.getLikeTopic();
    }

    getLikeTopic(){
        let tlnameValue = this.state.tlnameValue;
        let param = {
            tlname : tlnameValue
        }
        axios({
            method:'post',
            url:"http://localhost:8088/topics/getLikeTopic",
            data:param,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                console.log(tlnameValue);
                console.log(res);
                let datas = res.data;
                // console.log(datas);
                for(let i = 0;i <datas.length;i++){
                    datas[i]["key"] = datas[i].tlid;
                }
                this.setState({
                    data1:datas,
                })
            })
            .catch((error) => {
                // console.log(error.response.data);
            });
    }

    updateTopic(){
        let params = {
            tlid: this.state.tlid,
            tlname: this.state.tlname,
            tid: this.state.tid,
            tname: this.state.tname,
            sname: this.props.location.state.sname,
        }

        console.log(params);
        axios({
            method:'post',
            url:"http://localhost:8088/topics/changeTopic",
            data:params
        })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                // console.log(error.response.data);
            });
    }

    inputChange(e){
        this.setState({
            tlnameValue:e.target.value
        })
    }

    getTopic(){
        let tid = {
            tid:this.props.location.state.tid
        };
        console.log(tid);
        axios({
            method:'post',
            url:"http://localhost:8088/topics/getTopic",
            data:tid,
        })
            .then((res) => {
                console.log(res);
                let datas = res.data;
                // console.log(datas);
                for(let i = 0;i <datas.length;i++){
                    datas[i]["key"] = datas[i].tlid;
                }
                this.setState({
                    data1:datas,
                })
            })
            .catch((error) => {
                // console.log(error.response.data);
            });
    }
    render() {
        const {data1,tlnameValue} = this.state;
        return (
            <div>
                {/* 查询导航栏 */}
                <div className="dh">
                    题目名称：
                    <Input placeholder="请输入题目名称" className="inputid" value={tlnameValue} onChange={(e)=>this.inputChange(e)}/>
                    <Button type="primary" icon="search" className="sbtn" onClick={this.onClick}>
                        查询
                    </Button>
                </div>
                <Table columns={this.columns} dataSource={data1}
                       pagination={{
                           total: 50,
                           defaultCurrent:1,
                           pageSize:5,
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

export default SelectTeacher;
