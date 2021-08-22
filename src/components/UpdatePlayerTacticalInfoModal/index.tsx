import { CameraOutlined } from "@ant-design/icons";
import { Avatar, Form, FormInstance, Modal, Select, Typography } from "antd";
import React from "react";
import { PLAYER_ATTRIBUTES } from "../../constants/playerAttributes";
import { PLAYER_POSITIONS } from "../../constants/playerPositions";
import { Player } from "../../types";
import "./styles.less";

const { Text } = Typography;

const PLAYER_POSITIONS_OPTIONS = [
  { value: PLAYER_POSITIONS.goalkeeper },
  { value: PLAYER_POSITIONS.leftWingBack },
  { value: PLAYER_POSITIONS.rightWingBack },
  { value: PLAYER_POSITIONS.leftBack },
  { value: PLAYER_POSITIONS.rightBack },
  { value: PLAYER_POSITIONS.centreBack },
  { value: PLAYER_POSITIONS.centralDefensiveMidfielder },
  { value: PLAYER_POSITIONS.centralMidfielder },
  { value: PLAYER_POSITIONS.centralAttakingMidfielder },
  { value: PLAYER_POSITIONS.leftMidfielder },
  { value: PLAYER_POSITIONS.rightMidfielder },
  { value: PLAYER_POSITIONS.outsideLeft },
  { value: PLAYER_POSITIONS.outsideRight },
  { value: PLAYER_POSITIONS.centralStriker },
  { value: PLAYER_POSITIONS.rightStriker },
];

const PLAYER_ATTRIBUTES_OPTIONS = [
  { value: PLAYER_ATTRIBUTES.strength },
  { value: PLAYER_ATTRIBUTES.accurateInputs },
  { value: PLAYER_ATTRIBUTES.captain },
  { value: PLAYER_ATTRIBUTES.marking },
  { value: PLAYER_ATTRIBUTES.rhythm },
  { value: PLAYER_ATTRIBUTES.centers },
  { value: PLAYER_ATTRIBUTES.reaction },
  { value: PLAYER_ATTRIBUTES.destroyer },
  { value: PLAYER_ATTRIBUTES.interceptor },
  { value: PLAYER_ATTRIBUTES.longPasses },
  { value: PLAYER_ATTRIBUTES.allCamper },
  { value: PLAYER_ATTRIBUTES.dribbling },
  { value: PLAYER_ATTRIBUTES.ballControl },
  { value: PLAYER_ATTRIBUTES.longShot },
  { value: PLAYER_ATTRIBUTES.counterAttack },
  { value: PLAYER_ATTRIBUTES.offensive },
  { value: PLAYER_ATTRIBUTES.velocity },
  { value: PLAYER_ATTRIBUTES.agility },
  { value: PLAYER_ATTRIBUTES.shots },
  { value: PLAYER_ATTRIBUTES.ending },
  { value: PLAYER_ATTRIBUTES.reference },
];

interface UpdatePlayerTacticalInfoModalProps {
  setIsVisibleModal: (value: React.SetStateAction<boolean>) => void;
  form: FormInstance<any>;
  isVisibleModal: boolean;
  coverURL: string;
  avatarURL: string;
  onFinish: (values: Player) => Promise<void>;
  onHandleCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UpdatePlayerTacticalInfoModal = ({
  setIsVisibleModal,
  form,
  isVisibleModal,
  coverURL,
  avatarURL,
  onFinish,
  onHandleCoverChange,
  onHandleAvatarChange,
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
        form: "player_tactical_info_edit_form",
      }}
    >
      <Form form={form} onFinish={onFinish} id="player_tactical_info_edit_form">
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
          <Select options={PLAYER_POSITIONS_OPTIONS}></Select>
        </Form.Item>
        <Form.Item name="possec" label="Posición secundaria">
          <Select options={PLAYER_POSITIONS_OPTIONS}></Select>
        </Form.Item>
        <Text style={{ fontWeight: "bold" }}>Atributos</Text>
        <Form.Item name="attributes">
          <Select mode="tags" options={PLAYER_ATTRIBUTES_OPTIONS}></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
