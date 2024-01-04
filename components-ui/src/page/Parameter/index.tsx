import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProForm, ProFormDigit, ProFormText, ProFormTextArea, } from '@ant-design/pro-components';
import { Button, Form, message, Popconfirm } from 'antd';
import { MyTable } from '../../components/MyTable';
import React, { useRef, useState } from 'react';


interface ParameterPageProps {

  list(params: any, sort?: any, filter?: any): Promise<any>;

  save(params: any): Promise<any>;

  del(params: any): Promise<any>;

}

export const ParameterPage: React.FC<ParameterPageProps> = (props) => {

  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  const handleAdd = async (fields: any) => {
    const hide = message.loading('正在添加');
    try {
      await props.save({ ...fields });
      hide();
      message.success('保存成功');
      return true;
    } catch (error) {
      hide();
      message.error('保存失败，请重试!');
      return false;
    }
  };


  const handleDel = async (id: string) => {
    const hide = message.loading('正在删除');
    try {
      await props.del({ id: id });
      hide();
      message.success('删除成功');
      if (actionRef.current) {
        actionRef.current.reload();
      }
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试!');
      return false;
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: "编号",
      dataIndex: 'id',
      search: false,
    },
    {
      title: "参数名称",
      dataIndex: 'name',
    },
    {
      title: "参数单位",
      dataIndex: 'unit',
      search: false,
    },
    {
      title: "参数编码",
      dataIndex: 'code',
    },
    {
      title: "参数值",
      dataIndex: 'value',
      search: false,
    },
    {
      title: "参数说明",
      dataIndex: 'description',
      search: false,
    },
    {
      title: "排序",
      dataIndex: 'sort',
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
            for (let key in record) {
              form.setFieldValue(key, record[key])
            }
            handleModalOpen(true);
          }}
        >
          修改
        </a>,
        <Popconfirm
          key="delete"
          title="删除提示"
          description="确认要删除这条数据吗?"
          onConfirm={async () => {
            await handleDel(record.id);
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
    <div>
      <MyTable
        headerTitle="参数管理"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const res = await props.list(params);
          return {
            data: res.data.list,
            success: res.success,
            total: res.data.total
          };
        }
        }
        columns={columns}
      />

      <ModalForm
        title="新建参数"
        form={form}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            form.resetFields();
          },
        }}
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          hidden={true}
          name="id"
        />
        <ProFormText
          label="参数名称"
          placeholder="请输入参数名称"
          rules={[
            {
              required: true,
              message: "请输入参数名称",
            },
          ]}
          name="name"
        />
        <ProForm.Group>
          <ProFormText
            width="md"
            label="参数编码"
            placeholder="请输入参数编码"
            rules={[
              {
                required: true,
                message: "请输入参数编码",
              },
            ]}
            name="code"
          />
          <ProFormText
            width="md"
            label="参数单位"
            placeholder="请输入参数单位"
            rules={[
              {
                message: "请输入参数单位",
              },
            ]}
            name="unit"
          />
        </ProForm.Group>
        <ProFormText
          label="参数值"
          placeholder="请输入参数值"
          rules={[
            {
              required: true,
              message: "请输入参数值",
            },
          ]}
          name="value"
        />
        <ProFormTextArea
          label="参数说明"
          rules={[
            {
              required: true,
              message: "请输入参数说明",
            },
          ]}
          fieldProps={{
            rows: 3,
            maxLength: 200
          }}
          placeholder="请输入参数说明"
          name="description" />
        <ProFormDigit
          label="参数排序"
          min={0}
          fieldProps={{
            precision: 0,
          }}
          placeholder="请输入参数排序"
          rules={[
            {
              required: true,
              message: "请输入参数排序",
            },
          ]}
          name="sort"
        />
      </ModalForm>

    </div>
  );
};

