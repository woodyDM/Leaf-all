import React, { useState, useEffect } from 'react';
import { Button, Table, Space } from 'antd'
import { useHistory, Link } from 'react-router-dom';
import env from '../api/env';

const Env = function (props) {
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
      dataIndex: 'Name',
      key: 'ID',
    },
    {
      title: 'Action',
      key: 'ID',
      render: (text, record) => (
        <Space size="middle">
          <Link to={"/page/env/" + record.ID}>Edit</Link>
          <span>Delete</span>
        </Space>
      ),
    }
  ]

  const [page, setPages] = useState(defaultPage);

  const createEnv = () => {
    history.push("/page/env/0")
  }

  useEffect(() => {
    env.list().then(data => {
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
          <Button type="primary" onClick={createEnv}>新建文件变量</Button>
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

export default Env;