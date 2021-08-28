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
  onShowDeleteConfirm: (id: string) => void;
  onShowModal: () => void;
}

export const ListOfCalls = ({
  calls,
  onShowDeleteConfirm,
  onShowModal,
}: ListOfCallsProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calls?.length === 0 ? setLoading(true) : setLoading(false);
  }, [calls]);

  return (
    <div className="body_calls">
      <Row
        gutter={[16, 16]}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
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
                    <Title level={2} style={{ width: "100%" }}>
                      {call.posRequired}
                    </Title>
                  )
                }
                actions={[
                  <Link to={`/convocatorias/${call.id}`}>
                    <EyeOutlined key="watch" />
                  </Link>,
                  <DeleteOutlined
                    key="watch"
                    onClick={() => onShowDeleteConfirm(call.id!)}
                  />,
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
