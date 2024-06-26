// import React from 'react';
//
// import {Link} from 'react-router';
//
// const liStyle = {
//   display: 'inline-block',
//   margin: '10px 20px'
// }
//
// const view = () => {
//   return (
//     <div>
//       <ul>
//         <li style={liStyle}><Link to="/home">Home</Link></li>
//         <li style={liStyle}><Link to="/about">About</Link></li>
//       </ul>
//     </div>
//   );
// };
//
// export {view};
// import React, {Component} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
// import {Route} from 'react-router-dom'
// import {Router} from "react-router";
// import Home from '../../pages/Home'
// import About from "../../pages/About";
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


const liStyle = {
    display: 'inline-block',
    margin: '10px 20px'
}

class view extends React.Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">注销</Menu.Item>
                        {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
                        {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                    </Menu>
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
                subnav 1
              </span>
                                }
                            >
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                <Icon type="laptop"/>
                subnav 2
              </span>
                                }
                            >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={
                                    <span>
                <Icon type="notification"/>
                subnav 3
              </span>
                                }
                            >
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            content
                            {/*<Link to="/home">Home</Link>*/}
                            {/*<Router>*/}
                            {/*    <Route path='/home' component={Home}></Route>*/}
                            {/*    <Route path='/home/about' component={About}></Route>*/}
                            {/*</Router>*/}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export {view};


