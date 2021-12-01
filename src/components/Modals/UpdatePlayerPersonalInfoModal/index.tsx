import { DatePicker, Form, FormInstance, Input, Modal } from "antd";
import React from "react";
import { PlayerPersonalInfo } from "../../../types";

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
        <br />
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese un nombre",
            },
            {
              pattern: /^[A-Za-z0-9!@#$%_\-^&*]+/,
              message: "Entrada no válida",
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
            {
              pattern: /^\d+$/,
              message: "Número no válido",
            },
            {
              max: 12,
              message: "Número no válido",
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
            {
              pattern: /^[A-Za-z0-9!@#$%_\-^&*]+/,
              message: "Entrada no válida",
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
            {
              pattern: /^[A-Za-z0-9!@#$%_\-^&*]+/,
              message: "Entrada no válida",
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
        <Form.Item
          name="category"
          label="Categoría"
          rules={[
            {
              pattern: /^[A-Za-z0-9!@#$%_\-^&*]+/,
              message: "Entrada no válida",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contract"
          label="Contrato"
          rules={[
            {
              pattern: /^[A-Za-z0-9!@#$%_\-^&*]+/,
              message: "Entrada no válida",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
