const endpoint = "http://localhost:3000/game";

export const getAllGames = async () => {
  const response = await fetch(`${endpoint}/list`);
  const data = await response.json();

  return data;
};

export const getAllCategories = async () => {
  const response = await fetch(`${endpoint}/list-categories`);
  const data = await response.json();

  return data;
};

export const createGame = async (game) => {
  const response = await fetch(`${endpoint}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });

  const data = await response.json();

  return data;
};
