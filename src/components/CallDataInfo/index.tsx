import { EditOutlined } from "@ant-design/icons";
import { Card, Col, Descriptions, Row } from "antd";
import moment from "moment";
import { CallData } from "../../types";
import "./styles.less";

interface CallDataInfoProps {
  call: CallData | undefined;
  onShowModal: () => void;
}

export const CallDatalnfo = ({ call, onShowModal }: CallDataInfoProps) => {
  return (
    <Row justify="center">
      <Col>
        <Card
          className="call_info_card"
          actions={[<EditOutlined onClick={onShowModal} />]}
        >
          <Descriptions title="Detalles de la convocatoria">
            <Descriptions.Item
              label="Posición Requerida"
              labelStyle={{ fontWeight: "bold" }}
            >
              {call?.posRequired}
            </Descriptions.Item>
            <Descriptions.Item
              label="Edad Requerida"
              labelStyle={{ fontWeight: "bold" }}
            >
              {call?.ageRequired}
            </Descriptions.Item>
            <Descriptions.Item
              label="Fecha de Inicio"
              labelStyle={{ fontWeight: "bold" }}
            >
              {moment(call?.startDate.toDate()).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item
              label="Fecha de Cierre"
              labelStyle={{ fontWeight: "bold" }}
            >
              {moment(call?.endDate.toDate()).format("DD/MM/YYYY")}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
};
