---
toc: content
nav: UI组件
group:
  title: 组件
  order: 1
title: MyAvatar
order: 1
---

# 介绍

MyAvatar是基于antd的Upload封装的文件上传组件

## 示例


```ts
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
                        maxLength={2}
                        defaultValue={form.getFieldValue('avatar')}
                        onFileChange={(fileList) => {
                            // 当文件上传以后的回调事件
                            form.setFieldValue('avatar', fileList[0]);
                        }}
                        upload={(file) => {
                            // 文件上传的接口调用，这里是默认调用的。
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

## 接口说明


当引入了oss服务以后，文件上传的upload函数直接换成文件上传接口

```ts
import React from "react";
import { Form } from "antd";
import { MyAvatar } from "coding-components";
import { upload } from "@/services/api/oss";


const TestPage: React.FC = () => {

    const [form] = Form.useForm();

    return (
        <>
            <h1>头像上传测试</h1>
            <Form>
                <Form.Item name="avatar">
                    <MyAvatar
                        maxLength={1}
                        defaultValue={form.getFieldValue('avatar')}
                        onFileChange={(fileList) => {
                            form.setFieldValue('avatar', fileList[0]);
                        }}
                        upload={upload}
                    />
                </Form.Item>
            </Form>
        </>
    )

}

export default TestPage;

```

upload接口
```ts
import {request} from '@umijs/max';

export async function upload(file: File) {
  const formData = new FormData();
  formData.append('files', file);

  return request<API.Response<any>>('/api/oss/upload', {
    method: 'POST',
    data: formData,
  });
}

```
