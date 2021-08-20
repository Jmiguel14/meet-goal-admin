import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import { Badge, Card, Col, Descriptions, Row, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getSinglePlayer } from "../../firebase/PlayerServices";
import { Player } from "../../types";
import "./styles.less";

const { Title } = Typography;

const Players = () => {
  const { id } = useParams<{ id: string }>();

  const [player, setPlayer] = useState<Player>();

  const history = useHistory();

  console.log("player", player);

  useEffect(() => {
    getSinglePlayer(id)
      .then((doc) => {
        const player = doc.data() as Player;
        setPlayer(player);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className="body_player">
        <div className="player_container">
          <div className="single_player_header">
            <ArrowLeftOutlined
              className="go_back_button"
              onClick={() => history.goBack()}
            />

            <Title level={4}>{player?.name}</Title>
          </div>
          <Row justify="center" className="avatar">
            <Col>
              <Avatar size={100} src={player?.avatarURL} />
            </Col>
          </Row>

          <Row justify="center">
            <Col>
            <Card>
              <Descriptions className='title' title="Información personal">
                <Descriptions.Item label="E-mail">
                  Zhou Maomao
                </Descriptions.Item> 
                <Descriptions.Item label="Teléfono">
                  1810000000
                </Descriptions.Item>
                <Descriptions.Item label="Live">
                  Hangzhou, Zhejiang
                </Descriptions.Item>
                <Descriptions.Item label="Remark">empty</Descriptions.Item>
                <Descriptions.Item label="Address">
                  No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
              </Descriptions>
            </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Players;
