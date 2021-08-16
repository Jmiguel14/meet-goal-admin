import { Col, Row, Image, Space } from "antd";
import Title from "antd/lib/typography/Title";
import "./styles.less";
import SoccerBall from "../../icons/soccerBall.png";
import Text from "antd/lib/typography/Text";

const About = () => {
  return (
    <>
      <div>
        <Row justify="center" align="middle">
          <Col xl={12} lg={12}>
            <Row justify="center">
              <Title level={1} className="title_text">
                NOSOTROS
              </Title>
            </Row>
            <Row>
              <Title level={2} className="detail_text">
                Meet Goal se genera como una idea innovadora, con el principal
                enfoque de agilitar y controlar los procesos de convocatoria
                para selección o reclutamiento de jugadores. Meet Goal tuvo la
                guía de expertos relacionados al ámbito futbolístico desde la
                parte deportiva, técnica y dirigencial.
              </Title>
            </Row>
          </Col>
          <Col xl={12} lg={12}>
            <div className="container">
              <Image src={SoccerBall} preview={false} width={"50%"}></Image>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row justify="center" align="middle">
          <Col xl={12} lg={12}>
            <div className="title_container">
              <Title level={1} className="title_text">
                MEET GOAL OFRECE:
              </Title>
            </div>
          </Col>
          <Col xl={12} lg={12}>
            <Space direction="vertical" style={{ padding: "4%" }}>
              <Text className="services_list">
                ✨ Creación de convocatorias de jugadores.
              </Text>
              <Text className="services_list">
                ✨ Visualización del perfil de los jugadores.
              </Text>
              <Text className="services_list">
                ✨ Chat con los jugadores de la red.
              </Text>
              <Text className="services_list">
                ✨ Control en el listado de postulantes a una convocatoria.
              </Text>
              <Text className="services_list">
                ✨ Notificación de pasos a seguir despues de ser seleccionado.
              </Text>
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default About;
