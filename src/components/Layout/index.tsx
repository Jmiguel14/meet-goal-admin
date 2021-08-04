import React from "react";
import { Button, Col, Layout, Popover, Row } from "antd";
import "./styles.less";
import MeetGoalIcon from "../../icons/MeetGoalIcon";
import { Navigation } from "../Navigation";
import MenuIcon  from "../../icons/MenuIcon";

const { Header, Content, Footer } = Layout;

export const MainLayout: React.FC = ({ children }) => {
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
              <Button type='primary'>
                <MenuIcon />
              </Button>
            </Popover>
          </Col>
        </Row>
      </Header>
      <Content className="content">{children}</Content>
      <Footer className="footer"></Footer>
    </Layout>
  );
};
