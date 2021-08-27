import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col, Form, message, Row, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Club,
  ClubInstitutionalInfo,
  ClubSportsAhievements,
} from "../../types";
import firebase from "firebase/app";
import "./styles.less";
import { uploadImage } from "../../firebase/client";
import moment from "moment";
import {
  listeningSingleClub,
  updateClubInstitutionalInfo,
  updateClubSportsAchievements,
} from "../../firebase/ClubServices";
import { ClubInstitutionallnfo } from "../../components/ClubInstitutionalInfo";
import { ClubSportAchievements } from "../../components/ClubSportsAchievements";
import { UpdateClubInstitutionalInfoModal } from "../../components/Modals/UpdateClubInstitutionalInfoModal";
import { UpdateClubSportsAchievementsModal } from "../../components/Modals/UpdateClubSportsAhievementsModal";

const { Title } = Typography;

const Clubs = () => {
  const { id } = useParams<{ id: string }>();

  const [club, setClub] = useState<Club>();
  const [
    isVisibleSportsAchievementsModal,
    setIsVisibleSportsAchievementsModal,
  ] = useState(false);
  const [
    isVisibleClubInstitutionalInfoModal,
    setIsVisibleClubInstitutionalInfoModal,
  ] = useState(false);

  const [sportsAchievementsForm] = Form.useForm();
  const [institutionalInfoForm] = Form.useForm();

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
    const unsubscribe = listeningSingleClub(id, setClub);
    return () => unsubscribe && unsubscribe();
  }, [id]);

  const onFinishInstitutionalInfoForm = async (
    values: ClubInstitutionalInfo
  ) => {
    const { name, phone, foundation, city, country } = values;
    const newFoundation = moment(foundation).toISOString();
    const socialName = values.socialName ? values.socialName : "";
    const settedValues = {
      name,
      phone,
      socialName,
      foundation: newFoundation,
      city,
      country,
    };

    if (
      name !== "" &&
      phone !== "" &&
      foundation !== "" &&
      city !== "" &&
      country !== ""
    ) {
      try {
        await updateClubInstitutionalInfo(club?.id!, settedValues);
        message.success("Información intitucional actualizada exitosamente!");
        institutionalInfoForm.resetFields();
      } catch (e) {
        message.error(`Ocurrio un error del tipo ${e}`);
      }
      setIsVisibleClubInstitutionalInfoModal(false);
    }
  };

  const onFinishSportsAchievementsForm = async (
    values: ClubSportsAhievements
  ) => {
    const { totalWins, maxIntGoal, maxNacGoal } = values;

    if (maxIntGoal !== "" && maxNacGoal !== "") {
      try {
        await updateClubSportsAchievements(club?.id!, {
          totalWins,
          maxIntGoal,
          maxNacGoal,
          avatarURL,
          coverURL,
        });
        message.success("Información personal actualizada exitosamente!");
        sportsAchievementsForm.resetFields();
      } catch (e) {
        message.error(`Ocurrio un error del tipo ${e}`);
      }
      setIsVisibleSportsAchievementsModal(false);
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

  const showSportsAchievementsModal = () => {
    setIsVisibleSportsAchievementsModal(true);
    setCoverURL(club?.coverURL!);
    setAvatarURL(club?.avatarURL!);
    const totalWins = club?.totalWins ? club.totalWins : 0;
    sportsAchievementsForm.setFieldsValue({
      totalWins: totalWins,
      maxIntGoal: club?.maxIntGoal,
      maxNacGoal: club?.maxNacGoal,
    });
  };

  const showClubInstitutionalInfo = () => {
    setIsVisibleClubInstitutionalInfoModal(true);
    const foundation = moment(club?.foundation);
    institutionalInfoForm.setFieldsValue({
      name: club?.name,
      email: club?.email,
      phone: club?.phone,
      city: club?.city,
      country: club?.country,
      foundation: foundation,
      socialName: club?.socialName,
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

            <Title level={4}>{club?.name}</Title>
          </div>
          <Row justify="center" className="avatar">
            <Col>
              <Avatar size={100} src={club?.avatarURL} />
            </Col>
          </Row>

          <ClubInstitutionallnfo
            club={club}
            onShowModal={showClubInstitutionalInfo}
          />

          <UpdateClubInstitutionalInfoModal
            setIsVisibleModal={setIsVisibleClubInstitutionalInfoModal}
            isVisibleModal={isVisibleClubInstitutionalInfoModal}
            form={institutionalInfoForm}
            onFinish={onFinishInstitutionalInfoForm}
          />

          <ClubSportAchievements
            club={club}
            onShowModal={showSportsAchievementsModal}
          />

          <UpdateClubSportsAchievementsModal
            setIsVisibleModal={setIsVisibleSportsAchievementsModal}
            form={sportsAchievementsForm}
            isVisibleModal={isVisibleSportsAchievementsModal}
            coverURL={coverURL}
            avatarURL={avatarURL}
            onFinish={onFinishSportsAchievementsForm}
            onHandleCoverChange={handleCoverChange}
            onHandleAvatarChange={handleAvatarChange}
          />
        </div>
      </div>
    </>
  );
};

export default Clubs;
