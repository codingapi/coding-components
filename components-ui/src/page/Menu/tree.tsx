import { Tree } from 'antd';
import React, { useEffect, useImperativeHandle, useState, forwardRef } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/es/tree';

const { DirectoryTree } = Tree;
interface MenuPageProps {
  onSelect?: (selectedKeys: React.Key[], info?: any) => void;

  tree():Promise<any>;
}

export const MenuTree = forwardRef((props: MenuPageProps, ref) => {

  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [defaultKeys, setSelectedKeys] = useState<React.Key[]>([1]);

  const refreshTree = () => {
    props.tree().then(res => {
      if (res['success']) {
        const data = res.data;
        const search = (data: any) => {
          data.title = data.name;
          data.key = data.id;
          delete data.icon;
          data.children = data.children || [];
          data.children.forEach((item: any) => {
            search(item);
          });
        }
        search(data);
        setTreeData([data]);
      }
    });
  };


  useEffect(() => {
    refreshTree();
  }, []);


  useImperativeHandle(ref, () => ({
    refresh: refreshTree,
  }));

  const onSelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
      setSelectedKeys(selectedKeys);
      if (props.onSelect) {
        props.onSelect(selectedKeys);
      }
    }
  };

  return (
    <>
      {treeData && treeData.length > 0 && (
        <DirectoryTree
          showIcon
          blockNode
          defaultExpandAll
          autoExpandParent
          defaultExpandParent
          defaultSelectedKeys={defaultKeys}
          selectedKeys={defaultKeys}
          onSelect={onSelect}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
        />
      )}
    </>
  )

});


