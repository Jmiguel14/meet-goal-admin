import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Col, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Player } from "../../types";
import "./styles.less";

const { Meta } = Card;

interface ListOfNewsProps {
  players: Player[];
}

export const ListOfPlayers = ({ players }: ListOfNewsProps) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    players?.length === 0 ? setLoading(true) : setLoading(false);
  }, [players]);

  return (
    <div>
      <Row gutter={[16, 16]} >
        {players.map((player: Player, index: number) => {
          return (
            <Col md={{ span: "6" }} xs={{ span: "24" }} key={index}>
              <Card
                className="card"
                key={index}
                cover={
                  loading ? (
                    <Skeleton.Image className="img_skeleton" />
                  ) : (
                    <img alt="" className="card_image" src={player.avatarURL} />
                  )
                }
                actions={[
                  <DeleteOutlined
                    key="delete"
                    //onClick={() => onShowDeleteConfirm(newsItem.id!)}
                  />,
                  <Link to={`/jugadores/${player.id}`}>
                    <EyeOutlined key="watch" />,
                  </Link>,
                ]}
              >
                <Skeleton loading={loading} active>
                  <Meta title={player.name} description={player.email} />
                </Skeleton>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
