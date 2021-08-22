import { Form, Input, Modal } from "antd";
import React from "react";
import { Player } from "../../types";

interface UpdatePlayerTacticalInfoModalProps {
  setIsVisibleModal: (value: React.SetStateAction<boolean>) => void;
  isVisibleModal: boolean;
}

export const UpdatePlayerPersonalInfo = ({
  setIsVisibleModal,
  isVisibleModal,
}: UpdatePlayerTacticalInfoModalProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: Player) => {
      
  };

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
        form: "player_tactical_info_edit_form",
      }}
    >
      <Form form={form} onFinish={onFinish} id="player_tactical_info_edit_form">
        <Form.Item
          name="pospri"
          label="Posición principal"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese la posición principal!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="possec" label="Posición secundaria">
          <Input />
        </Form.Item>
        <Form.Item name="attributes">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
