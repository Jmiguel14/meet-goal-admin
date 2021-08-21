import {
  ArrowLeftOutlined,
  EditOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Card,
  Col,
  Descriptions,
  Input,
  Row,
  Tag,
  Typography,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Dragger } from "../../components/Dragger";
import { getSinglePlayer } from "../../firebase/PlayerServices";
import { Player } from "../../types";
import { formatDate } from "../../utils/formatDate";
import firebase from "firebase/app";
import "./styles.less";
import { uploadImage } from "../../firebase/client";
import Text from "antd/lib/typography/Text";

const { Title } = Typography;
const { Meta } = Card;

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

const Players = () => {
  const { id } = useParams<{ id: string }>();

  const [player, setPlayer] = useState<Player>();
  const [playerAttributes, setPlayerAattributes] =
    useState<(string | undefined)[]>();

  const [task, setTask] = useState<firebase.storage.UploadTask>();
  const [imgURL, setImgURL] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);

  useEffect(() => {
    if (task) {
      const onProgress = () => {
        console.log("onProgress");
      };
      const onError = () => {
        console.log("onError");
      };
      const onComplete = () => {
        console.log("onComplete");
        task.snapshot.ref.getDownloadURL().then(setImgURL);
      };

      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    setFile(file);
    const task = uploadImage(file);
    setTask(task);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFile(file);
    const task = uploadImage(file);
    setTask(task);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const setStyleLabel = () => {
    const style =
      drag === DRAG_IMAGE_STATES.DRAG_OVER
        ? "custom-file-upload-dashed"
        : "custom-file-upload";
    return style;
  };

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

  useEffect(() => {
    const playerAttributes = [
      player?.firstAttribute,
      player?.secondAttribute,
      player?.thirdAttribute,
      player?.fourthAttribute,
    ];
    setPlayerAattributes(playerAttributes);
  }, [player]);

  console.log("playerAttributes", playerAttributes);

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
              <Card className="player_info_card" actions={[<EditOutlined />]}>
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
                    {formatDate(player?.birth)}
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

          <Row justify="center">
            <Col className="photo_and_position" md={24} sm={24} xs={24}>
              <Card
                hoverable
                className="player_photo_card"
                actions={[<EditOutlined />]}
                cover={<img src={player?.coverURL} />}
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
                            <Col md={12} xs={12}>
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
        </div>
      </div>
    </>
  );
};

export default Players;
