import { Form, FormInstance, Input, Modal } from "antd";
import React from "react";
import { PlayerInjury } from "../../../types";

interface UpdatePlayerInjuryModalProps {
  setIsVisiblePlayerInjuryModal: (value: React.SetStateAction<boolean>) => void;
  form: FormInstance<any>;
  isVisiblePlayerInjuryModal: boolean;
  onFinishPlayerInjuryForm: (values: PlayerInjury) => Promise<void>;
}

export const UpdatePlayerInjuryModal = ({
  setIsVisiblePlayerInjuryModal,
  form,
  isVisiblePlayerInjuryModal,
  onFinishPlayerInjuryForm,
}: UpdatePlayerInjuryModalProps) => {
  return (
    <Modal
      bodyStyle={{ height: "100%" }}
      onCancel={() => {
        setIsVisiblePlayerInjuryModal(false);
        form.resetFields();
      }}
      visible={isVisiblePlayerInjuryModal}
      okButtonProps={{
        htmlType: "submit",
        form: "player_injury_edit_form",
      }}
    >
      <Form
        form={form}
        onFinish={onFinishPlayerInjuryForm}
        id="player_injury_edit_form"
      >
        <Form.Item
          name="injuryName"
          label="Nombre de lesión"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el nombre de la lesión",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="recoveryTime"
          label="Tiempo de recuperación"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el tiempo de recuperación",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="surgery"
          label="Cirugía"
          rules={[
            {
              required: true,
              message: "Por favor, marque si hubo cirugía",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
