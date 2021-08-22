import { DatePicker, Form, FormInstance, Input, Modal } from "antd";
import React from "react";
import { Player } from "../../types";

interface UpdatePlayerTacticalInfoModalProps {
  setIsVisibleModal: (value: React.SetStateAction<boolean>) => void;
  isVisibleModal: boolean;
  form: FormInstance<any>
  onFinish: (values: Player) => Promise<void>;
}

export const UpdatePlayerPersonalInfoModal = ({
  setIsVisibleModal,
  isVisibleModal,
  form,
  onFinish
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
              message: "Por favor, ingrese la posición principal!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Teléfono">
          <Input />
        </Form.Item>
        <Form.Item name="city" label='Ciudad'>
          <Input />
        </Form.Item>
        <Form.Item name="country" label='País'>
          <Input />
        </Form.Item>
        <Form.Item name="birth" label='Fecha de Nac.'>
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};
