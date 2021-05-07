import { Form, Input, Button, notification } from 'antd';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import env from '../api/env';
import './detail.css';

const EnvDetail = function (props) {
    const history = useHistory();
    const params = useParams();
    const isNew = (Number(params.id) === 0);

    const defaultState = {
        name: "",
        content: "",
    }
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const validateMessages = {
        required: "${label} is required!",
    };
    const [form] = Form.useForm();
    useEffect(() => {
        const id = params.id;
        if (!isNew) {
            env.detail(id).then(d => {
                const newConfig = { ...d };
                form.setFieldsValue(newConfig);
            })
        }
    }, [])

    const onFinish = async (value) => {
        console.log(value);
        const id = params.id;
        const request = { ...value, ID: Number(id) };
        env.saveApp(request).then(d => {
            history.push("/page/env");
            notification.success({
                message: 'Notification Title',
                description:
                    '操作成功.',
            });
        })
    }

    const back = () => {
        history.push("/page/env");
    }

    return (
        <div>
            <div>
                <Button type='primary' onClick={back}>返回</Button>
            </div>
            <Form {...layout} name="nest-messages"
                form={form}
                initialValues={defaultState}
                onFinish={onFinish}
                validateMessages={validateMessages}>
                <Form.Item
                    name={['name']}
                    label="名称"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name={['content']}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    label="文件内容">
                    <Input.TextArea 
                    className="text-code"
                    style={{ height: "600px" }} />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EnvDetail;