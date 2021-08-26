import { DatePicker, Form, FormInstance, Input, Modal } from "antd";
import React from "react";
import { CallData } from "../../types";

interface UpdateCallInfoModalProps {
  setIsVisibleModal: (value: React.SetStateAction<boolean>) => void;
  isVisibleModal: boolean;
  form: FormInstance<any>;
  onFinish: (values: CallData) => Promise<void>;
}

export const UpdateCallInfoModal = ({
  setIsVisibleModal,
  isVisibleModal,
  form,
  onFinish,
}: UpdateCallInfoModalProps) => {
  return (
    <Modal
      bodyStyle={{ height: "100%" }}
      onCancel={() => {
        setIsVisibleModal(false);
        form.resetFields();
      }}
      visible={isVisibleModal}
      okButtonProps={{
        htmlType: "submit",
        form: "call_info_edit_form",
      }}
    >
      <br />
      <Form form={form} onFinish={onFinish} id="call_info_edit_form">
        <Form.Item
          name="extraDetails"
          label="Detalles extras"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese los detalles",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Fecha de Inicio"
          rules={[
            {
              required: true,
              message: "Por favor, la fecha de inicio",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="Fecha de Inicio"
          rules={[
            {
              required: true,
              message: "Por favor, la fecha final",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};
