import { Select, Input, Row, Col } from 'antd'
//props.vId
//props.vName
//props.envs
const EnvSelect = function (props) {
    const envs = props.envs;
    const hasEnv = envs && envs.length > 0;
    const { Option } = Select;
    const callBack = props.onChange;

    const handleSelectChange = (value) => {
        const newEv = {
            vId: Number(value),
            vName: props.vName
        }
        callBack(newEv);
    }
    const handleInputChange = (e) => {
        const newEv = {
            vId: props.vId,
            vName: e.target.value,
        }
        callBack(newEv);
    }

    return (hasEnv) ?
        (
            <div>
                <Row justify="center">
                    <Col span={5}>文件变量</Col>
                    <Col span={6}>
                        <Select
                            defaultValue={props.vId}
                            style={{ width: "100%" }}
                            onChange={handleSelectChange}>
                            {envs.map(e => <Option key={e.ID} value={e.ID}>{e.Name}</Option>)}
                        </Select>
                    </Col>
                    <Col span={5} offset={1}>环境变量</Col>
                    <Col span={6}>
                        <Input
                            onChange={handleInputChange}
                            value={props.vName} />
                    </Col>
                </Row>


            </div>
        ) :
        (<div>没有可选择的文件变量</div>)
}

export default EnvSelect;