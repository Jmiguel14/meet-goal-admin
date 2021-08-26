import { CameraOutlined } from "@ant-design/icons";
import { Avatar, Form, FormInstance, Input, Modal } from "antd";
import React from "react";
import { Club } from "../../types";
import "./styles.less";

interface UpdateClubSportsAchievementsModalProps {
  setIsVisibleModal: (value: React.SetStateAction<boolean>) => void;
  form: FormInstance<any>;
  isVisibleModal: boolean;
  coverURL: string;
  avatarURL: string;
  onFinish: (values: Club) => Promise<void>;
  onHandleCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UpdateClubSportsAchievementsModal = ({
  setIsVisibleModal,
  form,
  isVisibleModal,
  coverURL,
  avatarURL,
  onFinish,
  onHandleCoverChange,
  onHandleAvatarChange,
}: UpdateClubSportsAchievementsModalProps) => {
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
        form: "club_sports_achievements_edit_form",
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        id="club_sports_achievements_edit_form"
      >
        <div className="image">
          <CameraOutlined className="edit_image_button" />
          <input
            className="file_input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={onHandleCoverChange}
          />

          <img alt="" className="edit_image" src={coverURL} />
          <figure className="edit_avatar">
            <Avatar className="edit_avatar_content" src={avatarURL} />
          </figure>
          <div className="edit_avatar_button">
            <input
              className="file_input_avatar"
              type="file"
              accept="image/png, image/jpeg"
              onChange={onHandleAvatarChange}
            />
            <CameraOutlined />
          </div>
        </div>

        <Form.Item name="totalWins" label="Cantidad de logros obtenidos">
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="maxIntGoal"
          label="Máximo logro internacional"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el máximo logro internacional",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="maxNacGoal"
          label="Máximo logro nacional"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el máximo logro nacional",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
