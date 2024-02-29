const endpoint = "http://localhost:3000/order";

export async function createOrder(order) {
  const response = await fetch(`${endpoint}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .catch((error) => error);

  return response;
}

export async function getOrders() {
  const response = await fetch(`${endpoint}/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => error);

  return response;
}
