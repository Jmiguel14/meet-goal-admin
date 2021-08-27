import { CameraOutlined } from "@ant-design/icons";
import { Form, Modal, Input, FormInstance } from "antd";
import React from "react";
import { NewsFormValues } from "../../../types";
import "./styles.less";

interface UpdateNewsModalProps {
  onSetIsVisibleModal: (value: React.SetStateAction<boolean>) => void;
  onSetImgURL: React.Dispatch<React.SetStateAction<string>>;
  onFinish: (values: NewsFormValues) => Promise<void>;
  onHandleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isVisibleModal: boolean;
  form: FormInstance<any>;
  newsItem: NewsFormValues;
  imgURL: string;
}

export const UpdateNewsModal = ({
  onSetIsVisibleModal,
  onSetImgURL,
  onFinish,
  onHandleImageChange,
  isVisibleModal,
  form,
  newsItem,
  imgURL,
}: UpdateNewsModalProps) => {
  return (
    <Modal
      onOk={() => onSetIsVisibleModal(false)}
      onCancel={() => onSetIsVisibleModal(false)}
      visible={isVisibleModal}
      okButtonProps={{ htmlType: "submit", form: "news_edit_form" }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        id="news_edit_form"
        initialValues={{
          title: newsItem?.title,
          description: newsItem?.description,
        }}
      >
        <div className="image">
          <CameraOutlined className="edit_image_button" />
          <input
            className="file_input"
            type="file"
            onChange={onHandleImageChange}
          />

          <img alt="" className="edit_image" src={imgURL} />
        </div>

        <Form.Item name="title">
          <Input />
        </Form.Item>
        <Form.Item name="description">
          <Input />
        </Form.Item>
        <Form.Item name="source">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
