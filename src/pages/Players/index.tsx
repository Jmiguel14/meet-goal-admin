import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Col, Form, message, Modal, Row, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  deletePlayerExperience,
  deletePlayerInjury,
  listeningSinglePlayer,
  updatePlayerExperience,
  updatePlayerInjury,
  updatePlayerPersonalInfo,
  updatePlayerTacticalInfo,
} from "../../firebase/PlayerServices";
import {
  Player,
  PlayerExperience,
  PlayerInjury,
  PlayerPersonalInfo,
} from "../../types";
import firebase from "firebase/app";
import "./styles.less";
import { uploadImage } from "../../firebase/client";
import { PlayerPersonalnfo } from "../../components/PlayerPersonalnfo";
import { UpdatePlayerTacticalInfoModal } from "../../components/Modals/UpdatePlayerTacticalInfoModal";
import { PlayerTacticalInfo } from "../../components/PlayerTacticalInfo";
import { UpdatePlayerPersonalInfoModal } from "../../components/Modals/UpdatePlayerPersonalInfoModal";
import moment from "moment";
import { PlayerExperienceCollapse } from "../../components/PlayerExperienceCollapse";
import { UpdatePlayerExperienceModal } from "../../components/Modals/UpdatePlayerExperienceModal";
import { PlayerInjuriesCollapse } from "../../components/PlayerInjuriesCollapse";
import { UpdatePlayerInjuryModal } from "../../components/Modals/UpdatePlayerInjuryModal";

