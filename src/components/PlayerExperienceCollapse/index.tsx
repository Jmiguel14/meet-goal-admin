import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Collapse, Table, Typography } from "antd";
import { PlayerExperience } from "../../types";

const { Panel } = Collapse;
const { Text } = Typography;

interface playerExperienceCollapseProps {
  playerExperience: PlayerExperience[] | undefined;
  onShowPlayerExperienceModal: (experience: PlayerExperience) => void;
  onShowDeleteConfirm: (singleExperience: PlayerExperience) => void;
}

export const PlayerExperienceCollapse = ({
  playerExperience,
  onShowPlayerExperienceModal,
  onShowDeleteConfirm,
}: playerExperienceCollapseProps) => {
  const columns = [
    {
      title: "Nombre del club",
      dataIndex: "clubName",
      key: "clubName",
    },
    {
      title: "Temporada",
      dataIndex: "season",
      key: "season",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const data = playerExperience?.map((singleExperience, index) => {
    return {
      key: index,
      clubName: singleExperience.clubName,
      season: singleExperience.season,
      actions: (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => onShowPlayerExperienceModal(singleExperience)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onShowDeleteConfirm(singleExperience)}
          />
        </>
      ),
    };
  });
  return (
    <Collapse
      defaultActiveKey={["1"]}
      style={{ width: "100%", borderRadius: "10px" }}
    >
      <Panel header={<Text strong={true}>Experincia</Text>} key="1">
        <Table pagination={false} columns={columns} dataSource={data} />
      </Panel>
    </Collapse>
  );
};
