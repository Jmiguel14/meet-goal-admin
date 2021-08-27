import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Collapse, Table, Typography } from "antd";
import { PlayerInjury } from "../../types";

const { Panel } = Collapse;
const { Text } = Typography;

interface playerInnjuriesCollapseProps {
  playerInjuries: PlayerInjury[] | undefined;
  onShowPlayerInjuryModal: (injury: PlayerInjury) => void;
  onShowDeleteConfirm: (injury: PlayerInjury) => void;
}

export const PlayerInjuriesCollapse = ({
    playerInjuries,
    onShowPlayerInjuryModal,
    onShowDeleteConfirm,
}: playerInnjuriesCollapseProps) => {
  const columns = [
    {
      title: "Nombre de la lesión",
      dataIndex: "injuryName",
      key: "injurieName",
    },
    {
      title: "Tiempo de recuperación",
      dataIndex: "recoveryTime",
      key: "recoveryTime",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const data = playerInjuries?.map((injury, index) => {
    return {
      key: index,
      injuryName: injury.injuryName,
      recoveryTime: injury.recoveryTime,
      actions: (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => onShowPlayerInjuryModal(injury)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onShowDeleteConfirm(injury)}
          />
        </>
      ),
    };
  });
  return (
    <Collapse
      defaultActiveKey={["1"]}
      style={{ width: "100%", borderRadius: "10px", margin: "15px 0px"}}
    >
      <Panel header={<Text strong={true}>Lesiones</Text>} key="1">
        <Table pagination={false} columns={columns} dataSource={data} />
      </Panel>
    </Collapse>
  );
};
