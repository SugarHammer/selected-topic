import React from 'react';
// import ReactDOM from 'react-dom';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import './Teacher.css';
import { Layout, Menu, Icon } from 'antd';
import SelectStudent from "../../pages/teacher/selectStudent";
import InsertTitle from "../../pages/teacher/insertTitle";
import UpdateTitle from "../../pages/teacher/updateTitle";
import SelectTitle from "../../pages/teacher/selectTitle";
import Login from "../login/Login";

const { Header, Sider, Content } = Layout;

class Teacher extends React.Component {
    state = {
        collapsed: false,
        tname:this.props.location.query.tname,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout className="all">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" >
                        <span className="tit">毕业设计选题系统</span>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Link to={{pathname:"/teacher",query:{tname:this.state.tname}}}>
                            <Icon type="user" />
                            <span>查看中选学生</span></Link>
                        </Menu.Item>
                        <Menu.Item key="2"><Link to={{pathname:"/teacher/inserttitle",query:{tname:this.state.tname}
                            }}>
                            <Icon type="upload" />
                            <span>申报题目</span></Link>
                        </Menu.Item>
                        {/*<Menu.Item key="3"><Link to="/teacher/updatetitle">*/}
                        {/*    <Icon type="edit" />*/}
                        {/*    <span>修改题目</span></Link>*/}
                        {/*</Menu.Item>*/}
                        <Menu.Item key="4"><Link to="/teacher/selecttitle">
                            <Icon type="video-camera" />
                            <span>查看所有题目</span></Link>
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
                            <Route path='/teacher' exact={true} component={SelectStudent}></Route>
                            <Route path='/teacher/inserttitle' component={InsertTitle}></Route>
                            <Route path='/teacher/updatetitle' component={UpdateTitle}></Route>
                            <Route path='/teacher/selecttitle' component={SelectTitle}></Route>
                            <Route path='/' component={Login}></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default withRouter(Teacher);
