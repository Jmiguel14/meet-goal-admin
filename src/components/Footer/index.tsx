import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import "./styles.less";
import React from "react";

const index = () => {
  return (
    <>
      <div
        className="site-card-wrapper"
        style={{ textAlign: "center", width: "100%" }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={8} className="gutter-row">
            <div className="home_info_container">
              <Row>
                <Col>
                  <Text className="footer_details">
                    Miguel Ángel Jurado Cedeño
                  </Text>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={8} className="gutter-row">
            <div className="home_info_container">
              <Col>
                <Row justify="center">
                  <Text className="footer_details">
                    Escuela Politécnica Nacional
                  </Text>
                </Row>
                <Row justify="center">
                  <Text className="footer_details">Quito-Ecuador</Text>
                </Row>
                <Row justify="center">
                  <Text className="footer_details">2021</Text>
                </Row>
              </Col>
            </div>
          </Col>
          <Col span={8} className="gutter-row">
            <div className="home_info_container">
              <Text className="footer_details">
                Freddy Geovanny Valverde Gallardo
              </Text>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default index;
