const endpoint = "http://localhost:3000";

export const makeLogin = async (user) => {
  if (!user.email || !user.password) {
    console.log("Usuário ou senha inválidos");
    return {};
  }

  const response = await fetch(`${endpoint}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log("Error: ", err));
  console.log(response);
  return response;
};

export const makeSignIn = async (user) => {
  if (!user.email || !user.password) {
    console.log("Usuário ou senha inválidos");
    return {};
  }

  const response = await fetch(`${endpoint}/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => err);
  return response;
};

export const getAllUsers = async () => {
  const response = await fetch(`${endpoint}/user/list`)
    .then((res) => res.json())
    .catch((err) => err);
  return response;
};

export const deleteUser = async (userData) => {
  const response = await fetch(`${endpoint}/user/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .catch((err) => err);
  return response;
};

export const updateUser = async (userData) => {
  const response = await fetch(`${endpoint}/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .catch((err) => err);
  return response;
};
