import { Layout } from "../components/";
import * as OrderService from "../service/order.services";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { throwError } = useContext(AppContext);

  useEffect(() => {
    const getOrders = async () => {
      const response = await OrderService.getOrders();
      if (response.error) {
        throwError(response.error);
        return;
      }
      setOrders(response.data);
      console.log(response.data);
    };
    getOrders();
  }, [throwError]);

  return (
    <Layout>
      <h1>Pedidos</h1>
      <div className="w-full h-[650px]">
        <table className="w-[400px] h-[100px]">
          <thead>
            <tr>
              <th>Jogo</th>
              <th>Usuario</th>
              <th>Preço</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="odd:bg-slate-100 even:bg-slate-200">
                <td>{order.game.name}</td>
                <td>{order.user.name}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
