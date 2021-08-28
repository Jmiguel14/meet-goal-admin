import { EyeOutlined } from "@ant-design/icons";
import { Card, Col, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Club } from "../../types";
import "./styles.less";

const { Meta } = Card;

interface ListOfClubsProps {
  clubs: Club[];
}

export const ListOfClubs = ({ clubs }: ListOfClubsProps) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    clubs?.length === 0 ? setLoading(true) : setLoading(false);
  }, [clubs]);

  return (
    <div className="list_of_clubs">
      <Row
        gutter={[16, 16]}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {clubs.map((club: Club, index: number) => {
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
                className="clubs_card"
                key={index}
                cover={
                  loading ? (
                    <Skeleton.Image className="img_skeleton" />
                  ) : (
                    <img alt="" className="card_image" src={club.avatarURL} />
                  )
                }
                actions={[
                  <Link to={`/clubes/${club.id}`}>
                    <EyeOutlined key="watch" />,
                  </Link>,
                ]}
              >
                <Skeleton loading={loading} active>
                  <Meta title={club.name} description={club.socialName} />
                </Skeleton>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
