import { Link } from "react-router-dom";
import { ArrowArcLeft } from "@phosphor-icons/react";
import notfound from "../assets/notfound.svg";
import { Layout } from "../components";
export default function NotFound() {
  return (
    <Layout>
      <div className="w-full h-[820px] flex justify-center items-center flex-col gap-2">
        <img src={notfound} alt="404" className="w-48 h-48" />
        <h1 className="text-3xl text-gray-700">
          Desculpe o que você estava procurando mesmo?
        </h1>
        <Link
          to="/"
          className="text-indigo-400 hover:text-indigo-500 text-xl flex gap-2"
        >
          <ArrowArcLeft size={32} />
          Voltar para a página inicial
        </Link>
      </div>
    </Layout>
  );
}
