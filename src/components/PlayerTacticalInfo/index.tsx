import { EditOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Tag, Typography } from "antd";
import { Player } from "../../types";
import "./styles.less";

interface PlayerTacticalInfoProps {
  player: Player | undefined;
  playerAttributes: (string | undefined)[] | undefined;
  onShowModal: () => void;
}

const { Text } = Typography;
const { Meta } = Card;

export const PlayerTacticalInfo = ({
  player,
  onShowModal,
  playerAttributes,
}: PlayerTacticalInfoProps) => {
  return (
    <Row justify="center">
      <Col className="photo_and_position" md={24} sm={24} xs={24}>
        <Card
          hoverable
          className="player_photo_card"
          actions={[<EditOutlined onClick={onShowModal} />]}
          cover={<img alt="" src={player?.coverURL} />}
        >
          <Meta
            avatar={<Avatar src={player?.avatarURL} />}
            title={`${player?.pospri} y ${player?.possec}`}
            description={
              <>
                <Text>Atributos</Text>
                <br />
                <Row>
                  {playerAttributes?.map((attribute, index) => {
                    return (
                      <Col md={12} xs={12} key={index}>
                        <Tag
                          key={index}
                          style={{ margin: "5px 5px", color: "#315C79" }}
                        >
                          {attribute}
                        </Tag>
                      </Col>
                    );
                  })}
                </Row>
              </>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};
