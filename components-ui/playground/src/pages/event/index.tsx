import { events } from "coding-components"
import { Button } from "antd";
import React, { useEffect } from "react"

const TestPage: React.FC = () => {

    const [data, setData] = React.useState<any>();

    const handleClick = () => {
        events.emit('test', 'test');
    }

    useEffect(() => {
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

export default TestPage;