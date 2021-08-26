import { useEffect, useState } from "react";
import { ListOfPlayers } from "../../components/ListOfPlayers";
import { listenLatestPlayers } from "../../firebase/PlayerServices";
import { usePlayers } from "../../hooks/usePlayers";
import { Player } from "../../types";
import { Search } from "../../components/Search";
import { toTitleCase } from "../../utils/toTitleCase";

const PlayersSearcher = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersToLowerCase, setPlayerToLowerCase] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPayers] = useState<Player[]>([]);

  const [searchText, setSearchText] = useState("");

  const allPlayers = usePlayers();
  
  useEffect(() => {
    const unsubscribe = listenLatestPlayers(setPlayers);
    return () => unsubscribe && unsubscribe();
  }, []);

  useEffect(() => {
    const playersToLowerCase = allPlayers?.map((player) => {
      const { name, pospri } = player;
      const nameToLowerCase = name?.toLowerCase();
      const pospriToLowerCase = pospri?.toLowerCase();
      return {
        ...player,
        name: nameToLowerCase,
        pospri: pospriToLowerCase,
      };
    });
    setPlayerToLowerCase(playersToLowerCase);
  }, [allPlayers]);

  useEffect(() => {
    if (searchText){

      const newListOfPlayers = playersToLowerCase?.filter(
        (player) =>
          player.name?.includes(searchText.toLowerCase()) ||
          player.pospri?.includes(searchText.toLowerCase())
      );
  
      const newListMapped = newListOfPlayers?.map((player) => {
        const { name, pospri } = player;
        const nameToTitleCase = toTitleCase(name)!;
        const pospriToTitleCase = toTitleCase(pospri);
        return {
          ...player,
          name: nameToTitleCase,
          pospri: pospriToTitleCase,
        };
      });
      setFilteredPayers(newListMapped);
    } else {
      setFilteredPayers(players)
    }
  }, [playersToLowerCase, searchText, players]);

  return (
    <>
      <Search onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por nombre o posición"/>
      <ListOfPlayers players={filteredPlayers} />
    </>
  );
};

export default PlayersSearcher;
