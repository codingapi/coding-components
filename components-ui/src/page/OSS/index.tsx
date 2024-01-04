import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProFormUploadDragger, } from '@ant-design/pro-components';
import { Button, Form, Image, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import { MyTable } from '../../components/MyTable';

interface OSSPageProps {

  list(params: any, sort?: any, filter?: any): Promise<any>;

  upload(file: File): Promise<any>;

  del(params: any): Promise<any>;

}

export const OSSPage: React.FC<OSSPageProps> = (props) => {

  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>();


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
      title: "文件名称",
      dataIndex: 'name',
    },
    {
      title: "文件类型",
      dataIndex: 'type',
      search: false,
    },
    {
      title: "访问地址",
      dataIndex: 'url',
      search: false,
      copyable: true,
      renderText: (record) => {
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port = window.location.port;
        return `${protocol}//${hostname}:${port}${record}`;
      }
    },
    {
      title: "上传时间",
      dataIndex: 'createTime',
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
            setFileUrl(record.url);
            setDetail(true);
          }}
        >
          预览
        </a>,
        <Popconfirm
          key="delete"
          title="删除提示"
          description="确认要删除这条数据吗?"
          onConfirm={async () => {
            await handleDel(record.name);
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
        headerTitle="文件列表"
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
            <PlusOutlined /> 上传文件
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

      <Image
        style={{ display: 'none' }}
        preview={{
          visible: detail,
          src: fileUrl,
          onVisibleChange: (value) => {
            setDetail(value);
          },
        }}
      />

      <ModalForm
        title="上传文件"
        form={form}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            form.submit();
          }
        }}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            form.resetFields();
          },
        }}
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async () => {
          handleModalOpen(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
      >
        <ProFormUploadDragger
          name="file"
          fieldProps={{
            customRequest: async (options) => {
              //@ts-ignore
              const res = await props.upload(options.file);
              if (res.success) {
                //@ts-ignore
                options.onSuccess(res.data);
              } else {
                //@ts-ignore
                options.onError(res.errMessage);
              }
            }
          }}
          label="拖拽上传" />
      </ModalForm>

    </div>
  );
};

