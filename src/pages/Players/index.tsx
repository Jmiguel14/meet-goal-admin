import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Col,
  Form,
  message,
  Modal,
  Row,
  Typography,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  deletePlayerExperience,
  listeningSinglePlayer,
  updatePlayerExperience,
  updatePlayerPersonalInfo,
  updatePlayerTacticalInfo,
} from "../../firebase/PlayerServices";
import { Player, PlayerExperience, PlayerPersonalInfo } from "../../types";
import firebase from "firebase/app";
import "./styles.less";
import { uploadImage } from "../../firebase/client";
import { PlayerPersonalnfo } from "../../components/PlayerPersonalnfo";
import { UpdatePlayerTacticalInfoModal } from "../../components/UpdatePlayerTacticalInfoModal";
import { PlayerTacticalInfo } from "../../components/PlayerTacticalInfo";
import { UpdatePlayerPersonalInfoModal } from "../../components/UpdatePlayerPersonalInfoModal";
import moment from "moment";
import { PlayerExperienceCollapse } from "../../components/PlayerExperienceCollapse";
import { UpdatePlayerExperienceModal } from "../../components/UpdatePlayerExperienceModal";

const { Title } = Typography
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

  const [form] = Form.useForm();
  const [playerPersonalInfoForm] = Form.useForm();
  const [playerExperienceForm] = Form.useForm();

  const [coverTask, setCoverTask] = useState<firebase.storage.UploadTask>();
  const [avatarTask, setAvatarTask] = useState<firebase.storage.UploadTask>();
  const [coverURL, setCoverURL] = useState<string>("");
  const [avatarURL, setAvatarURL] = useState<string>("");

  const [playerExperience, setPlayerExperience] = useState<
    PlayerExperience[] | undefined
  >([]);
  const [singlePlayerExperience, setSinglePlayerExperience] =
    useState<PlayerExperience>();

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

    if (pospri !== "") {
      try {
        await updatePlayerTacticalInfo(player?.id!, settedValues);
        message.success("Información táctica actualizada exitosamente!");
        form.resetFields();
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
        form.resetFields();
      } catch (e) {
        message.error(`Ocurrio un error del tipo ${e}`);
      }
      setIsVisiblePlayerPersonalInfoModal(false);
    }
  };

  const onFinishPlayerExperinceForm = async (values: PlayerExperience) => {
    const {
      catTournament,
      clubName,
      countryClub,
      subPlayer,
    } = values;

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

  const handleDelete = async (singleExperience: PlayerExperience) => {
    try {
      await deletePlayerExperience(player?.id!, singleExperience);
      message.success("Experiencia eliminada exitosamente!");
    } catch (e) {
      message.error(`Ocurrió un error de tipo ${e}`);
    }
  };

  const showDeleteConfirm = (singleExperience: PlayerExperience) => {
    confirm({
      title: "¿Esta seguro que desea eliminar esta experiencia?",
      icon: <ExclamationCircleOutlined />,
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(singleExperience);
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

          <PlayerExperienceCollapse
            playerExperience={playerExperience}
            onShowPlayerExperienceModal={showPlayerExperienceModal}
            onShowDeleteConfirm={showDeleteConfirm}
          />

          <UpdatePlayerExperienceModal
            setIsVisiblePlayerExperienceModal={
              setIsVisiblePlayerExperienceModal
            }
            form={playerExperienceForm}
            isVisiblePlayerExperienceModal={isVisiblePlayerExperienceModal}
            onFinishPlayerExperinceForm={onFinishPlayerExperinceForm}
          />
        </div>
      </div>
    </>
  );
};

export default Players;
