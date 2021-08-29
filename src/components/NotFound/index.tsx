import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import NotFoundPoster from "../../icons/NotFoundPoster";

const NotFound = () => {
  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <Col>
        <Row justify="center">
          <Title level={1} style={{ color: "#99ff98" }}>
            Ups..!! Página no encontrada
          </Title>
        </Row>
        <Row justify="center">
          <NotFoundPoster />
        </Row>
      </Col>
    </div>
  );
};

export default NotFound;
