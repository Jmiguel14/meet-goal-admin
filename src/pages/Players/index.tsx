import { ArrowLeftOutlined, CameraOutlined } from "@ant-design/icons";
import { Col, Form, Input, message, Modal, Row, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  listeningSinglePlayer,
  updatePlayerTacticalInfo,
} from "../../firebase/PlayerServices";
import { Player } from "../../types";
import firebase from "firebase/app";
import "./styles.less";
import { uploadImage } from "../../firebase/client";
import { PlayerPersonalnfo } from "../../components/PlayerPersonalnfo";
import { PlayerTacticalInfo } from "../../components/PlayerTacticalInfo";
import { UpdatePlayerTacticalInfoModal } from "../../components/UpdatePlayerTacticalInfoModal";

const { Title } = Typography;

const Players = () => {
  const { id } = useParams<{ id: string }>();

  const [player, setPlayer] = useState<Player>();
  const [playerAttributes, setPlayerAattributes] =
    useState<(string | undefined)[]>();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisiblePlayerPersonalInfoModal, setIsVisiblePlayerPersonalInfoModal] = useState(false);

  const [form] = Form.useForm();

  const [coverTask, setCoverTask] = useState<firebase.storage.UploadTask>();
  const [avatarTask, setAvatarTask] = useState<firebase.storage.UploadTask>();
  const [coverURL, setCoverURL] = useState<string>("");
  const [avatarURL, setAvatarURL] = useState<string>("");

  useEffect(() => {
    if (coverTask) {
      const onProgress = () => {
        console.log("onProgress");
      };
      const onError = () => {
        console.log("onError");
      };
      const onComplete = () => {
        console.log("onComplete");
        coverTask.snapshot.ref.getDownloadURL().then(setCoverURL);
      };

      coverTask.on("state_changed", onProgress, onError, onComplete);
    }
    if (avatarTask) {
      const onProgress = () => {
        console.log("onProgress");
      };
      const onError = () => {
        console.log("onError");
      };
      const onComplete = () => {
        console.log("onComplete");
        avatarTask.snapshot.ref.getDownloadURL().then(setAvatarURL);
      };

      avatarTask.on("state_changed", onProgress, onError, onComplete);
    }
  }, [coverTask, avatarTask]);

  const history = useHistory();

  useEffect(() => {
    const unsubscribe = listeningSinglePlayer(id, setPlayer);
    return () => unsubscribe && unsubscribe();
  }, [id]);

  useEffect(() => {
    const playerAttributes = [
      player?.firstAttribute,
      player?.secondAttribute,
      player?.thirdAttribute,
      player?.fourthAttribute,
    ];
    setPlayerAattributes(playerAttributes);
  }, [player]);

  const onFinish = async (values: Player) => {
    const { pospri, attributes } = values;
    const possec = values.possec ? values.possec : "";

    const firstAttribute = attributes![0] ? attributes![0] : "";
    const secondAttribute = attributes![1] ? attributes![1] : "";
    const thirdAttribute = attributes![2] ? attributes![2] : "";
    const fourthAttribute = attributes![3] ? attributes![3] : "";

    const settedValues = {
      pospri,
      possec,
      firstAttribute,
      secondAttribute,
      thirdAttribute,
      fourthAttribute,
      coverURL,
      avatarURL,
    };

    try {
      await updatePlayerTacticalInfo(player?.id!, settedValues);
      message.success("Información táctica actualizada exitosamente!");
      form.resetFields();
    } catch (e) {
      message.error(`Ocurrio un error del tipo ${e}`);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const task = uploadImage(file);
    setCoverTask(task);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const task = uploadImage(file);
    setAvatarTask(task);
  };

  const showModal = () => {
    setIsVisibleModal(true);
    setCoverURL(player?.coverURL!);
    setAvatarURL(player?.avatarURL!);
    form.setFieldsValue({
      pospri: player?.pospri,
      possec: player?.possec,
      attributes: [
        player?.firstAttribute,
        player?.secondAttribute,
        player?.thirdAttribute,
        player?.fourthAttribute,
      ],
    });
  };

  const showPlayerPersonalInfoModal = () => {
    setIsVisiblePlayerPersonalInfoModal(true);
    form.setFieldsValue({
      pospri: player?.pospri,
      possec: player?.possec,
      attributes: [
        player?.firstAttribute,
        player?.secondAttribute,
        player?.thirdAttribute,
        player?.fourthAttribute,
      ],
    });
  };

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

          <PlayerPersonalnfo player={player} />

          <PlayerTacticalInfo
            player={player}
            onShowModal={showModal}
            playerAttributes={playerAttributes}
          />

          <UpdatePlayerTacticalInfoModal
            setIsVisibleModal={setIsVisibleModal}
            form={form}
            isVisibleModal={isVisibleModal}
            coverURL={coverURL}
            avatarURL={avatarURL}
            onFinish={onFinish}
            onHandleCoverChange={handleCoverChange}
            onHandleAvatarChange={handleAvatarChange}
          />
        </div>
      </div>
    </>
  );
};

export default Players;
