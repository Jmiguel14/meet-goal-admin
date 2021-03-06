import { EyeOutlined } from "@ant-design/icons";
import { Card, Col, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Player } from "../../types";
import "./styles.less";

const { Meta } = Card;

interface ListOfPlayersProps {
  players: Player[];
}

export const ListOfPlayers = ({ players }: ListOfPlayersProps) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    players?.length === 0 ? setLoading(true) : setLoading(false);
  }, [players]);

  return (
    <div className="list_of_players">
      <Row
        gutter={[16, 16]}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {players.map((player: Player, index: number) => {
          return (
            <Col
              md={{ span: "6" }}
              xs={{ span: "24" }}
              key={index}
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Card
                className="players_card"
                key={index}
                cover={
                  loading ? (
                    <Skeleton.Image className="img_skeleton" />
                  ) : (
                    <img alt="" className="card_image" src={player.avatarURL} />
                  )
                }
                actions={[
                  <Link to={`/jugadores/${player.id}`}>
                    <EyeOutlined key="watch" />,
                  </Link>,
                ]}
              >
                <Skeleton loading={loading} active>
                  <Meta title={player.name} description={player.pospri} />
                </Skeleton>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
