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
            <Descriptions.Item
              label="Nombre"
              labelStyle={{ fontWeight: "bold" }}
            >
              {ownData?.name}
            </Descriptions.Item>
            <Descriptions.Item
              label="Correo"
              labelStyle={{ fontWeight: "bold" }}
            >
              {ownData?.email}
            </Descriptions.Item>
            <Descriptions.Item
              label="Teléfono"
              labelStyle={{ fontWeight: "bold" }}
            >
              {ownData?.phone}
            </Descriptions.Item>
            <Descriptions.Item
              label="Ciudad/País"
              labelStyle={{ fontWeight: "bold" }}
            >
              {ownData?.city + ", " + ownData?.country}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
};
