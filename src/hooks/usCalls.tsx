import { useEffect, useState } from "react";
import { listenAllCalls } from "../firebase/CallServices";
import { CallData } from "../types";

export const useCalls = () => {
  const [allCalls, setAllCalls] = useState<CallData[]>([]);

  useEffect(() => {
    const unsubscribe = listenAllCalls(setAllCalls);
    return () => unsubscribe && unsubscribe();
  }, []);

  return allCalls;
};
