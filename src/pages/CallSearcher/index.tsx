import { useEffect, useState } from "react";
import { ListOfCalls } from "../../components/ListOfCalls";
import { Search } from "../../components/Search";
import { listenLatestCalls } from "../../firebase/CallServices";
import { useCalls } from "../../hooks/usCalls";
import { CallData } from "../../types";

import { toTitleCase } from "../../utils/toTitleCase";

const CallSearcher = () => {
  const [calls, setCalls] = useState<CallData[]>([]);
  const [callsToLowerCase, setCallsToLowerCase] = useState<CallData[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<CallData[]>([]);

  const [searchText, setSearchText] = useState("");

  const allCalls = useCalls();

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

  return (
    <>
      <Search
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={"Buscar por categoria o posición"}
      />
      <ListOfCalls calls={filteredCalls} />
    </>
  );
};

export default CallSearcher;
