import { Form, Input, Button, Switch, notification, Space, Select, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import app from '../api/app';
import env from '../api/env';

const AppDetail = function (props) {
    const { Option } = Select;
    const history = useHistory();
    const params = useParams();
    const id = params.id;
    const isNew = (Number(id) === 0);
    const [envMeta, setEnvs] = useState([]);

    const defaultState = {
        enable: true,
        command: "",
        envs: []
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
        if (!isNew) {
            app.detail(id).then(d => {
                const newConfig = {
                    ID: d.ID,
                    command: d.command,
                    enable: d.enable,
                    gitUrl: d.gitUrl,
                    name: d.name,
                    envs: d.envs ? d.envs.map(it => {
                        return {
                            EnvId: it.EnvId,
                            ID: it.ID,
                            key: it.ID,
                            Variable: it.Variable
                        }
                    }) : []
                };

                form.setFieldsValue(newConfig);
            })
        }
    }, [])
    useEffect(() => {
        env.list().then(d => {
            const list = d.slice();
            console.log(list);
            setEnvs(list);
        });
    }, [])

    const onFinish = async (value) => {

        const request = { ...value, ID: Number(id) };
        if (request.envs == undefined) {
            request.envs = []
        }
        app.saveApp(request).then(d => {
            notification.success({
                message: 'Notification Title',
                description:
                    '操作成功.',
            });
            if(isNew){
                //跳转到新建好到页面。
                history.push("/page/app/"+d);
            }
        })
    }

    const back = () => {
        history.push("/page/app");
    }

    const runApp = (id) => {
        app.run(id).then(d => {
            history.push("/page/task/" + d)
        })
    }

    //calculate envs
    const onEnvChange = (v) => {
        console.log(v);
    }

    const hasEvnMeta = (envMeta.length > 0);

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <Row>

                    <Col span={4} style={{ textAlign: 'right' }} >操作：</Col>
                    <Col span={2}  ><Button type='primary' onClick={back}>返回</Button></Col>
                     <Col span={2}><Button type='primary' 
                     disabled={isNew}
                     onClick={()=>runApp(id)}>运行</Button></Col>
                </Row>

            </div>
            <Form  {...layout} name="nest-messages"
                form={form}
                initialValues={defaultState}
                onFinish={onFinish}
                validateMessages={validateMessages}>
                <Form.Item
                    name={['name']}
                    label="应用名称"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    {isNew ? <Input /> : <Input disabled />}
                </Form.Item>
                <Form.Item
                    name={['gitUrl']}
                    label="仓库git地址"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    {isNew ? <Input /> : <Input disabled />}
                </Form.Item>
                <Form.Item
                    name={['enable']}
                    valuePropName='checked'
                    label="启用"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Switch />
                </Form.Item>
                <Row>
                    <Col span={16} offset={4}>
                        {hasEvnMeta ? (
                            <Form.List name="envs">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(field => (
                                            <Space key={field.key} align="baseline">
                                                <Row>

                                                    <Form.Item
                                                        noStyle
                                                        shouldUpdate={(prevValues, curValues) =>
                                                            true
                                                        }
                                                    >
                                                        {() => (

                                                            <Form.Item
                                                                {...field}
                                                                label=""
                                                                name={[field.name, 'EnvId']}
                                                                fieldKey={[field.fieldKey, 'key']}
                                                                rules={[{ required: true, message: 'Missing sight' }]}
                                                            >
                                                                <Select style={{ width: 200 }}>
                                                                    {envMeta.map(item => (
                                                                        <Option key={item.ID} value={item.ID}>
                                                                            {item.Name}
                                                                        </Option>
                                                                    ))}
                                                                </Select>
                                                            </Form.Item>
                                                        )}
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}

                                                        label="变量"
                                                        name={[field.name, 'Variable']}
                                                        fieldKey={[field.fieldKey, 'key']}
                                                        rules={[{ required: true, message: 'Missing price' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>


                                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                </Row>
                                            </Space>
                                        ))}

                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add File
              </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>) : (<div>No Files to config</div>)}
                    </Col>
                </Row>

                <Form.Item name={['command']} label="脚本内容">
                    <Input.TextArea style={{ height: "500px" }} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                         </Button>
                </Form.Item>
            </Form>
        </div >
    );
}

export default AppDetail;