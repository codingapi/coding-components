import React from "react";
import { Button, Space } from "antd";

import { TestModel } from '@/domain/test';
import { defaultTestModel } from "@/bean/test";
import { beanFactory } from "coding-components";


const TestPage: React.FC = () => {

  const [data, setData] = React.useState<string>();


  // 获取bean对象，调用loadData方法
  const handleClick = () => {
    const model = beanFactory.getBean(TestModel);
    setData(model.loadData());
  }

  const handleDefault = () => {
    // 重置bean对象
    beanFactory.registerBean(defaultTestModel);
  }

  const handleRegister = () => {
    // 注册bean对象
    beanFactory.registerBean(new class extends TestModel {
      loadData() {
        return "new load data";
      }
    });
  }


  return (
    <>
      <h1>{data}</h1>
      <Space>
        <Button type="primary" onClick={handleClick}>getBean</Button>
        <Button onClick={handleDefault}>resetBean</Button>
        <Button onClick={handleRegister}>registerBean</Button>
      </Space>
    </>
  )

}

export default TestPage;
