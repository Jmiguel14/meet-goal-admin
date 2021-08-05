import { Col, Row, Space, Spin } from "antd";
import React from "react";
import "./styles.less";

type LoadingProps = {
  size: "small" | "large" | "default" | undefined;
};

export const Loading = ({ size }: LoadingProps) => {
  return (
    <Row className="loading">
      <Col>
        <Space size="middle">
          <Spin size={size} />
        </Space>
      </Col>
    </Row>
  );
};
