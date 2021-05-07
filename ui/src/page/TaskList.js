import { useParams, useHistory } from "react-router-dom"
import { Table, Space, Button, Pagination } from "antd";
import { useState, useEffect } from "react";
import task from '../api/task';
import StatusTag from '../component/StatusTag';

 const TaskList = function (props) {
    const params = useParams();
    const history = useHistory();
    const [page, setPage] = useState({
        List: [],
        PageNum: 1,
        PageSize: 10,
        Total: 20,
    });

    const fresh = (pageNum) => {
        task.list(params.id, pageNum, 10).then(d => {
            const data = { ...d };
            data.List.forEach(it => {
                it.key = it.ID;
            });
            setPage(data);

        });
    }

    useEffect(() => {
        fresh(1);
    }, [])


    const onPageChange = (p) => {
        fresh(p);
    }
    const detail = (id) => {
        history.push("/page/task/" + id);
    }
    const columns = [
        {
            title: 'TaskId',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: 'seq',
            dataIndex: 'seq',
            key: 'ID',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'ID',
            render: (text, record) => (<StatusTag status={record.status} />),
        },
        {
            title: '创建时间',
            dataIndex: 'CreatedAt',
            key: 'ID',
        },
        {
            title: 'Action',
            key: 'ID',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => detail(record.ID)}>详情</Button>
                    <span>Delete</span>
                </Space>
            ),
        }
    ]

    return (
        <div>This is task list: AppId = {params.id}
            <div>
                <Table columns={columns} dataSource={page.List}
                    pagination={false} />
                <Pagination
                    defaultCurrent={page.PageNum}
                    pageSize={page.PageSize}
                    onChange={onPageChange}
                    total={page.Total}></Pagination>
            </div>
        </div>
    )
}
export default TaskList;