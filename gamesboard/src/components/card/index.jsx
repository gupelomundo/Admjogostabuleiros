import * as OrderService from "../../service/order.services";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

export default function Card(props) {
  const { loggedUser } = useUser();
  const { throwError } = useContext(AppContext);
  const navigation = useNavigate();

  const {
    game: { name, description, price, image, id },
  } = props;
  const getValueInCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };
  const handleOrder = async () => {
    if (!loggedUser.name) {
      navigation("/login");
      return;
    }

    const response = await OrderService.createOrder({
      gameId: id,
      userId: loggedUser.id,
      price,
      status: "pending",
    });

    if (response.error) {
      throwError(response.error);
      return;
    }

    navigation("/orders");
  };
  return (
    <div className="w-64 h-auto max-h-[350px]  gap-4 flex-col rounded-xl border text-card-foreground shadow  text-ellipsis	">
      <h6 className="text-xl self-start pt-4 pl-4 text-gray-700">{name}</h6>
      <img className="w-full h-40 object-cover" src={image} alt={name} />
      <p className=" pl-4 pt-4 pr-4 font-thin text-gray-500 h-12 w-full text-ellipsis overflow-hidden">
        {description}
      </p>
      <p className="w-full text-2xl text-lime-900 pl-4 pb-4">
        {getValueInCurrency(price)}
      </p>
      <button
        className="bg-lime-600 hover:bg-lime-700 disabled:bg-gray-300 text-gray-100 text-bolder  w-full h-12 rounded-lg ease-in-out transition-all duration-300"
        type="button"
        onClick={handleOrder}
      >
        Reservar
      </button>
    </div>
  );
}
