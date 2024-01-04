import { connect, useSelector } from "@umijs/max";
import { Button, Space } from "antd";
import React from "react";
import {Test} from '@/domain/test';


const TestPage: React.FC<any> = (props: any) => {

    const handleAdd = () => {
        props.dispatch({ type: 'test/test', payload: { "name": "test" } })
    }

    const handleClear = () => {
        props.dispatch({ type: 'test/clear' })
    }

    const test = useSelector((state: any) => {
        return new Test(state.test.count);
    });

    const handleCount = () => {
        alert(test.hasCount());
    }


    return (
        <div>
            <h1>Test1</h1>
            <h1>{test.count}</h1>
            <Space>
                <Button onClick={handleAdd}>Add</Button>
                <Button onClick={handleClear}>Clear</Button>
                <Button onClick={handleCount}>hasCount</Button>
            </Space>
        </div>
    )
}



export default connect(({ dva }: any) => ({ dva }))(TestPage)