<<<<<<< HEAD
import { Card, Col, Descriptions, Row } from "antd";
import React, { useEffect, useState } from "react";
import { listeningCallOwner } from "../../firebase/CallServices";
import { Club } from "../../types";
import "./styles.less";

interface ClubDataProps {
  clubId: string | undefined;
}

export const ClubInstitutionalInfo = ({ clubId }: ClubDataProps) => {
  const [ownData, setOwnData] = useState<Club>();

  useEffect(() => {
    const unsubscribe = listeningCallOwner(clubId!, setOwnData);
    return () => unsubscribe && unsubscribe();
  }, [clubId]);
  return (
    <Row justify="center">
      <Col>
        <Card className="own_info_card">
          <Descriptions title="Datos del club">
=======
import { EditOutlined } from "@ant-design/icons";
import { Card, Col, Descriptions, Row } from "antd";
import moment from "moment";
import { Club } from "../../types";
import "./styles.less";

interface ClubInstitutionalInfoProps {
  club: Club | undefined;
  onShowModal: () => void;
}

export const ClubInstitutionallnfo = ({
  club,
  onShowModal,
}: ClubInstitutionalInfoProps) => {
  return (
    <Row justify="center">
      <Col>
        <Card
          className="club_info_card"
          actions={[<EditOutlined onClick={onShowModal} />]}
        >
          <Descriptions title="Información institucional">
            <Descriptions.Item
              label="Correo"
              labelStyle={{ fontWeight: "bold" }}
            >
              {club?.email}
            </Descriptions.Item>
>>>>>>> 3aa54bb8987ccfe8172cbb5df516a8eceb3fc76c
            <Descriptions.Item
              label="Nombre"
              labelStyle={{ fontWeight: "bold" }}
            >
<<<<<<< HEAD
              {ownData?.name}
            </Descriptions.Item>
            <Descriptions.Item
              label="Correo"
              labelStyle={{ fontWeight: "bold" }}
            >
              {ownData?.email}
=======
              {club?.name}
            </Descriptions.Item>
            <Descriptions.Item
              label="Razón social"
              labelStyle={{ fontWeight: "bold" }}
            >
              {club?.socialName}
            </Descriptions.Item>
            <Descriptions.Item
              label="Fundación"
              labelStyle={{ fontWeight: "bold" }}
            >
              {moment(club?.foundation).format("DD-MM-YYYY")}
>>>>>>> 3aa54bb8987ccfe8172cbb5df516a8eceb3fc76c
            </Descriptions.Item>
            <Descriptions.Item
              label="Teléfono"
              labelStyle={{ fontWeight: "bold" }}
            >
<<<<<<< HEAD
              {ownData?.phone}
=======
              {club?.phone}
>>>>>>> 3aa54bb8987ccfe8172cbb5df516a8eceb3fc76c
            </Descriptions.Item>
            <Descriptions.Item
              label="Ciudad/País"
              labelStyle={{ fontWeight: "bold" }}
            >
<<<<<<< HEAD
              {ownData?.city + ", " + ownData?.country}
=======
              {club?.city + ", " + club?.country}
>>>>>>> 3aa54bb8987ccfe8172cbb5df516a8eceb3fc76c
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
};
