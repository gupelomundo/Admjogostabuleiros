import { useState, useEffect } from "react";
import { useDebounce } from "usehooks-ts";
import { Link } from "react-router-dom";
import { Layout, Card, Input } from "../components";
import useGames from "../hooks/useGames";

export default function Home() {
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search, 500);
  const { filteredGames, filterGames, categories, filterByCategory } =
    useGames();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChangeCategory = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((category) => category !== value)
      );
    }
  };

  const showGames = () => {
    if (selectedCategories.length === 0) {
      return filteredGames.map((game) => <Card key={game.id} game={game} />);
    }

    return filterByCategory(selectedCategories).map((game) => (
      <Card key={game.id} game={game} />
    ));
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // Filtra os jogos por termo de pesquisa
    filterGames(search);
  }, [debounce]); // debounce é usado para evitar a chamada excessiva de filterGames

  return (
    <Layout>
      <div className="w-screen">
        <main className="flex ">
          <aside className="w-1/4 bg-slate-200 p-6">
            <h3 className="text-xl font-bolder">Categorias</h3>
            <div className="pl-4">
              {categories.map((category) => (
                <div key={category}>
                  <Input
                    onChange={handleChangeCategory}
                    type="checkbox"
                    className="hover:text-indigo-500"
                    label={category}
                    value={category}
                    checked={selectedCategories.includes(category)}
                  />
                </div>
              ))}
            </div>
          </aside>
          <section className="p-6 w-3/4">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-2/4 flex justify-center items-center">
                <Input
                  type="text"
                  placeHolder="Pesquisar"
                  onChange={handleChangeSearch}
                  value={search}
                />
              </div>
              {filteredGames.length === 0 && <p>Carregando...</p>}
              <div className="w-[960px] flex flex-col flex-wrap p-12 gap-6 h-full min-h-[750px] lg:flex-row">
                {filteredGames.map((game) => (
                  <Card key={game.id} game={game} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
