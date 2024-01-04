import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, UploadFile, UploadProps } from "antd";
import React, { useEffect, useState } from "react";
import { UrlUtils } from "../../framework/UrlUtils";

export interface MyAvatarProps {
  maxLength?: number;
  defaultValue?: string;
  onFileChange?: (fileList: string[]) => void;
  upload: (file: File) => Promise<{
    data: string;
    success: boolean;
  }>;
}

export const MyAvatar: React.FC<MyAvatarProps> = (props) => {

  const maxLength = props.maxLength || 1;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    if (props.defaultValue) {
      const defaultImage = props.defaultValue;
      if (fileList.length === 0) {
        setFileList([{
          uid: '-1',
          name: UrlUtils.getFilenameFromUrl(defaultImage),
          status: 'done',
          url: defaultImage,
          response: defaultImage,
        }]);
      }
    }
  }, [props.defaultValue])

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.response);
    const type = UrlUtils.getFileTypeFromUrl(file.response);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
    if (fileList.length > 0) {
      setFileList(fileList);
      if (props.onFileChange) {
        props.onFileChange(fileList.map(item => item.response));
      }
    }
  }

  const handleRemove: UploadProps['onRemove'] = (file) => {
    setFileList(fileList.filter(item => item.uid !== file.uid));
    if (props.onFileChange) {
      props.onFileChange(fileList.filter(item => item.uid !== file.uid).map(item => item.response));
    }
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        customRequest={async (res) => {
          // @ts-ignore
          const result = await props.upload(res.file);
          // @ts-ignore
          res.onSuccess(result.data);
        }}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= maxLength ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img alt="image" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
