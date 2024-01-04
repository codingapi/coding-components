---
toc: content
nav: 前端Framework  
group:
  title: 框架
  order: 1
title: EventBus
order: 2
---

# 介绍
EventBus是前端的组件，提供对当前活动状态下的监听控制。  

由于框架依赖了umi@max，因此可以使用基于redux的dva库。EventBus区别于dva的地方在于，EventBus只是对事件的封装，并没有与react组件的生命周期向结合。如果需要在跨组件之间的数据传递的话，建议采用dva组件。


## 实例代码
```ts
import { events } from "coding-components"
import { Button } from "antd";
import React, { useEffect } from "react"

const EventPage: React.FC = () => {

    const [data, setData] = React.useState<any>();

    const handleClick = () => {
        // 触发事件
        events.emit('test', 'test');
    }

    useEffect(() => {
        // 监听事件
        events.on('test', (data: any) => {
            setData(data)
        });

        return () => {
            events.off('test');
        }
    }, [])

    return (
        <>
            <h1>listen:{data}</h1>
            <Button onClick={handleClick}>emit</Button>
        </>
    )

}

export default EventPage;
```
