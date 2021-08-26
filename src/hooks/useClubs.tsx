import { useEffect, useState } from "react";
import { listenAllClubs } from "../firebase/ClubServices";
import { Club } from "../types";

export const useClubs = () => {
  const [allClubs, setAllClubs] = useState<Club[]>([]);

  useEffect(() => {
    const unsubscribe = listenAllClubs(setAllClubs);
    return () => unsubscribe && unsubscribe();
  }, []);

  return allClubs;
};
