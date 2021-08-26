import { EditOutlined } from "@ant-design/icons";
import { Card, Col, Descriptions, Row } from "antd";
import moment from "moment";
import { Player } from "../../types";
import "./styles.less";

interface PlayerPersonalInfoProps {
  player: Player | undefined;
  onShowModal: () => void;
}

export const PlayerPersonalnfo = ({
  player,
  onShowModal,
}: PlayerPersonalInfoProps) => {
  return (
    <Row justify="center">
      <Col>
        <Card
          className="player_info_card"
          actions={[<EditOutlined onClick={onShowModal} />]}
        >
          <Descriptions title="Información personal">
            <Descriptions.Item
              label="Correo"
              labelStyle={{ fontWeight: "bold" }}
            >
              {player?.email}
            </Descriptions.Item>
            <Descriptions.Item
              label="Teléfono"
              labelStyle={{ fontWeight: "bold" }}
            >
              {player?.phone}
            </Descriptions.Item>
            <Descriptions.Item
              label="Ciudad/País"
              labelStyle={{ fontWeight: "bold" }}
            >
              {player?.city + ", " + player?.country}
            </Descriptions.Item>
            <Descriptions.Item
              label="Nacimiento"
              labelStyle={{ fontWeight: "bold" }}
            >
              {moment(player?.birth).format("DD-MM-YYYY")}
            </Descriptions.Item>
            <Descriptions.Item
              label="Categoría"
              labelStyle={{ fontWeight: "bold" }}
            >
              {player?.category}
            </Descriptions.Item>
            <Descriptions.Item
              label="Contrato"
              labelStyle={{ fontWeight: "bold" }}
            >
              {player?.contract}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
};
