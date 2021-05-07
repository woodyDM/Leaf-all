import React, { useState, useEffect } from 'react';
import { Button, Table, Space } from 'antd'
import { useHistory, Link } from 'react-router-dom';
import app from '../api/app';

const App = function (props) {
  const history = useHistory();
  const defaultPage = {
    list: []
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'ID',
    },
    {
      title: '状态',
      dataIndex: 'enable',
      key: 'ID',
      render: status => status ? "启用" : "禁用",
    },
    {
      title: 'Action',
      key: 'ID',
      render: (text, record) => (
        <Space size="middle">
          <Link to={"/page/app/" + record.ID}>详情</Link>
          <Link to={"/page/app/" + record.ID + "/tasks"}>任务</Link>
          <span>删除</span>
        </Space>
      ),
    }
  ]

  const [page, setPages] = useState(defaultPage);

  const createApp = () => {
    history.push("/page/app/0")
  }


  useEffect(() => {
    app.list().then(data => {
      data.forEach(it => {
        it.key = it.ID
      });
      setPages({
        list: data,
      })
    });
  }, [])

  return (

    <div>
      <header>
        <div>
          <Button type="primary" onClick={createApp}>新建</Button>
        </div>
        <div>
          <Table
            dataSource={page.list}
            columns={columns}
          />
        </div>
      </header>
    </div>
  )
}

export default App;