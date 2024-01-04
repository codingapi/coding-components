---
toc: content
nav: 前端Framework  
group:
  title: 框架
  order: 1
title: BeanFactory
order: 1
---

# 介绍

  BeanFactory类似于java中sprinboot的bean管理，提供全局的bean管理，可以通过类型获取bean实例。    

```ts
import { beanFactory } from "coding-components";
```   

beanFactory是全局单例的一个对象，通过map来实现对bean的管理。

提供的函数如下：  

* getBean
```ts
//通过类型获取实例对象
const mode = beanFactory.getBean(TestModel);
```
* registerBean
```ts
//通过registerBean对象注册bean到beanFactory
beanFactory.registerBean(new class extends TestModel {
    loadData() {
        return "registerBean";
    }
});
```

##  实例代码

### page.tsx
```ts
import React, { useEffect } from "react";
import { Button, Space } from "antd";

import { TestModel } from '@/domain/test';
import { testModel } from "@/bean/test";
import { beanFactory } from "coding-components";


const BeanPage: React.FC = () => {

    const [data, setData] = React.useState<string>();


    const handleClick = () => {
        const model = beanFactory.getBean(TestModel);
        setData(model.loadData());
    }

    const handleDefault = () => {
        beanFactory.registerBean(testModel);
        handleClick();
    }

    const handleRegister = () => {
        beanFactory.registerBean(new class extends TestModel {
            loadData() {
                return "registerBean";
            }
        });
        handleClick();
    }


    useEffect(() => {
        handleClick();
    }, []);

    return (
        <>
            <h1>{data}</h1>
            <Space>
                <Button onClick={handleDefault}>defaultBean</Button>
                <Button onClick={handleRegister}>registerBean</Button>
                <Button onClick={handleClick}>getBean</Button>
            </Space>

        </>
    )

}


export default BeanPage;
```

### @/domain/test.ts
```ts
import { Bean } from "coding-components";
export abstract class TestModel implements Bean{
  beanName:string = "TestModel";

  public abstract loadData():string;
}

```

### @/bean/test.ts
```ts

import { TestModel } from "@/domain/test";


//todo 这个地方最好可以实现全局任何地方都可以注册bean
export const testModel = new class extends TestModel{
    beanName: string = "TestModel";
    loadData(): string {
        return "defaultData";
    }
}


```
