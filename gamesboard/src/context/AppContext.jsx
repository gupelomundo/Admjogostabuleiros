import { createContext, useState, useEffect, useCallback } from "react";
import * as UserService from "../service/user.services";
import * as GameService from "../service/game.services";

export const AppContext = createContext({
  games: [],
  loggedUser: {},
  authenticate: () => {},
});

export default function AppProvider({ children }) {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  const [error, setError] = useState(null);

  const throwError = (error) => {
    setError(error);

    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const authenticate = async (user) => {
    const response = await UserService.makeLogin(user);

    if (response?.error) {
      throwError(response.error);
      setLoggedUser({});
      return;
    }

    const {
      data: { user: userData },
    } = response;
    setLoggedUser(userData);
    return userData;
  };

  const clearFilter = () => {
    setFilteredGames(games);
  };

  const filterGames = (search) => {
    const filtered = games.filter((game) => {
      return game.name.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredGames(filtered);
  };

  const filterByCategory = (categories) => {
    const filtered = filteredGames.filter((game) => {
      return categories.includes(game.category.toLowerCase());
    });

    setFilteredGames(filtered);
  };
  const fetchAllGames = useCallback(async () => {
    const response = await GameService.getAllGames();
    if (response.error) {
      throwError(response.error);
      return;
    }
    const { data } = response;
    setGames(data);
    setFilteredGames(data);
  }, []);

  const fetchCategories = useCallback(async () => {
    const response = await GameService.getAllCategories();
    if (response.error) {
      throwError(response.error);
      return;
    }
    const { data } = response;
    setCategories(data.map((item) => item.category));
  }, []);

  const contextValue = {
    games,
    categories,
    loggedUser,
    authenticate,
    filterGames,
    clearFilter,
    filteredGames,
    setLoggedUser,
    filterByCategory,
    throwError,
    error,
  };

  useEffect(() => {
    fetchAllGames();
    fetchCategories();
  }, [fetchAllGames, fetchCategories]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
