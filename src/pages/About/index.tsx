import { Col, Row, Image, Space, Collapse } from "antd";
import Title from "antd/lib/typography/Title";
import "./styles.less";
import SoccerBall from "../../icons/soccerBall.png";
import Text from "antd/lib/typography/Text";

const About = () => {
  const { Panel } = Collapse;
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
      <Row justify="center">
        <Title level={1} className="title_text">
          PREGUNTAS FRECUENTES
        </Title>
      </Row>
      <div className="faq_container">
        <Collapse className="faqs" accordion>
          <Panel
            className="faq_panel"
            header="¿Qué es Meet Goal?"
            key="1"
            style={{ fontSize: "22px" }}
          >
            <p style={{ fontSize: "18px", textAlign: "justify" }}>
              Meet Goal permite gestionar convocatorias para prueba o selección
              de jugadores por parte de los clubes de fútbol. Los jugadores con
              su perfil se postularán a las convocatorias, mismo que será
              analizado por los clubes para una posterior selección.
            </p>
          </Panel>
          <Panel
            className="faq_panel"
            header="¿Qué necesito para registrarme?"
            key="2"
            style={{ fontSize: "22px" }}
          >
            <p style={{ fontSize: "18px", textAlign: "justify" }}>
              Los usuarios se pueden registrar con un correo y una contraseña.
              Además, tienen la opción de registrarse con el servicio de Google.
            </p>
          </Panel>
          <Panel
            className="faq_panel"
            header="¿Qué datos implica el perfil del jugador?"
            key="3"
            style={{ fontSize: "22px" }}
          >
            <p style={{ fontSize: "18px" }}>
              Datos Personales: Nombre, Ciudad, País, correo de contacto, número
              de teléfono, entre otros.
            </p>
            <p style={{ fontSize: "18px" }}>
              Datos Táciticos: Posición principal, posición secundaria, logros,
              atributos.
            </p>
            <p style={{ fontSize: "18px" }}>
              Experiencia: Datos sobre clubes y temporada de la carrera
              futbolística.
            </p>
            <p style={{ fontSize: "18px" }}>
              Datos Médicos: Datos sobre lesión experimentadas durante la
              carrera futbolística.
            </p>
            <p style={{ fontSize: "18px" }}>
              Datos Psicológicos: Carácter, Personalidad y valores
            </p>
            <p style={{ fontSize: "18px" }}>
              Redes Sociales: Enlaces de las redes sociales y canales
              multimedia.
            </p>
          </Panel>
          <Panel
            className="faq_panel"
            header="¿Desde que edad puedo postular?"
            key="4"
            style={{ fontSize: "22px" }}
          >
            <p style={{ fontSize: "22px", textAlign: "justify" }}>
              Las edades determinadas para las postulaciones se categorizan de
              la siguiente manera:
            </p>
            <p style={{ fontSize: "18px" }}>
              Prebenjamines: Desde 5 años hasta menores de 8 años
            </p>
            <p style={{ fontSize: "18px" }}>
              Benjamines: Desde 8 años hasta menores de 10 años
            </p>
            <p style={{ fontSize: "18px" }}>
              Sub-12: Desde 10 años hasta menores de 12 años
            </p>
            <p style={{ fontSize: "18px" }}>
              Sub-14: Desde 12 años hasta menores de 14 años
            </p>
            <p style={{ fontSize: "18px" }}>
              Sub-16: Desde 14 años hasta menores de 16 años
            </p>
            <p style={{ fontSize: "18px" }}>
              Sub-18: Desde 16 años hasta menores de 18 años
            </p>
            <p style={{ fontSize: "18px" }}>
              Senior: Desde 18 años hasta menores de 23 años
            </p>
            <p style={{ fontSize: "18px" }}>Absoluta: Mayores de 23 años</p>
          </Panel>
          <Panel
            className="faq_panel"
            header="¿Comó se determinan las posiciones?"
            key="5"
            style={{ fontSize: "22px" }}
          >
            <p style={{ fontSize: "22px" }}>
              Las posiciones se clasifican de la siguiente manera:
            </p>
            <p style={{ fontSize: "18px" }}>POR: Portero</p>
            <p style={{ fontSize: "18px" }}>CAI: Carrilero Izquierdo</p>
            <p style={{ fontSize: "18px" }}>CAD: Carrilero Derecho</p>
            <p style={{ fontSize: "18px" }}>LI: Lateral Izquierdo</p>
            <p style={{ fontSize: "18px" }}>LD: Lateral Derecho</p>
            <p style={{ fontSize: "18px" }}>DFC: Defensa Central</p>
            <p style={{ fontSize: "18px" }}>MCD: Medio Centro Defensivo</p>
            <p style={{ fontSize: "18px" }}>MC: Medio Centro</p>
            <p style={{ fontSize: "18px" }}>MCO: Medio Centro Ofensivo</p>
            <p style={{ fontSize: "18px" }}>MI: Medio Izquierdo</p>
            <p style={{ fontSize: "18px" }}>MD: Medio Derecho</p>
            <p style={{ fontSize: "18px" }}>SD: Segundo Delantero</p>
            <p style={{ fontSize: "18px" }}>DC: Centro Delantero</p>
            <p style={{ fontSize: "18px" }}>EI: Extremo Izquierdo</p>
            <p style={{ fontSize: "18px" }}>ED: Extremo Derecho</p>
          </Panel>
          <Panel
            className="faq_panel"
            header="¿Cómo se que he sido seleccionado?"
            key="6"
            style={{ fontSize: "22px" }}
          >
            <p style={{ fontSize: "18px", textAlign: "justify" }}>
              Una vez terminado el periodo de actividad de la convocatoria, el
              club tendrá la opción de revisar y seleccionar el o los jugadores
              que crea cumplen con lo buscado. Después de esto, el club
              procederá a realizar la acción de cierre de la convocatoria, misma
              que lleva junta la notificación a los jugadores seleccionados en
              la convocatoria. Esta notificación será un mensaje personalizado
              por el club que contenga indicaciones futuras a realizar por los
              jugadores seleccionados.
            </p>
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

export default About;
