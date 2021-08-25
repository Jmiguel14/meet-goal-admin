import { Typography } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import "./styles.less";

const { Title } = Typography;

const Calls = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Title>{id}</Title>
    </>
  );
};

export default Calls;
