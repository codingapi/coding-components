# Coding-Components

## Framework

* BeanFactory 
```
import { beanFactory } from "coding-components";


const handleClick = () => {
    const model = beanFactory.getBean(TestModel);
}

const handleRegister = () => {
    beanFactory.registerBean(new class extends TestModel {
        loadData() {
            return "registerBean";
        }
    });
}

```

* EventBus
```
import {events} from "coding-components"
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
```

## Components

* MyTable
```
import React from "react";
import { MyTable } from "coding-components";
const TestPage: React.FC =  () => {

  const columns = [
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'age',
    }
  ]

  return (
    <div>
      <MyTable
        columns={columns}
      />
    </div>
  );
}


export default TestPage;

```



* MyAvatar
```
import React from "react";
import { Form } from "antd";
import { MyAvatar } from "coding-components";


const TestPage: React.FC = () => {

    const [form] = Form.useForm();

    return (
        <>
            <h1>avatar</h1>
            <Form>
                <Form.Item name="avatar">
                    <MyAvatar
                        maxLength={1}
                        defaultValue={form.getFieldValue('avatar')}
                        onFileChange={(fileList) => {
                            form.setFieldValue('avatar', fileList[0]);
                        }}
                        upload={(file) => {
                            return new Promise((resolve) => {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    resolve({
                                        data: reader.result as string,
                                        success: true,
                                    });
                                };
                            });
                        }}
                    />
                </Form.Item>
            </Form>
        </>
    )

}

export default TestPage;

```


ApiPage
```

import { list, save, del, test } from '@/services/api/api';
import { ApiPage } from 'coding-components';
import { PageContainer } from '@ant-design/pro-components';

const MyPage = () =>{
  return (
    <PageContainer>

      <ApiPage
        list={list}
        save={save}
        del={del}
        test={test}
      />
    </PageContainer >
  );
};

export default MyPage;



//api
// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';


export async function list(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response<any>>('/api/mvc/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function test(body: any, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/mvc/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function save(body: any, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/mvc/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function del(body: {
  id:string,
}, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/mvc/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

```