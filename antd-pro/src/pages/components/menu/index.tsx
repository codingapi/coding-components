import { list, save, del, tree } from '@/services/api/menu';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProCard, ProFormDigit, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { Button, Form, message, Popconfirm } from 'antd';
import { MyTable } from 'coding-components';
import React, { useRef, useState, useEffect } from 'react';
import MenuTree from './tree';

const MenuPage: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [parentId, setParentId] = useState<number>(1);
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [treeData, setTreeData] = useState<any[]>([]);
  const treeRef = useRef();

  const handleAdd = async (fields: any) => {
    const hide = message.loading('正在添加');
    try {
      await save(fields);
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
      await del({ id: id });
      hide();
      message.success('删除成功');
      if (actionRef.current) {
        actionRef.current.reload();
        //@ts-ignore
        treeRef.current?.refresh();
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
      title: "名称",
      dataIndex: 'name',
    },
    {
      title: "图标",
      dataIndex: 'icon',
      search: false,
    },
    {
      title: "编码",
      dataIndex: 'code',
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

  const reloadTree = () => {
    tree().then(res => {
      setTreeData([res.data]);
    })
  }

  useEffect(() => {
    reloadTree();
  }, []);

  useEffect(() => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }, [parentId]);

  return (
    <PageContainer>
      <ProCard gutter={8}>
        <ProCard colSpan="20%">
          <MenuTree
            ref={treeRef}
            onSelect={(selectedKeys) => {
              setParentId(Number(selectedKeys[0]));
            }}
          />
        </ProCard>
        <ProCard>
          <MyTable
            headerTitle="菜单列表"
            actionRef={actionRef}
            rowKey="id"
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
              const res = await list({
                ...params,
                "parent.id": parentId
              });
              return {
                data: res.data.list,
                success: res.success,
                total: res.data.total
              };
            }
            }
            columns={columns}
          />
        </ProCard>
      </ProCard>


      <ModalForm
        title="新建菜单"
        form={form}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            form.resetFields();
          },
        }}
        initialValues={{
          "parentId": parentId,
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
            //@ts-ignore
            treeRef.current?.refresh();
          }
        }
        }
      >
        <ProFormText
          hidden={true}
          name="id"
        />

        <ProFormText
          hidden={true}
          name="parentId"
        />

        <ProFormTreeSelect
          name="parentId"
          label="父级菜单"
          request={() => {
            const id = form.getFieldValue('id');
            const fetchTree = (root: any, list: any) => {
              return list.map((item: any) => {
                const disable = root ? root : item.id === id;
                return {
                  label: item.name,
                  value: item.id,
                  disabled: disable,
                  children: item.children ? fetchTree(disable, item.children) : []
                }
              });
            }
            return fetchTree(null, treeData);
          }}
          fieldProps={
            {
              onChange: (value) => {
                form.setFieldValue('typeId', value);
              },
              showArrow: false,
              filterTreeNode: true,
              showSearch: true,
              multiple: false,
              treeDefaultExpandAll: true,
            }
          }
        />

        <ProFormText
          placeholder="请输入菜单名称"
          label="菜单名称"
          rules={[
            {
              required: true,
              message: "请输入菜单名称",
            },
          ]}
          name="name"
        />
        <ProFormText
          placeholder="请输入菜单编码"
          label="菜单编码"
          rules={[
            {
              required: true,
              message: "请输入菜单编码",
            },
          ]}
          name="code"
        />
        <ProFormText
          placeholder="请输入菜单图标"
          label="菜单图标"
          rules={[
            {
              required: true,
              message: "请输入菜单图标",
            },
          ]}
          name="icon"
        />
        <ProFormDigit
          min={0}
          fieldProps={
            {
              precision: 0
            }
          }
          placeholder="请输入菜单排序"
          label="菜单排序"
          rules={[
            {
              required: true,
              message: "请输入菜单排序",
            },
          ]}
          name="sort"
        />
      </ModalForm>

    </PageContainer>
  );
};

export default MenuPage;