const { Title } = Typography;
const Players = () => {
  const { id } = useParams<{ id: string }>();
  const { confirm } = Modal;

  const [player, setPlayer] = useState<Player>();
  const [playerAttributes, setPlayerAattributes] =
    useState<(string | undefined)[]>();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [
    isVisiblePlayerPersonalInfoModal,
    setIsVisiblePlayerPersonalInfoModal,
  ] = useState(false);

  const [isVisiblePlayerExperienceModal, setIsVisiblePlayerExperienceModal] =
    useState(false);
  const [isVisiblePlayerInjuryModal, setIsVisiblePlayerInjuryModal] =
    useState(false);

  const [playerTacticalInfoForm] = Form.useForm();
  const [playerPersonalInfoForm] = Form.useForm();
  const [playerExperienceForm] = Form.useForm();
  const [playerInjuryForm] = Form.useForm();

  const [coverTask, setCoverTask] = useState<firebase.storage.UploadTask>();
  const [avatarTask, setAvatarTask] = useState<firebase.storage.UploadTask>();
  const [coverURL, setCoverURL] = useState<string>("");
  const [avatarURL, setAvatarURL] = useState<string>("");

  const [playerExperience, setPlayerExperience] = useState<
    PlayerExperience[] | undefined
  >([]);
  const [singlePlayerExperience, setSinglePlayerExperience] =
    useState<PlayerExperience>();
  const [playerInjuries, setPlayerInjuries] = useState<
    PlayerInjury[] | undefined
  >([]);
  const [playerInjury, setPlayerInjury] = useState<PlayerInjury>();
  console.log("playerInjuries", playerInjuries);
  console.log("playerInjury", playerInjury);
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
    setPlayerExperience(player?.clubs);
    setPlayerInjuries(player?.injuries);
  }, [player]);

  const onFinishPlayerTacticalInfoForm = async (values: Player) => {
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

    if (pospri !== "") {
      try {
        await updatePlayerTacticalInfo(player?.id!, settedValues);
        message.success("Información táctica actualizada exitosamente!");
        playerTacticalInfoForm.resetFields();
      } catch (e) {
        message.error(`Ocurrio un error del tipo ${e}`);
      }
      setIsVisibleModal(false);
    }
  };

  const onUpdatePlayerPersonalInfo = async (values: PlayerPersonalInfo) => {
    const { name, phone, city, country, birth } = values;

    const newBirth = moment(birth).toISOString();
    const category = values.category ? values.category : "";
    const contract = values.contract ? values.contract : "";
    if (
      name !== "" &&
      phone !== "" &&
      city !== "" &&
      country !== "" &&
      birth !== ""
    ) {
      try {
        await updatePlayerPersonalInfo(player?.id!, {
          name,
          phone,
          city,
          country,
          birth: newBirth,
          category,
          contract,
        });
        message.success("Información personal actualizada exitosamente!");
        playerPersonalInfoForm.resetFields();
      } catch (e) {
        message.error(`Ocurrio un error del tipo ${e}`);
      }
      setIsVisiblePlayerPersonalInfoModal(false);
    }
  };

  const onFinishPlayerExperinceForm = async (values: PlayerExperience) => {
    const { catTournament, clubName, countryClub, subPlayer } = values;

    if (
      catTournament !== "" &&
      clubName !== "" &&
      countryClub !== "" &&
      subPlayer !== ""
    ) {
      try {
        await updatePlayerExperience(
          player?.id!,
          values,
          singlePlayerExperience
        );
        message.success("Experiencia actualizada exitosamente!");
        playerExperienceForm.resetFields();
      } catch (e) {
        message.error(`Ocurrio un error del tipo ${e}`);
      }
      setIsVisiblePlayerExperienceModal(false);
    }
  };

  const onFinishPlayerInjuryForm = async (values: PlayerInjury) => {
    const { injuryName, recoveryTime, surgery } = values;

    if (injuryName !== "" && recoveryTime !== "") {
      try {
        await updatePlayerInjury(
          player?.id!,
          { injuryName, recoveryTime, surgery },
          playerInjury
        );
        message.success("Lesión actualizada exitosamente!");
        playerExperienceForm.resetFields();
      } catch (e) {
        message.error(`Ocurrio un error del tipo ${e}`);
      }
      setIsVisiblePlayerInjuryModal(false);
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

  const showPlayerTacticalInfoModal = () => {
    setIsVisibleModal(true);
    setCoverURL(player?.coverURL!);
    setAvatarURL(player?.avatarURL!);
    playerTacticalInfoForm.setFieldsValue({
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
    const birth = moment(player?.birth);
    playerPersonalInfoForm.setFieldsValue({
      name: player?.name,
      phone: player?.phone,
      city: player?.city,
      country: player?.country,
      birth: birth,
      category: player?.category,
      contract: player?.contract,
    });
  };

  const showPlayerExperienceModal = (experience: PlayerExperience) => {
    setIsVisiblePlayerExperienceModal(true);
    const assistances = experience.A !== undefined ? experience.A : 0;
    const goals = experience.G !== undefined ? experience.G : 0;
    const playedGames = experience.PJ !== undefined ? experience.PJ : 0;
    const yellowCards = experience.TA !== undefined ? experience.TA : 0;
    const redCards = experience.TR !== undefined ? experience.TR : 0;
    const season = experience.season !== undefined ? experience.season : 0;

    const singlePlayerExperience = {
      A: assistances,
      G: goals,
      PJ: playedGames,
      TA: yellowCards,
      TR: redCards,
      season: season,
      catTournament: experience.catTournament,
      clubName: experience.clubName,
      countryClub: experience.countryClub,
      subPlayer: experience.subPlayer,
    };
    playerExperienceForm.setFieldsValue(singlePlayerExperience);

    setSinglePlayerExperience(singlePlayerExperience);
  };

  const showPlayerInjuryModal = (injury: PlayerInjury) => {
    setIsVisiblePlayerInjuryModal(true);
    playerInjuryForm.setFieldsValue(injury);
    setPlayerInjury(injury);
  };

  const handleDeletePlayerExperience = async (
    singleExperience: PlayerExperience
  ) => {
    try {
      await deletePlayerExperience(player?.id!, singleExperience);
      message.success("Experiencia eliminada exitosamente!");
    } catch (e) {
      message.error(`Ocurrió un error de tipo ${e}`);
    }
  };

  const showPlayerExperienceDeleteConfirm = (
    singleExperience: PlayerExperience
  ) => {
    confirm({
      title: "¿Esta seguro que desea eliminar esta experiencia?",
      icon: <ExclamationCircleOutlined />,
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeletePlayerExperience(singleExperience);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDeletePlayerInjury = async (injury: PlayerInjury) => {
    try {
      await deletePlayerInjury(player?.id!, injury);
      message.success("Lesión eliminada exitosamente!");
    } catch (e) {
      message.error(`Ocurrió un error de tipo ${e}`);
    }
  };

  const showPlayerInjuryDeleteConfirm = (injury: PlayerInjury) => {
    confirm({
      title: "¿Esta seguro que desea eliminar esta lesión?",
      icon: <ExclamationCircleOutlined />,
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeletePlayerInjury(injury);
      },
      onCancel() {
        console.log("Cancel");
      },
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

          <PlayerPersonalnfo
            player={player}
            onShowModal={showPlayerPersonalInfoModal}
          />

          <UpdatePlayerPersonalInfoModal
            setIsVisibleModal={setIsVisiblePlayerPersonalInfoModal}
            isVisibleModal={isVisiblePlayerPersonalInfoModal}
            form={playerPersonalInfoForm}
            onFinish={onUpdatePlayerPersonalInfo}
          />

          <PlayerTacticalInfo
            player={player}
            onShowModal={showPlayerTacticalInfoModal}
            playerAttributes={playerAttributes}
          />

          <UpdatePlayerTacticalInfoModal
            setIsVisibleModal={setIsVisibleModal}
            form={playerTacticalInfoForm}
            isVisibleModal={isVisibleModal}
            coverURL={coverURL}
            avatarURL={avatarURL}
            onFinish={onFinishPlayerTacticalInfoForm}
            onHandleCoverChange={handleCoverChange}
            onHandleAvatarChange={handleAvatarChange}
          />

          <PlayerExperienceCollapse
            playerExperience={playerExperience}
            onShowPlayerExperienceModal={showPlayerExperienceModal}
            onShowDeleteConfirm={showPlayerExperienceDeleteConfirm}
          />

          <UpdatePlayerExperienceModal
            setIsVisiblePlayerExperienceModal={
              setIsVisiblePlayerExperienceModal
            }
            form={playerExperienceForm}
            isVisiblePlayerExperienceModal={isVisiblePlayerExperienceModal}
            onFinishPlayerExperinceForm={onFinishPlayerExperinceForm}
          />

          <PlayerInjuriesCollapse
            playerInjuries={playerInjuries}
            onShowPlayerInjuryModal={showPlayerInjuryModal}
            onShowDeleteConfirm={showPlayerInjuryDeleteConfirm}
          />

          <UpdatePlayerInjuryModal
            setIsVisiblePlayerInjuryModal={setIsVisiblePlayerInjuryModal}
            form={playerInjuryForm}
            isVisiblePlayerInjuryModal={isVisiblePlayerInjuryModal}
            onFinishPlayerInjuryForm={onFinishPlayerInjuryForm}
          />
        </div>
      </div>
    </>
  );
};

export default Players;
