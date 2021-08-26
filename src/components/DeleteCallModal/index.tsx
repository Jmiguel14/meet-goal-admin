import { message, Modal } from "antd";
import React from "react";
import { deleteCall } from "../../firebase/CallServices";

interface DeleteCallProps {
  setIsVisibleModal: (value: React.SetStateAction<boolean>) => void;
  isVisibleModal: boolean;
  callId: string | undefined;
}

export const DeleteCallModal = ({
  setIsVisibleModal,
  isVisibleModal,
  callId,
}: DeleteCallProps) => {
  const DeleteAction = () => {
    try {
      deleteCall(callId);
      message.success("La convocatoria se elimino exitosamente!");
    } catch (e) {
      message.error(`Ocurrio un error del tipo ${e}`);
    }
    setIsVisibleModal(false);
  };
  return (
    <Modal
      bodyStyle={{ height: "100%" }}
      onCancel={() => {
        setIsVisibleModal(false);
      }}
      visible={isVisibleModal}
      onOk={DeleteAction}
      title="Eliminar convocatoria"
    >
      <br />
      <p>¿Estas seguro de eliminar la convocatoria?</p>
    </Modal>
  );
};
