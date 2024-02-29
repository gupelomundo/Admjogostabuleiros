import { Input, Select } from "../../components";
import useUser from "../../hooks/useUser";
import { useContext, useEffect, useState } from "react";
import formatDate from "../../utils/formatDate";
import * as UserService from "../../service/user.services";
import { AppContext } from "../../context/AppContext";
export default function UserForm(props) {
  const { loadFromLoggedUser } = props;
  const { loggedUser, setLoggedUser } = useUser();
  const [user, setUser] = useState(loadFromLoggedUser || {});
  const [hasChanged, setHasChanged] = useState(false);
  const { throwError } = useContext(AppContext);

  const handleSave = () => {
    const response = UserService.updateUser(user);
    if (response.error) {
      throwError(response.error);
      return;
    }
    setHasChanged(false);
    setLoggedUser(response.data.user);
  };

  const handleChange = (event) => {
    if (!hasChanged) setHasChanged(true);
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (loadFromLoggedUser) {
      setUser(loggedUser);
    }
  }, [loadFromLoggedUser, loggedUser]);

  return (
    <form>
      <Input
        label="Nome"
        type="text"
        name="name"
        value={user.name}
        placeholder="Nome"
        required
        onChange={handleChange}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={user.email}
        placeholder="exemplo@hotmail.com"
        required
        onChange={handleChange}
      />
      {/* <Input
        label="Senha"
        type="password"
        name="password"
        value={user.password}
        required
        onChange={handleChange}
      /> */}
      <Input
        label="Data de nascimento"
        type="date"
        placeholder="01/01/2000"
        value={formatDate(user.birthday)}
        name="birthday"
      />

      <Select name="gender" value={user.gender} label="Genero">
        <option value="male">Homem</option>
        <option value="female">Mulher</option>
        <option value="other">Outro</option>
      </Select>
      <button
        type="button"
        disabled={!hasChanged}
        className=" my-2 bg-lime-600 hover:bg-lime-700 disabled:bg-gray-300 text-gray-100 text-bolder  w-full h-12 rounded-lg ease-in-out transition-all duration-300"
        onClick={handleSave}
      >
        Salvar
      </button>
    </form>
  );
}
