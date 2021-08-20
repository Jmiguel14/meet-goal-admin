import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Player } from "../../types";
import "./styles.less"

const { Meta } = Card;

interface ListOfNewsProps {
  players: Player[] ;
}

export const ListOfPlayers = ({ players }: ListOfNewsProps) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    players?.length === 0 ? setLoading(true) : setLoading(false);
  }, [players]);

  return (
    <div className="list_of_players">
      {players.map((player: Player, index: number) => {
        return (
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
                <EyeOutlined key='watch'/>,
              </Link>
            ]}
          >
            <Skeleton loading={loading} active>
              <Meta title={player.name} description={player.email} />
            </Skeleton>
          </Card>
        );
      })}
    </div>
  );
};
