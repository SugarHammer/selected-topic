import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Student.css';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import SelectAllTitle from "../../pages/student/selectAllTitle";
import SelectTeacher from "../../pages/student/selectTeacher";
import SelectTitle from "../../pages/student/selectTitle";
import Login from "../login/Login";
import Result from "../../pages/student/result";

const { Header, Sider, Content } = Layout;

class Student extends React.Component {


    // constructor() {
    //     super();
    //     //this.onClick = this.onClick.bind(this);
    // }
    state = {
        collapsed: false,
        sname:this.props.location.state.sname
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onClick(){
        alert("请先选择导师！")
    }

    render() {
        const {sname} = this.state;
        return (
            <Layout className="all">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" >
                        <span className="tit">毕业设计选题系统</span>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Link to="/student">
                            <Icon type="video-camera" />
                            <span>查看所有题目</span></Link>
                        </Menu.Item>
                        <Menu.Item key="2"><Link to={{pathname:"/student/selectteacher",state:{sname:sname}}}>
                            <Icon type="user" />
                            <span>选择导师</span></Link>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={this.onClick}>
                        {/*    <Link to={{pathname:"/student/selecttitle",*/}
                        {/*    // state:{sname:sname}*/}
                        {/*}} >*/}
                            <Icon type="upload" />
                            <span>选择题目</span>
                        {/*</Link>*/}
                        </Menu.Item>
                        <Menu.Item key="4"><Link to={{pathname:"/student/result",state:{sname:sname}}}>
                            <Icon type="check-square" />
                            <span>查看结果</span></Link>
                        </Menu.Item>
                        <Menu.Item key="5"><Link to="/">
                            <Icon type="logout" />
                            <span>退出登录</span></Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path='/student' exact={true} component={SelectAllTitle}></Route>
                            <Route path='/student/selectteacher' component={SelectTeacher}></Route>
                            <Route path='/student/selecttitle' component={SelectTitle}></Route>
                            <Route path='/student/result' component={Result}></Route>
                            <Route path='/' component={Login}></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default withRouter(Student);
