import { Card, Col, Divider, Image, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import CoverHomeIcon from "../../icons/CoverHomeIcon";
import GooglePlayIcon from "../../icons/GooglePlayIcon";
import MeetGoalIcon from "../../icons/MeetGoalIcon";
import "./styles.less";
import MiguelProfile from "../../icons/MiguelProfile.jpg";
import FreddyProfile from "../../icons/FreddyProfile.jpg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Element, scroller } from "react-scroll";
import { Routes } from "../../constants/routes";

const Home = () => {
  let location = useLocation();
  const scrollType = {
    duration: 500,
    delay: 50,
    smooth: true, // linear “easeInQuint” “easeOutCubic”
    offset: -10,
  };

  useEffect(() => {
    if (location.pathname === Routes.SERVICES) {
      scroller.scrollTo("services_info", scrollType);
    }
    if (location.pathname === Routes.TEAM) {
      scroller.scrollTo("about_info", scrollType);
    }
    console.log(location.pathname);
  });
  return (
    <>
      <Element name="home_info">
        <div className="home_info_container">
          <MeetGoalIcon height={288} width={300} />
        </div>
        <div className="home_info_container">
          <Col>
            <Row justify="center">
              <Title level={2} className="primary_title">
                Meet Goal es una aplicación creada en beneficio al desarrollo
                futbolístico, permitiendo a los clubes crear convocatorias en
                una red global de futbolistas.
              </Title>
            </Row>
          </Col>
        </div>

        <div className="home_info_container">
          <Row justify="center">
            <Col lg={12} xl={12}>
              <CoverHomeIcon width={361} height={348} />
            </Col>
            <Col lg={12} xl={12}>
              <Row justify="center">
                <Title level={2} className="primary_title">
                  Si eres un futbolista con sueños de crear una carrera.
                </Title>
              </Row>
              <Row>
                <Divider
                  style={{
                    borderWidth: 2,
                    borderColor: "#99ff98",
                    color: "#99ff98",
                  }}
                >
                  O
                </Divider>
              </Row>
              <Row justify="center">
                <Title level={2} className="primary_title">
                  Perteneces a un club profesional o amateur, una Academia o
                  eres un DT, con ganas de formar un equipo competitivo.
                </Title>
              </Row>
              <Row justify="center">
                <Title level={2} className="primary_title">
                  Descarga nuestra aplicación. Disponible Ya en Google Play!
                </Title>
              </Row>
              <Row justify="center">
                <GooglePlayIcon width={50} height={50} />
              </Row>
            </Col>
          </Row>
        </div>
      </Element>
      <Element name="services_info">
        <Divider
          style={{ borderWidth: 2, borderColor: "#99ff98", color: "#99ff98" }}
        ></Divider>

        <div
          className="site-card-wrapper"
          style={{ textAlign: "center", width: "100%" }}
        >
          <Row justify="center">
            <Col lg={8} xl={8} className="gutter-row">
              <div className="home_info_container">
                <Card
                  title="Crear Convocatorias"
                  bordered={true}
                  style={{
                    width: 250,
                    height: 200,
                    backgroundColor: "#d0dde1",
                  }}
                >
                  <p>
                    Crea convocatorias, visualiza el perfil de los futbolistas y
                    seleccionalos
                  </p>
                </Card>
              </div>
            </Col>
            <Col lg={8} xl={8} className="gutter-row">
              <div className="home_info_container">
                <Card
                  title="Ver perfil de jugadores"
                  bordered={true}
                  style={{
                    width: 250,
                    height: 200,
                    backgroundColor: "#d0dde1",
                  }}
                >
                  <p>
                    Si estas encantado con un futbolista, mira su perfil y
                    contactate con el.
                  </p>
                </Card>
              </div>
            </Col>
            <Col lg={8} xl={8} className="gutter-row">
              <div className="home_info_container">
                <Card
                  title="Ver Noticias deportivas"
                  bordered={true}
                  style={{
                    width: 250,
                    height: 200,
                    backgroundColor: "#d0dde1",
                  }}
                >
                  <p>
                    El mundo deportivo y futbolistico tiene novedades muy
                    seguido. Dales un vistazo...
                  </p>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </Element>
      <Divider
        style={{ borderWidth: 2, borderColor: "#99ff98", color: "#99ff98" }}
      ></Divider>

      <Element name="about_info">
        <div className="home_info_container" style={{ width: "100%" }}>
          <Row justify="center">
            <Col lg={12} xl={12}>
              <div className="home_info_container">
                <Text className="our_description">
                  El equipo de desarrollo, esta conformado por estudiantes de la
                  Escuela Politecnica Nacional. Siendo Meet Goal una idea basada
                  complementada en un proyecto para ayudar en gran parte a la
                  problematica que se da entorno a la selección de futbolistas.
                  El equipo tiene el compromiso de aplicar cada uno de sus
                  conocimientos en la mejora y ayuda con tecnologías innovadoras
                  para la sociedad.
                </Text>
              </div>
            </Col>
            <Col lg={12} xl={12}>
              <Row justify="center" align="middle">
                <div
                  className="home_info_container"
                  style={{ alignItems: "center" }}
                >
                  <Image
                    src={MiguelProfile}
                    width={"100%"}
                    className="developers_photos"
                  />
                  <Image
                    src={FreddyProfile}
                    width={"100%"}
                    className="developers_photos"
                  />
                </div>
              </Row>
            </Col>
          </Row>
        </div>
        <Divider
          style={{ borderWidth: 2, borderColor: "#99ff98", color: "#99ff98" }}
        ></Divider>
      </Element>
    </>
  );
};

export default Home;
