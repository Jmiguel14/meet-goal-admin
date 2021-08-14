import { Button, Card, Col, Divider, Image, Row } from "antd";
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
import { Element, scroller, animateScroll as scroll } from "react-scroll";
import { Routes } from "../../constants/routes";
import { CaretUpOutlined } from "@ant-design/icons";

const Home = () => {
  let location = useLocation();
  const scrollType = {
    duration: 500,
    delay: 50,
    smooth: true, // linear “easeInQuint” “easeOutCubic”
    offset: -10,
  };

  useEffect(() => {
    if (location.pathname === Routes.HOME) {
      scroller.scrollTo("home_info", scrollType);
    }
    if (location.pathname === Routes.SERVICES) {
      scroller.scrollTo("services_info", scrollType);
    }
    if (location.pathname === Routes.TEAM) {
      scroller.scrollTo("about_info", scrollType);
    }
    console.log(location.pathname);
  });

  function goToTop() {
    scroll.scrollToTop();
  }
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
        <div className="home_info_with_cover">
          <Col>
            <CoverHomeIcon width={391} height={378} />
          </Col>
          <Col>
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
                Perteneces a un club profesional o amateur, una Academia o eres
                un DT, con ganas de formar un equipo competitivo.
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
        </div>
      </Element>
      <Element name="services_info">
        <Divider
          style={{ borderWidth: 2, borderColor: "#99ff98", color: "#99ff98" }}
        ></Divider>
        <div className="site-card-wrapper" style={{ textAlign: "center" }}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8} className="gutter-row">
              <div className="home_info_container">
                <Card
                  title="Crear Convocatorias"
                  bordered={true}
                  style={{
                    width: 240,
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
            <Col span={8} className="gutter-row">
              <div className="home_info_container">
                <Card
                  title="Ver perfil de jugadores"
                  bordered={true}
                  style={{
                    width: 240,
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
            <Col span={8} className="gutter-row">
              <div className="home_info_container">
                <Card
                  title="Ver Noticias deportivas"
                  bordered={true}
                  style={{
                    width: 240,
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
        <div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12} className="gutter-row">
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
            <Col span={12} className="gutter-row">
              <Row justify="space-around" align="middle">
                <div className="home_info_container">
                  <Image
                    src={MiguelProfile}
                    width={270}
                    className="developers_photos"
                  />
                  <Image
                    src={FreddyProfile}
                    width={270}
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
      <Button
        style={{
          position: "fixed",
          bottom: "5%",
          right: "5%",
          width: "50px",
          height: "50px",
          borderColor: "#99ff98",
          background: "transparent",
        }}
        icon={
          <CaretUpOutlined style={{ fontSize: "40px", color: "#99ff98" }} />
        }
        shape="circle"
        onClick={() => goToTop()}
      ></Button>
    </>
  );
};

export default Home;
