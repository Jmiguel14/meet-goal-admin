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
            <Descriptions.Item
              label="Nombre"
              labelStyle={{ fontWeight: "bold" }}
            >
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
            </Descriptions.Item>
            <Descriptions.Item
              label="Teléfono"
              labelStyle={{ fontWeight: "bold" }}
            >
              {club?.phone}
            </Descriptions.Item>
            <Descriptions.Item
              label="Ciudad/País"
              labelStyle={{ fontWeight: "bold" }}
            >
              {club?.city + ", " + club?.country}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
};
