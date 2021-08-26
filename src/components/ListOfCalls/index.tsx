import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Col, Row, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CallData } from "../../types";
import "./styles.less";

const { Meta } = Card;

interface ListOfCallsProps {
  calls: CallData[];
}

export const ListOfCalls = ({ calls }: ListOfCallsProps) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    calls?.length === 0 ? setLoading(true) : setLoading(false);
  }, [calls]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {calls.map((call: CallData, index: number) => {
          return (
            <Col
              md={{ span: "6" }}
              xs={{ span: "24" }}
              key={index}
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Card
                className="card_calls_details"
                key={index}
                cover={
                  loading ? (
                    <Skeleton.Image className="img_skeleton" />
                  ) : (
                    <Title level={2}>{call.posRequired}</Title>
                  )
                }
                actions={[
                  <Link to={`/convocatorias/${call.id}`}>
                    <EyeOutlined key="watch" />
                  </Link>,
                  <DeleteOutlined />,
                ]}
              >
                <Skeleton loading={loading} active>
                  <Meta title={call.ageRequired} />
                </Skeleton>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
