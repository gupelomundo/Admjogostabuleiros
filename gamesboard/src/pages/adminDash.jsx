import { Layout, Input } from "../components";
import { useDebounce } from "usehooks-ts";
import { useCallback, useEffect, useContext, useState } from "react";
import * as UserService from "../service/user.services";
import * as GameService from "../service/game.services";
import { AppContext } from "../context/AppContext";
import { Trash } from "@phosphor-icons/react";
import useUser from "../hooks/useUser";
export default function AdminDash() {
  const { throwError } = useContext(AppContext);
  const { loggedUser } = useUser();

  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [filteredUsers, setFilterdUsers] = useState([]);
  const [filteredGames, setFilterdGames] = useState([]);

  const [search, setSearch] = useState("");
  const [searchGames, setSearchGames] = useState("");

  const debounce = useDebounce(search, 500);
  const debounceGames = useDebounce(searchGames, 500);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeSearchGames = (e) => {
    setSearchGames(e.target.value);
  };

  const handleDeleteUser = async (email) => {
    const data = { email, adminEmail: loggedUser.email };

    const response = await UserService.deleteUser(data);
    console.log(response);
    if (response.error) {
      throwError(response.error);
      return;
    }

    setUsers(users.filter((user) => user.email !== email));
    setSearch("");
    setFilterdUsers(users);
  };

  const filterUsers = () => {
    const filtered = users.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilterdUsers(filtered);
  };

  const filterGames = () => {
    const filtered = games.filter((game) => {
      return game.name.toLowerCase().includes(searchGames.toLowerCase());
    });
    setFilterdGames(filtered);
  };

  const fetchGames = async () => {
    const response = await GameService.getAllGames();
    if (response.error) {
      throwError(response.error);
      return;
    }
    setGames(response.data);
    setFilterdGames(response.data);
  };

  const fetchUsers = useCallback(async () => {
    const response = await UserService.getAllUsers();
    if (response.error) {
      throwError(response.error);
      return;
    }
    setUsers(response.data);
    setFilterdUsers(response.data);
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchGames();
  }, []);

  useEffect(() => {
    // Filtra os jogos por termo de pesquisa
    filterUsers();
  }, [debounce]); // debounce é usado para evitar a chamada excessiva de filterGames

  useEffect(() => {
    // Filtra os jogos por termo de pesquisa
    filterGames();
  }, [debounceGames]); // debounce é usado para evitar a chamada excessiva de filterGames

  return (
    <Layout>
      <div className="p-6 h-[550px]">
        <div className="pb-10">
          <Input
            label="Usuários"
            type="text"
            placeholder="Buscar por nome"
            onChange={handleChangeSearch}
          />
        </div>
        <table className="table-auto h-[100px] overflow-scroll">
          <thead>
            <tr>
              <th className="w-72">Nome</th>
              <th className="w-72">Email</th>
              <th className="w-72">Tipo</th>
              <th className="w-72">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr
                key={user.email}
                className="odd:bg-slate-100 even:bg-slate-200"
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.authType}</td>
                <td className="text-center flex justify-center items-center">
                  <Trash
                    className="text-red-400 cursor-pointer"
                    size={24}
                    onClick={() => handleDeleteUser(user.email)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 h-[550px]">
        <div className="pb-10">
          <Input
            label="Jogos"
            type="text"
            placeholder="Buscar por nome"
            onChange={handleChangeSearchGames}
          />
        </div>
        <table className="table-auto h-[100px] overflow-scroll">
          <thead>
            <tr>
              <th className="w-72">Nome</th>
              <th className="w-72">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames?.map((game) => (
              <tr
                key={game.name}
                className="odd:bg-slate-100 even:bg-slate-200"
              >
                <td>{game.name}</td>
                <td>{game.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
