import React from 'react'
import Icon from '@ant-design/icons'
import * as icons from '@ant-design/icons'
import { ProFormSelect, ProFormSelectProps } from '@ant-design/pro-components'

export interface IconSelectProps extends ProFormSelectProps {
  placeholder?: string
}
const IconSelect: React.FC<IconSelectProps> = (props) => {
  const iconList = Object.keys(icons).filter((item) => typeof icons[item] === 'object')
  const options = iconList.map(item => {
    return {
      label: (
        <>
          <Icon component={icons[item]} style={{ marginRight: '8px' }} /> {item}
        </>
      ),
      value: item
    }
  });

  return (
    <ProFormSelect
      {
      ...props
      }
      showSearch
      allowClear
      options={options}
    >
    </ProFormSelect>
  )
}

export default IconSelect
