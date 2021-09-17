import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import { ListOfCalls } from "../../components/ListOfCalls";
import { Search } from "../../components/Search";
import { deleteCall, listenLatestCalls } from "../../firebase/CallServices";
import { useCalls } from "../../hooks/usCalls";
import { CallData } from "../../types";

import { toTitleCase } from "../../utils/toTitleCase";

const CallSearcher = () => {
  const [calls, setCalls] = useState<CallData[]>([]);
  const [callsToLowerCase, setCallsToLowerCase] = useState<CallData[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<CallData[]>([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [searchText, setSearchText] = useState("");

  const allCalls = useCalls();

  const { confirm } = Modal;
  useEffect(() => {
    const unsubscribe = listenLatestCalls(setCalls);
    return () => unsubscribe && unsubscribe();
  }, []);

  useEffect(() => {
    const callsToLowerCase = allCalls?.map((call) => {
      const { posRequired, ageRequired } = call;
      const posRequiredToLowerCase = posRequired?.toLowerCase();
      const ageRequiredToLowerCase = ageRequired?.toLowerCase();
      return {
        ...call,
        posRequired: posRequiredToLowerCase,
        ageRequired: ageRequiredToLowerCase,
      };
    });
    setCallsToLowerCase(callsToLowerCase);
  }, [allCalls]);

  useEffect(() => {
    if (searchText) {
      const newListOfCalls = callsToLowerCase?.filter(
        (call) =>
          call.ageRequired?.includes(searchText.toLowerCase()) ||
          call.posRequired?.includes(searchText.toLowerCase())
      );

      const newListMapped = newListOfCalls?.map((call) => {
        const { posRequired, ageRequired } = call;
        const posRequiredToTitleCase = toTitleCase(posRequired)!;
        const ageRequiredToTitleCase = toTitleCase(ageRequired);
        return {
          ...call,
          posRequired: posRequiredToTitleCase,
          ageRequired: ageRequiredToTitleCase,
        };
      });
      setFilteredCalls(newListMapped);
    } else {
      setFilteredCalls(calls);
    }
  }, [callsToLowerCase, searchText, calls]);

  const showModal = () => {
    setIsVisibleModal(true);
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "¿Esta seguro que desea eliminar la convocatoria?",
      icon: <ExclamationCircleOutlined />,
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteCall(id);
        message.success("La convocatoria se eliminó correctamente!");
      },
      visible: isVisibleModal,
    });
  };

  return (
    <>
      <Search
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={"Buscar por categoria o posición"}
      />
      <ListOfCalls
        calls={filteredCalls}
        onShowModal={showModal}
        onShowDeleteConfirm={showDeleteConfirm}
      />
    </>
  );
};

export default CallSearcher;
