import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Layout } from "../components";
import useUser from "../hooks/useUser";

export default function Login() {
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [firstTry, setFirstTry] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { authenticate } = useUser();
  const [userName, setUserName] = useState("");
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const userHasValidData = useCallback(
    (whitoutFirstTry = true) => {
      if (!whitoutFirstTry) {
        if (firstTry) return true;
      }
      let errors = { email: "", password: "" };
      if (!user.email) {
        errors.email = "Email inválido";
      } else {
        errors.email = "";
      }

      if (!user.password || user.password.length < 6) {
        errors.password = "Password inválido";
      } else {
        errors.password = "";
      }

      setError(errors);

      return !errors.email && !errors.password;
    },
    [user, firstTry]
  );

  const handleSubmit = async () => {
    setFirstTry(false);
    if (userHasValidData(true)) {
      const userData = await authenticate(user);
      if (!userData) return;

      setUserName(userData.name);
      setShowCongratulations(true);
      setTimeout(() => navigate("/"), 1500);
    }
  };

  useEffect(() => {
    setDisabled(firstTry ? false : !userHasValidData());
  }, [user, userHasValidData, firstTry]);

  return (
    <Layout>
      {showCongratulations ? (
        <div className="w-full h-[800px] text-2xl flex justify-center items-center">{`Bem vindo de volta ${userName}`}</div>
      ) : (
        <div className="h-[750px] flex justify-center  items-center">
          <form className="flex justify-center items-center gap-4 flex-col rounded-xl border text-card-foreground shadow px-8 p-4 w-[380px] h-[full] min-h-96">
            <h2 className="text-2xl text-gray-700 self-start">Entrar</h2>
            <Input
              label="Email"
              type="email"
              name="email"
              required={true}
              value={user.email}
              placeHolder="example@hotmail.com"
              onChange={handleChange}
              error={error.email}
            />
            <Input
              label="Senha"
              type="password"
              required={true}
              placeholder="*******"
              name="password"
              value={user.password}
              onChange={handleChange}
              error={error.password}
            />
            <button
              className="bg-lime-600 hover:bg-lime-700 disabled:bg-gray-300 text-gray-100 text-bolder  w-full h-12 rounded-lg ease-in-out transition-all duration-300"
              type="button"
              onClick={handleSubmit}
              disabled={disabled}
            >
              Entrar
            </button>
            <hr className="w-full" />
            <div className="w-full font-light">
              Ainda não tem uma conta?
              <Link className="font-thin text-sm text-indigo-400" to="/signin">
                {` Cadastre-se`}
              </Link>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
}
