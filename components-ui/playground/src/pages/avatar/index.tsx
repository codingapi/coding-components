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