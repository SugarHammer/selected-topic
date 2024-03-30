import React, {Component} from 'react';
// import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import {Table, Input, Button, Icon} from 'antd';
import axios from "axios";
// import Highlighter from 'react-highlight-words';

const data = [
    {
        key: '1',
        tlid: '1',
        tlname: '题目1',
        tname: '教师1',
        sname:'学生1',
    },
    {
        key: '2',
        tlid: '2',
        tlname: '题目2',
        tname: '教师2',
        sname:'学生2',
    },
    {
        key: '3',
        tlid: '3',
        tlname: '题目3',
        tname: '教师3',
        sname:'学生3',
    },
    {
        key: '4',
        tlid: '4',
        tlname: '题目4',
        tname: '教师4',
        sname:'学生4',
    },
];

class SelectTopic extends Component {
    state = {
        searchText: '',
        searchedColumn: '',
        data1:[],
    };

    constructor() {
        super();

        this.getAllTopic = this.getAllTopic.bind(this);
    }

    componentDidMount() {
        this.getAllTopic();
        console.log(this.props);
    }

    getAllTopic(){
        axios({
            url:"http://localhost:8088/topics/getAllTopic",
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
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        // render: text =>
        //     this.state.searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //             searchWords={[this.state.searchText]}
        //             autoEscape
        //             textToHighlight={text.toString()}
        //         />
        //     ) : (
        //         text
        //     ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    render() {
        const {data1} = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'tlid',
                key: 'tlid',
                width: '10%',
                ...this.getColumnSearchProps('tlid'),
            },
            {
                title: '题目名称',
                dataIndex: 'tlname',
                key: 'tlname',
                width: '40%',
                ...this.getColumnSearchProps('tlname'),
            },
            {
                title: '教师工号',
                dataIndex: 'tid',
                key: 'tid',
                width: '10%',
                ...this.getColumnSearchProps('tname'),
            },
            {
                title: '教师姓名',
                dataIndex: 'tname',
                key: 'tname',
                width: '20%',
                ...this.getColumnSearchProps('tname'),
            },
            {
                title: '学生姓名',
                dataIndex: 'sname',
                key: 'sname',
                ...this.getColumnSearchProps('tname'),
            },
        ];

        return (
            <div>
                <Table columns={columns} dataSource={data1}
                       pagination={{
                           total: 50,
                           defaultCurrent:1,
                           pageSize:7,
                           showSizeChanger: true,
                           // onShowSizeChange: this.onShowSizeChange,
                           showQuickJumper: true,
                           // onChange: this.onChange,
                           // pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
                       }}/>
            </div>
        );
    }
}

export default SelectTopic;