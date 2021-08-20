import { useEffect, useState } from "react";
import { listenAllPlayers } from "../firebase/PlayerServices";
import { Player } from "../types";

export const usePlayers = () => {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const unsubscribe = listenAllPlayers(setAllPlayers);
    return () => unsubscribe && unsubscribe();
  }, []);

  return allPlayers;
};
