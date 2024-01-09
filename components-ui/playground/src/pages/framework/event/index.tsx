import { events } from "coding-components"
import { Button } from "antd";
import React, { useEffect } from "react"

const TestPage: React.FC = () => {

  const [data, setData] = React.useState<any>();

  const eventAction = 'test';

  const handleClick = () => {
    events.emit(eventAction, 'event data');
  }

  useEffect(() => {
    events.on(eventAction, (data: any) => {
      setData(data)
    });

    return () => {
      events.off(eventAction);
    }
  }, [])

  return (
    <>
      <h1>监听:{data}</h1>
      <Button onClick={handleClick}>发送事件</Button>
    </>
  )

}

export default TestPage;
