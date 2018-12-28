import React from 'react';
import { Table } from 'antd';

import styles from './RightView.cssmodule.scss';

const RightView = props => {
  const columns = [
    {
      title: '筛选的值',
      dataIndex: 'value',
      key: 'value',
      render: text => text
    }
  ];
  const { dataSource } = props;
  return (
    <Table
      className={styles.root}
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 15 }}
      scroll={{ y: 'calc(100vh - 150px)' }}
    />
  );
};

export default RightView;
