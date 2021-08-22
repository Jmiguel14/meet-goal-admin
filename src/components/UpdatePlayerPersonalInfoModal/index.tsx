import { DatePicker, Form, FormInstance, Input, Modal } from "antd";
import React from "react";
import { PlayerPersonalInfo } from "../../types";

interface UpdatePlayerTacticalInfoModalProps {
  setIsVisibleModal: (value: React.SetStateAction<boolean>) => void;
  isVisibleModal: boolean;
  form: FormInstance<any>;
  onFinish: (values: PlayerPersonalInfo) => Promise<void>;
}

export const UpdatePlayerPersonalInfoModal = ({
  setIsVisibleModal,
  isVisibleModal,
  form,
  onFinish,
}: UpdatePlayerTacticalInfoModalProps) => {
  return (
    <Modal
      bodyStyle={{ height: "100%" }}
      onOk={() => setIsVisibleModal(false)}
      onCancel={() => {
        setIsVisibleModal(false);
        form.resetFields();
      }}
      visible={isVisibleModal}
      okButtonProps={{
        htmlType: "submit",
        form: "player_personal_info_edit_form",
      }}
    >
      <Form form={form} onFinish={onFinish} id="player_personal_info_edit_form">
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese un nombre",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Teléfono"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el teléfono",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="Ciudad"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese la ciudad",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label="País"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el país",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="birth"
          label="Fecha de Nacimiento"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese la fecha de nacimiento",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name="category" label="Categoría">
          <Input />
        </Form.Item>
        <Form.Item name="contract" label="Contrato">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
