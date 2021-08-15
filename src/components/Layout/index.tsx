import React from "react";
import { Button, Col, Layout, Popover, Row } from "antd";
import "./styles.less";
import MeetGoalIcon from "../../icons/MeetGoalIcon";
import { Navigation } from "../Navigation";
import MenuIcon from "../../icons/MenuIcon";
import FooterActions from "../Footer/index";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { Routes } from "../../constants/routes";
import { CaretUpOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export const MainLayout: React.FC = ({ children }) => {
  let location = useLocation();

  function goToTop() {
    scroll.scrollToTop();
  }
  return (
    <Layout>
      <Header className="header">
        <Row justify="space-between">
          <Col className="logo">
            <MeetGoalIcon height={50} width={50} />
          </Col>

          <Col md={18} lg={14} xl={10} className="main-menu">
            <Navigation mode="horizontal" />
          </Col>

          <Col xs={2} className="responsive-menu">
            <Popover content={<Navigation mode="vertical" />} trigger="click">
              <Button type="primary">
                <MenuIcon />
              </Button>
            </Popover>
          </Col>
        </Row>
      </Header>
      <Content className="content">{children}</Content>
      <Footer className="footer">
        <FooterActions />
      </Footer>
      {location.pathname === Routes.HOME ||
      location.pathname === Routes.SERVICES ||
      location.pathname === Routes.TEAM ? (
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
      ) : (
        ""
      )}
    </Layout>
  );
};
