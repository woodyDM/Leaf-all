import { Switch, Route } from 'react-router-dom';
import React from 'react';
import './layout.css';
import App from "./App";

import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Welcome from '../component/Welcome';
import Page404 from './Page404';
import AppDetail from './AppDetail';
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';
import Env from './Env';
import EnvDetail from './EnvDetail';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class MyLayout extends React.Component {

    constructor(props) {
        super(props);
        this.map = {
            '1': '/page/app',
            '2': "/page/env"
        }
    }

    state = {
        collapsed: false,
    };

    handleClick = e => {
        const key = e.key;
        if (this.map[key]) {
            this.props.history.push(this.map[key]);
        }
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <div id="components-layout-demo-side">

                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />
                        <Menu
                            onClick={this.handleClick}
                            theme="dark"
                            defaultSelectedKeys={['1']}
                            mode="inline">
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                应用管理
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}>
                                文件管理
                            </Menu.Item>
                            <Menu.Item key="3" icon={<FileOutlined />}>
                                TODO2
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                                <Menu.Item key="4">用户</Menu.Item>
                                <Menu.Item key="5">订单</Menu.Item>
                                <Menu.Item key="6">贡献</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                                <Menu.Item key="7">Team 1</Menu.Item>
                                <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }} />
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                <Switch>
                                    <Route exact path="/page/app" component={App} />
                                    <Route exact path="/page/env" component={Env} />

                                    <Route exact path="/page/app/:id" component={AppDetail} />
                                    <Route exact path="/page/env/:id" component={EnvDetail} />
                                    <Route exact path="/page/app/:id/tasks" component={TaskList} />
                                    <Route exact path="/page/task/:id" component={TaskDetail} />
                                    <Route exact path="/" component={App} />
                                    <Route path="/" component={Page404} />
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Leaf ©2021 Created by wd</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default MyLayout;