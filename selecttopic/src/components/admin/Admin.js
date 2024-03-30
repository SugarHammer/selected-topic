import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Admin.css';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import InsertTeacher from "../../pages/admin/insertTeacher";
import SelectTeacher from "../../pages/admin/selectTeacher";
import InsertStudent from "../../pages/admin/insertStudent";
import SelectStudent from "../../pages/admin/selectStudent";
import UpdateTeacher from "../../pages/admin/updateTeacher";
import UpdateStudent from "../../pages/admin/updateStudent";
import SelectTopic from "../../pages/admin/selectTopic";
import Topic from "../../pages/admin/topic";
import Ciyun from "../../pages/admin/ciyun";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


const liStyle = {
    display: 'inline-block',
    margin: '10px 20px'
}

class Admin extends React.Component {
    render() {
        return (
            <Layout className="all">
                <Header className="header">
                    <span className="logo">
                        毕业设计选题系统
                    </span>
                    <span className="zhuxiao">
                        <a href="/">注销</a>
                    </span>
                </Header>
                <Layout>
                    <Sider width={200} style={{background: '#fff'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                <Icon type="user"/>
                教师管理
              </span>
                                }
                            >
                                <Menu.Item key="1"><Link to="/admin">查询所有教师信息</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/admin/insertteacher">添加教师</Link></Menu.Item>
                                {/*<Menu.Item key="3">删除教师</Menu.Item>*/}
                                {/*<Menu.Item key="4"><Link to="/admin/updateteacher">修改教师信息</Link></Menu.Item>*/}
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                <Icon type="laptop"/>
                学生管理
              </span>
                                }
                            >
                                <Menu.Item key="5"><Link to="/admin/selectstudent">查询所有学生信息</Link></Menu.Item>
                                <Menu.Item key="6"><Link to="/admin/insertstudent">添加学生</Link></Menu.Item>
                                {/*<Menu.Item key="7">删除学生</Menu.Item>*/}
                                {/*<Menu.Item key="8"><Link to="/admin/updatestudent">修改学生信息</Link></Menu.Item>*/}
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={
                                    <span>
                <Icon type="notification"/>
                题目管理
              </span>
                                }
                            >
                                <Menu.Item key="9"><Link to="/admin/selecttopic">查询所有题目信息</Link></Menu.Item>
                                {/*<Menu.Item key="10">添加题目</Menu.Item>*/}
                                <Menu.Item key="11"><Link to='/admin/topic'>题目统计分析</Link></Menu.Item>
                                {/*<Menu.Item key="12"><Link to='/admin/ciyun'>题目词云</Link> </Menu.Item>*/}
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>欢迎进入毕业设计选题系统！</Breadcrumb.Item>
                            {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {/*content*/}
                            <Switch>
                                <Route path='/admin/insertteacher' component={InsertTeacher}></Route>
                                <Route path='/admin' exact={true} component={SelectTeacher}></Route>
                                <Route path='/admin/insertstudent' component={InsertStudent}></Route>
                                <Route path='/admin/selectstudent' component={SelectStudent}></Route>
                                <Route path='/admin/updateteacher' component={UpdateTeacher}></Route>
                                <Route path='/admin/updatestudent' component={UpdateStudent}></Route>
                                <Route path='/admin/selectTopic' component={SelectTopic}></Route>
                                <Route path='/admin/topic' component={Topic}></Route>
                                {/*<Route path='/admin/ciyun' component={Ciyun}></Route>*/}
                            </Switch>

                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(Admin);


