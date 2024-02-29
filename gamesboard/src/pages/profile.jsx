import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import { Layout } from "../components";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import UserForm from "../components/form/UserForm";
import GameForm from "../components/form/GameForm";

export default function Profile() {
  const { loggedUser } = useUser();

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center w-full h-[800px] gap-4">
        <h1 className="text-4xl text-gray-700">Perfil</h1>
        <Link
          to="/"
          className="self-start text-indigo-500 flex justify-center items-center flex-row  p-2 "
        >
          <ArrowCircleLeft size={32} />
          Voltar
        </Link>
        <div className="flex justify-center items-center gap-6">
          <UserForm loadFromLoggedUser />
          <div></div>
        </div>
      </main>
    </Layout>
  );
}
