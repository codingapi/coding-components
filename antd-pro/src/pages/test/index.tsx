import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, } from '@ant-design/pro-components';
import { Popconfirm } from 'antd';
import { MyTable } from 'coding-components';
import React, { useRef } from 'react';

const TablePage: React.FC = () => {


  const data = [
    {
      id: 1,
      name: '服务1',
      url: 'http://localhost:8080'
    },
    {
      id: 2,
      name: '服务2',
      url: 'http://localhost:8080'
    },
  ]


  const columns: ProColumns<any>[] = [
    {
      title: "编号",
      dataIndex: 'id',
      search: false,
    },
    {
      title: "服务名称",
      dataIndex: 'name',
    },
    {
      title: "地址",
      dataIndex: 'url',
      search: false,
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            // eslint-disable-next-line guard-for-in

          }}
        >
          修改
        </a>,
        <Popconfirm
          key="delete"
          title="删除提示"
          description="确认要删除这条数据吗?"
          onConfirm={async () => {

          }}
          okText="确认"
          cancelText="取消"
        >
          <a key="delete">
            删除
          </a>
        </Popconfirm>
      ],
    },
  ];

  return (
    <PageContainer>
      <MyTable
        sortable={true}
        headerTitle="服务节点配置"
        rowKey="id"
        request={(params, sorter, filter) => {
          return Promise.resolve({
            data: data,
            success: true,
          });
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TablePage;
