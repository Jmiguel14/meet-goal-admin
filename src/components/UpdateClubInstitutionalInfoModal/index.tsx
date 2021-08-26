import { DatePicker, Form, FormInstance, Input, Modal } from "antd";
import React from "react";
import { ClubInstitutionalInfo } from "../../types";

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
        <Form.Item name="socialName" label="Razón social">
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
