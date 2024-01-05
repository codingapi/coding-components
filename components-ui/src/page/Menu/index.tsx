import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProCard, ProFormDigit, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { Button, Form, message, Modal, Popconfirm } from 'antd';
import { MyTable } from '../../components/MyTable';
import React, { useRef, useState, useEffect } from 'react';
import { MenuTree } from './tree';
import { MyProFormIcons } from '../../components/MyProFormIcons';
import Icon from '@ant-design/icons';
import * as icons from '@ant-design/icons'

interface MenuPageProps {

    list(params: any, sort?: any, filter?: any): Promise<any>;

    save(params: any): Promise<any>;

    del(params: any): Promise<any>;

    tree(): Promise<any>;

}

export const MenuPage: React.FC<MenuPageProps> = (props) => {

    const actionRef = useRef<ActionType>();
    const [form] = Form.useForm();
    const [parentId, setParentId] = useState<number>(1);
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const [treeData, setTreeData] = useState<any[]>([]);
    const treeRef = useRef();

    const handleAdd = async (fields: any) => {
        const hide = message.loading('正在添加');
        try {
            await props.save(fields);
            hide();
            message.success('保存成功');
            return true;
        } catch (error) {
            hide();
            message.error('保存失败，请重试!');
            return false;
        }
    };

    const reloadTree = () => {
        props.tree().then(res => {
            setTreeData([res.data]);
        })
    }


    const handleDel = async (id: string) => {
        const hide = message.loading('正在删除');
        try {
            await props.del({ id: id });
            hide();
            message.success('删除成功');
            if (actionRef.current) {
                actionRef.current.reload();
                //@ts-ignore
                treeRef.current?.refresh();
                reloadTree();
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
            title: "名称",
            dataIndex: 'name',
        },
        {
            title: "图标",
            dataIndex: 'icon',
            search: false,
            render: (_, record) => {
                if (record.icon === '-') {
                    return '';
                }
                if (record.icon) {
                    //@ts-ignore
                    return <Icon component={icons[record.icon]} />
                } else {
                    return '';
                }
            }
        },
        {
            title: "地址",
            dataIndex: 'path',
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
                        form.setFieldValue('parentId', record.parentId)
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



    useEffect(() => {
        reloadTree();
    }, []);

    useEffect(() => {
        if (actionRef.current) {
            actionRef.current.reload();
        }
    }, [parentId]);

    return (
        <>
            <ProCard gutter={8}>
                <ProCard colSpan="20%">
                    <MenuTree
                        tree={props.tree}
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
                                    form.setFieldValue('parentId', parentId)
                                }}
                            >
                                <PlusOutlined /> 新建
                            </Button>,
                        ]}
                        request={async (params, sort, filter) => {
                            const res = await props.list({
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
                        reloadTree();
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
                    placeholder="请输入菜单地址"
                    label="菜单地址"
                    rules={[
                        {
                            message: "请输入菜单地址",
                        },
                    ]}
                    name="path"
                />
                <MyProFormIcons
                    label="菜单图标"
                    name="icon"
                    placeholder="请输入菜单图标"
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



        </>
    );
};

