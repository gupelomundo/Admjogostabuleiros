import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function useGames() {
  const {
    games,
    filteredGames,
    filterGames,
    clearFilter,
    categories,
    filterByCategory,
  } = useContext(AppContext);

  return {
    games,
    filteredGames,
    categories,
    filterByCategory,
    filterGames,
    clearFilter,
  };
}
