import { Form, Input, Button, Layout, notification } from 'antd';
import './layout.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const Login = function () {
    const history = useHistory();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    };


    const showFail = function(msg){
        notification.error({
            message: '登录失败',
            description: msg
        });
    }

    const onFinish = values => {
        axios.post("/api/v1/login",values).then(d=>{
            if(d.data.code===0){
                history.push("/page/app");
            }else{
                showFail(d.data.msg);
            }
            
        }).catch(e=>{
            showFail(e);
        })
    };


    return (
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '200px 0 200px'}}>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="Name"
                        rules={[{ required: true, message: 'Please input your username!!!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="Pass"
                        rules={[{ required: true, message: 'Please input your password!!!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Login
                </Button>
                    </Form.Item>
                </Form>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Leaf ©2021 Created by wd</Footer>
        </Layout>
    );
}

export default Login;
