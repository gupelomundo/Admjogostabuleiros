import { SignIn, Password, User } from "@phosphor-icons/react";
import useUser from "../../hooks/useUser";
import { useNavigate, Link } from "react-router-dom";
export default function Layout(props) {
  const { loggedUser } = useUser();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToPerfil = () => {
    navigate("/profile");
  };

  const goToCreateAccount = () => {
    navigate("/signin");
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col ">
        <header className="flex w-screen h-20 bg-gray-100 border-b-2 border-indigo-400">
          <Link to="/" className="text-indigo-400 text-lg p-6">
            Home
          </Link>
          {loggedUser.authType === "admin" && (
            <Link to="/dash" className="text-indigo-400 text-lg p-6">
              Dashboard
            </Link>
          )}
          {loggedUser.authType === "admin" && (
            <Link to="/orders" className="text-indigo-400 text-lg p-6">
              Pedidos
            </Link>
          )}
          <nav className="w-screen flex items-center justify-end">
            <div className="flex flex-row  w-[400px] justify-evenly">
              <button
                onClick={goToCreateAccount}
                className="text-gray-800 bg-slate-200/50 flex w-36 p-2 rounded-md  border-r-2 border-indigo-500	"
              >
                Criar conta <SignIn size={24} className="ml-2" />
              </button>
              {loggedUser.name ? (
                <button
                  onClick={goToPerfil}
                  className="text-gray-100 bg-indigo-500 flex justify-between flex-row w-36 p-2 rounded-md  border-r-2 border-gray-100"
                >
                  Perfil
                  <User size={24} />
                </button>
              ) : (
                <button
                  onClick={goToLogin}
                  className="text-gray-100 bg-indigo-500 flex justify-between flex-row w-36 p-2 rounded-md  border-r-2 border-gray-100"
                >
                  Login
                  <Password size={24} />
                </button>
              )}
            </div>
          </nav>
        </header>
        <div>{props?.children}</div>
        <footer className="flex w-screen h-20 bg-[#212121] justify-center items-center">
          <p className="text-gray-100">© 2024 - All rights reserved</p>
        </footer>
      </div>
    </>
  );
}
