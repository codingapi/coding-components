import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProForm, ProFormSelect, ProFormText, ProFormTextArea, } from '@ant-design/pro-components';
import { Button, Drawer, Form, message, notification, Popconfirm } from 'antd';
import { MyTable } from '../../components/MyTable';
import React, { useRef, useState } from 'react';
import Docs from './docs';
import { Editor } from '@monaco-editor/react';

interface ApiPageProps {

  list(params: any, sort?: any, filter?: any): Promise<any>;

  save(params: any): Promise<any>;

  del(params: any): Promise<any>;

  test(params: any): Promise<any>;
}

export const ApiPage: React.FC<ApiPageProps> = (props) => {

  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [readmeVisible, setReadmeVisible] = useState(false);
  const editorRef = useRef(null);

  const handleAdd = async (fields: any) => {
    const hide = message.loading('正在添加');
    try {
      //@ts-ignore
      const script = editorRef.current?.getValue();
      await props.save({
        ...fields,
        script: script
      });
      hide();
      message.success('保存成功');
      handleModalOpen(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
      return true;
    } catch (error) {
      hide();
      message.error('保存失败，请重试!');
      return false;
    }
  };


  const handleTest = async (fields: any) => {
    const hide = message.loading('正在测试');
    try {      
      const res = await props.test({
        ...fields,        
      });
      const json = JSON.stringify(res);
      api["success"]({
        "message": json,
      })
      hide();
      message.success('测试成功');
      return true;
    } catch (error) {
      hide();
      message.error('测试失败，请重试!');
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
      title: "接口名称",
      dataIndex: 'name',
      width: 80,
    },
    {
      title: "请求方式",
      dataIndex: 'method',
      search: false,
      width: 40,
    },
    {
      title: "接口地址",
      dataIndex: 'url',
      copyable: true,
      width: 80,
    },
    {
      title: "接口脚本",
      dataIndex: 'script',
      search: false,
      ellipsis: true,
      width: 150,
    },
    {
      title: "接口说明",
      dataIndex: 'description',
      search: false,
      ellipsis: true,
      width: 80,
    },
    {
      title: "状态",
      dataIndex: 'state',
      search: false,
      width: 40,
      valueEnum: {
        1: {
          text: '启用',
          status: 'Success',
        },
        0: {
          text: '禁用',
          status: 'Error',
        },
      },
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      render: (_, record) => [
        <a
          key="update"
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
        <a
          key="test"
          onClick={() => {
            // eslint-disable-next-line guard-for-in            
            handleTest(record);
          }}
        >
          测试
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


  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;

    //@ts-ignore
    monaco.languages.registerCompletionItemProvider('javascript', {
      triggerCharacters: ['$'],
      provideCompletionItems: function (model: any, position: any) {
        return {
          suggestions: [
            {
              label: '$jdbc.queryForList',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: '$jdbc.queryForList(sql,params)',
            },
            {
              label: '$jdbc.queryForPage',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: '$jdbc.queryForPage(sql,countSQL,pageRequest,params)',
            },
            {
              label: '$request.getParameter',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: '$request.getParameter(key,defaultValue)',
            },
            {
              label: '$request.pageRequest',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: '$request.pageRequest(current,pageSize)',
            },
            {
              label: '$jpa.listQuery',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: '$jpa.listQuery(entityClass,hsql,params)',
            },
            {
              label: '$jpa.pageQuery',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: '$jpa.pageQuery(entityClass,hsql,countHsql,pageRequest,params)',
            }
          ]
        };
      }

    });
  }

  return (
    <div>
      {contextHolder}
      <MyTable
        headerTitle="接口列表"
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
        title="新建接口"
        form={form}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            form.resetFields();
          },
        }}
        initialValues={{
          state: 1,
          method: "GET"
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
        submitter={{
          render: (props, defaultDoms) => {
            return [
              <Button
                key="cancel"
                onClick={() => {
                  handleModalOpen(false);
                }}
              >
                取消
              </Button>,
              <Button
                key="test"
                onClick={() => {
                  const fields = form.getFieldsValue();
                  //@ts-ignore
                  const script = editorRef.current?.getValue();
                  handleTest({
                    ...fields,
                    script
                  });
                }}
              >
                测试
              </Button>,
              <Button
                key="ok"
                type='primary'
                onClick={() => {
                  const fields = form.getFieldsValue();
                  handleAdd(fields);
                }}
              >
                确认
              </Button>,
            ];
          },
        }}
      >
        <ProFormText
          hidden={true}
          name="id"
        />
        <ProFormText
          placeholder="请输入接口名称"
          label="接口名称"
          rules={[
            {
              required: true,
              message: "请输入接口名称",
            },
          ]}
          name="name"
        />

        <ProForm.Group>
          <ProFormSelect
            width="md"
            placeholder="请输入请求方式"
            label="请求方式"
            rules={[
              {
                required: true,
                message: "请输入请求方式",
              },
            ]}
            name="method"
            options={[
              {
                label: "GET",
                value: "GET"
              },
              {
                label: "POST",
                value: "POST"
              }
            ]}
          />
          <ProFormText
            label="接口地址"
            width="md"
            rules={[
              {
                required: true,
                message: "请输入接口地址",
              },
            ]}
            placeholder="请输入接口地址"
            name="url" />
        </ProForm.Group>

        <ProForm.Item
          label="接口脚本(Groovy脚本)"
          help={<a onClick={() => setReadmeVisible(true)}>脚本手册</a>}
        >
          <Editor
            height="30vh"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue={form.getFieldValue("script")}
            onMount={handleEditorDidMount}
          />
        </ProForm.Item>

        <ProFormSelect
          placeholder="请输入接口状态"
          label="接口状态"
          rules={[
            {
              required: true,
              message: "请输入接口状态",
            },
          ]}
          name="state"
          options={[
            {
              label: "启用",
              value: 1
            },
            {
              label: "禁用",
              value: 0
            },
          ]}
        />

        <ProFormTextArea
          label="接口说明"
          rules={[
            {
              message: "请输入接口说明",
            },
          ]}
          placeholder="请输入接口说明"
          name="description" />

      </ModalForm>


      <Drawer
        open={readmeVisible}
        destroyOnClose={true}
        title={"校验规则说明"}
        height="100%"
        width="50%"
        placement="right"
        onClose={() => {
          setReadmeVisible(false);
        }}
      >
        <Docs />
      </Drawer>

    </div >
  );
};

