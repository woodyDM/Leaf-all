import { useEffect, useState } from "react";
import api from '../api/task';
import { useParams, useHistory } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";
import StatusTag from "../component/StatusTag";
import { Row, Col, Button } from 'antd';
import taskApi from '../api/task';

const TaskDetail = function (props) {
    const [task, setTask] = useState({
        command: "",
        log: "",
        status: 0,
        appId: 0,
        startTime: "",
        finishTime: "",
        cost:-1,
    });
    const history = useHistory();
    const param = useParams();
    const id = param.id;
    let out;
    const fresh = () => {
        api.detail(id).then(data => {
            setTask({
                command: data.command,
                log: data.log,
                status: data.status,
                appId: data.appId,
                startTime: data.startTime,
                finishTime: data.finishTime,
                cost:data.costSeconds,
            })
            const needAgain = (data.status === 0 || data.status === 1);
            if (needAgain) {
                out = setTimeout(() => fresh(), 1000);
            }
            const logText = document.querySelector("#log");
            if (logText) {
                logText.scrollTop = logText.scrollHeight;
            }
        });
    }

    const back = () => {
        history.push("/page/app/" + task.appId);
    }

    const stop = (id) => {
        taskApi.stop(id).then(d => {
            console.log(d);
        })
    }

    useEffect(() => {
        fresh();
        return () => {
            if (out) {
                clearTimeout(out);
            }
        }
    }, []);
    const running = task.status === 1;
    return <div>任务运行详情
         <div style={{ marginBottom: '20px' }}>
            <Row>
                <Col span={2}  >操作：</Col>
                <Col span={3}  ><Button type='primary' onClick={back}>返回APP</Button></Col>
                <Col span={3}><Button type='primary'
                    disabled={!running}
                    onClick={() => stop(id)}>停止运行</Button></Col>
            </Row>

        </div>
        <div>任务id = {id}</div>
        <div> 任务开始时间：{task.startTime} </div>
        <div> 任务结束时间：{task.finishTime}</div>
        <div> 任务耗时 :  {task.cost===-1?"未知":task.cost+" s"}</div>
        <div>运行结果
            <StatusTag status={task.status} />
        </div>
        <div>运行脚本
            <TextArea value={task.command} />
        </div>
        <div>运行日志
            <TextArea id="log"
                style={{ height: "650px" }}
                value={task.log} />
        </div>

    </div>
}
export default TaskDetail;
