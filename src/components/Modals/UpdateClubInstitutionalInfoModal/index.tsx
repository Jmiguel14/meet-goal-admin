import { DatePicker, Form, FormInstance, Input, Modal } from "antd";
import React from "react";
import { ClubInstitutionalInfo } from "../../../types";

interface UpdateClubInstitutionalInfoModalProps {
  setIsVisibleModal: (value: React.SetStateAction<boolean>) => void;
  isVisibleModal: boolean;
  form: FormInstance<any>;
  onFinish: (values: ClubInstitutionalInfo) => Promise<void>;
}

export const UpdateClubInstitutionalInfoModal = ({
  setIsVisibleModal,
  isVisibleModal,
  form,
  onFinish,
}: UpdateClubInstitutionalInfoModalProps) => {
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
        form: "club_institutional_info_edit_form",
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        id="club_institutional_info_edit_form"
      >
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
          name="socialName"
          label="Razón social"
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
              message: "Longitud del número incorrecta",
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
          name="foundation"
          label="Fecha de fundación"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese la fecha de fundación",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        {/* <Form.ErrorList errors={errors}></Form.ErrorList> */}
      </Form>
    </Modal>
  );
};
