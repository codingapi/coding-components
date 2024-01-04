import React, { useEffect } from "react";
import { Button, Space } from "antd";

import { TestModel } from '@/domain/test';
import { testModel } from "@/bean/test";
import { beanFactory } from "coding-components";


const TestPage: React.FC = () => {

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

export default TestPage;