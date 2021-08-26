import { EditOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Tag, Typography } from "antd";
import { Club } from "../../types";
import "./styles.less";

interface ClubSportAchievementsProps {
  club: Club | undefined;
  onShowModal: () => void;
}

const { Text } = Typography;
const { Meta } = Card;

export const ClubSportAchievements = ({
  club,
  onShowModal,
}: ClubSportAchievementsProps) => {
  return (
    <Row justify="center">
      <Col className="photo_and_position" md={24} sm={24} xs={24}>
        <Card
          hoverable
          className="club_photo_card"
          actions={[<EditOutlined onClick={onShowModal} />]}
          cover={<img alt="" src={club?.coverURL} />}
        >
          <Meta
            avatar={<Avatar src={club?.avatarURL} />}
            title={club?.name}
            description={
              <>
                <Text>
                  <Text strong>{club?.socialName}</Text> con un total de{" "}
                  <Tag color="#315C79">{club?.totalWins}</Tag>
                  {""}
                  logros, de los cuales su logros máximos internacionales y
                  nacionales han sido{" "}
                  <Tag color="#315C79">{club?.maxIntGoal}</Tag> y {"  "}
                  <Tag color="#315C79">{club?.maxNacGoal}</Tag> respectivamente.
                </Text>
              </>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};
