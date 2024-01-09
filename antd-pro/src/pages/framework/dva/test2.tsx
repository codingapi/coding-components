import { connect, useSelector } from "@umijs/max";
import { Button } from "antd";
import React from "react";



const TestPage: React.FC<any> = (props: any) => {

  const handleAdd = () => {
    props.dispatch({ type: 'test/test', payload: { "name": "test" } })
  }

  const { count } = useSelector((state: any) => {
    return state.test;
  });

  return (
    <div>
      <h1>Test2</h1>
      <h1>{count}</h1>
      <Button onClick={handleAdd}>Add</Button>
    </div>
  )
}



export default connect(({ dva }: any) => ({ dva }))(TestPage)
