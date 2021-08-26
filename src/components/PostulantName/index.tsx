import { Avatar, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { listeningSinglePlayer } from "../../firebase/PlayerServices";
import { Player } from "../../types";

interface PostulantData {
  playerId: string | undefined;
}

const PostulantName = ({ playerId }: PostulantData) => {
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    const unsubscribe = listeningSinglePlayer(playerId, setPlayer);
    return () => unsubscribe && unsubscribe();
  }, [playerId]);

  return (
    <>
      <Card>
        <Meta
          avatar={<Avatar src={player?.avatarURL} />}
          title={player?.name}
        />
      </Card>
    </>
  );
};

export default PostulantName;
