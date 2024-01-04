import { Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import { DownOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/es/tree';
import { tree } from '@/services/api/menu';

interface MenuPageProps{
  onSelect?: (selectedKeys: React.Key[], info?: any) => void;
}

const MenuTree: React.FC<MenuPageProps> = (props) => {

  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [defaultKeys, setSelectedKeys] = useState<React.Key[]>([1]);

  const refreshTree = () => {
    tree().then(res => {
      if (res['success']) {
        const data = res.data;
        const search = (data: any) => {
          data.title = data.name;
          data.key = data.id;
          data.icon = data.type === 'COMPANY' ? <HomeOutlined /> : <TeamOutlined />;
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


  const onSelect = (selectedKeys: React.Key[]) => {
    setSelectedKeys(selectedKeys);
    if (props.onSelect) {
      props.onSelect(selectedKeys);
    }
  };

  return (
    <>
      {treeData && treeData.length > 0 && (
        <Tree
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

}


export default MenuTree
