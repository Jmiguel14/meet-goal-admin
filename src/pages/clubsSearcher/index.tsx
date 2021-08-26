import { useEffect, useState } from "react";
import { Club } from "../../types";
import { Search } from "../../components/Search";
import { toTitleCase } from "../../utils/toTitleCase";
import { useClubs } from "../../hooks/useClubs";
import { listenLatestClubs } from "../../firebase/ClubServices";
import { ListOfClubs } from "../../components/ListOfClubs";

const ClubsSearcher = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [clubsToLowerCase, setClubsToLowerCase] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);

  const [searchText, setSearchText] = useState("");

  const allClubs = useClubs();

  useEffect(() => {
    const unsubscribe = listenLatestClubs(setClubs);
    return () => unsubscribe && unsubscribe();
  }, []);

  useEffect(() => {
    const clubsToLowerCase = allClubs?.map((club) => {
      const { name } = club;
      const nameToLowerCase = name?.toLowerCase();
      return {
        ...club,
        name: nameToLowerCase,
      };
    });
    setClubsToLowerCase(clubsToLowerCase);
  }, [allClubs]);

  useEffect(() => {
    if (searchText) {
      const newListOfClubs = clubsToLowerCase?.filter((player) =>
        player.name?.includes(searchText.toLowerCase())
      );

      const newListMapped = newListOfClubs?.map((club) => {
        const { name } = club;
        const nameToTitleCase = toTitleCase(name)!;
        return {
          ...club,
          name: nameToTitleCase,
        };
      });
      setFilteredClubs(newListMapped);
    } else {
      setFilteredClubs(clubs);
    }
  }, [clubsToLowerCase, searchText, clubs]);

  return (
    <>
      <Search
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Buscar por nombre"
      />
      <ListOfClubs clubs={filteredClubs} />
    </>
  );
};

export default ClubsSearcher;
