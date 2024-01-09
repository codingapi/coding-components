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
