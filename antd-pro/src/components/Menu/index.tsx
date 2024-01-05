import React from 'react';
import { menus } from '@/services/api/account';

interface MenuProps {
  icon: string
}

const Menus: React.FC<MenuProps> = (props) => {
  return (
    <img src={props.icon} style={{
      width: '20px'
    }} />
  )
}

export async function loadLayoutMenus() {
  const response = await menus();
  if (response.success) {
    let childrens = response.data.children;
    if (childrens === null) {
      return [];
    }
    const search = (data: any) => {
      data.icon = <Menus icon={data.icon} />;
      data.children = data.children || [];
      data.children.forEach((item: any) => {
        search(item);
      });
      return data;
    }
    childrens = childrens.map(item => search(item));
    return childrens;
  } else {
    return [];
  }
}
