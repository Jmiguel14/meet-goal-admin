import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";

const About = () => {
  return (
    <div className="first_container">
      <Row justify="center" align="middle">
        <div>
          <Col>
            <Row>
              <Title level={1}>NOSOTROS</Title>
            </Row>
            <Row>
              <Title level={2}>
                Meet Goal se genera como una idea innovadora, con el principal
                enfoque de agilitar y controlar los procesos de convocatoria
                para selección o reclutamiento de jugadores. Meet Goal tuvo la
                guía de expertos relacionados al ámbito futbolístico desde la
                parte deportiva, técnica y dirigencial.
              </Title>
            </Row>
          </Col>
        </div>
        <div>
          <Col>
            <Title level={1}>Imagen</Title>
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default About;
