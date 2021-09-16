import { CameraOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Form, Modal, Input, FormInstance, Collapse, Alert } from "antd";
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
  const { Panel } = Collapse;
  return (
    <Modal
      onOk={() => onSetIsVisibleModal(false)}
      onCancel={() => onSetIsVisibleModal(false)}
      visible={isVisibleModal}
      okButtonProps={{ htmlType: "submit", form: "news_edit_form" }}
    >
      <br />
      <Form
        form={form}
        onFinish={onFinish}
        id="news_edit_form"
        initialValues={{
          title: newsItem?.title,
          description: newsItem?.description,
        }}
      >
        <Collapse
          defaultActiveKey={1}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel
            className="edit-section-title"
            header="Editar los detalles de la noticia"
            key="1"
          >
            <Form.Item name="title" label="Título de la noticia">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Descripción de la noticia">
              <Input />
            </Form.Item>
            <Form.Item name="source" label="Fuente de la noticia">
              <Input />
            </Form.Item>
          </Panel>
          <Panel
            className="edit-section-title"
            header="Editar la foto de la noticia"
            key="2"
          >
            <Alert
              message="La imagen se cambia automáticamente"
              type="warning"
              showIcon
            />
            <div className="image">
              <CameraOutlined className="edit_image_button" />
              <input
                className="file_input"
                type="file"
                onChange={onHandleImageChange}
              />

              <img alt="" className="edit_image" src={imgURL} />
            </div>
          </Panel>
        </Collapse>
      </Form>
    </Modal>
  );
};
