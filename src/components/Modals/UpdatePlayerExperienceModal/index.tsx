import { Form, FormInstance, Input, Modal } from "antd";
import React from "react";
import { PlayerExperience } from "../../../types";

interface UpdatePlayerExperienceModalProps {
  setIsVisiblePlayerExperienceModal: (
    value: React.SetStateAction<boolean>
  ) => void;
  form: FormInstance<any>;
  isVisiblePlayerExperienceModal: boolean;
  onFinishPlayerExperinceForm: (values: PlayerExperience) => Promise<void>;
}

export const UpdatePlayerExperienceModal = ({
  setIsVisiblePlayerExperienceModal,
  form,
  isVisiblePlayerExperienceModal,
  onFinishPlayerExperinceForm,
}: UpdatePlayerExperienceModalProps) => {
  return (
    <Modal
      bodyStyle={{ height: "100%" }}
      onCancel={() => {
        setIsVisiblePlayerExperienceModal(false);
        form.resetFields();
      }}
      visible={isVisiblePlayerExperienceModal}
      okButtonProps={{
        htmlType: "submit",
        form: "player_experience_edit_form",
      }}
    >
      <Form
        form={form}
        onFinish={onFinishPlayerExperinceForm}
        id="player_experience_edit_form"
      >
        <br />
        <Form.Item
          name="clubName"
          label="Nombre de club"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el nombre de club",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="countryClub"
          label="País del club"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el país del club",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="season"
          label="Temporada"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese la temporada",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="A"
          label="Total de asistencias"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese total de asistencias",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="G"
          label="Total de goles"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el total de goles",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="PJ"
          label="Partidos jugados"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese los partidos jugados",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="TA"
          label="Total de tarjetas amarillas"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el total de tarjetas amarillas",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="TR"
          label="Total de tarjetas rojas"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el total de tarjetas rojas",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="catTournament"
          label="Nivel de competencia"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el nivel de competencia",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="subPlayer"
          label="Categoría del jugador"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese la categoría del jugador",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
