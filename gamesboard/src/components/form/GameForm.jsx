import { useState, useEffect, useContext } from "react";
import { Input, Select } from "../../components";
import useGames from "../../hooks/useGames";
import useUser from "../../hooks/useUser";
import * as GameService from "../../service/game.services";
import { AppContext } from "../../context/AppContext";

export default function GameForm(props) {
  const { editGame } = props;
  const { categories } = useGames();
  const { loggedUser } = useUser();
  const { throwError } = useContext(AppContext);
  const [hasChanged, setHasChanged] = useState(false);
  const [game, setGame] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });

  const handleSave = async () => {
    const response = await GameService.createGame({
      ...game,
      authorEmail: loggedUser.email,
    });

    if (response.error) {
      throwError(response.error);
      return;
    }
  };

  const handleChange = (event) => {
    if (!hasChanged) setHasChanged(true);
    setGame({
      ...game,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form>
      <Input
        label="Nome"
        type="text"
        name="name"
        value={game.name}
        placeholder="Nome"
        required
        onChange={handleChange}
      />
      <Input
        label="Descrição"
        type="text"
        name="description"
        value={game.description}
        placeholder="Lorem ipsum"
        onChange={handleChange}
      />
      <Input
        label="Preço"
        type="number"
        placeholder="100.00"
        value={game.price}
        name="price"
      />
      <Select name="gender" value={game.category} label="Genero">
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <Input
        label="Imagem"
        type="file"
        name="image"
        value={game.image}
        required
        onChange={handleChange}
      />

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
