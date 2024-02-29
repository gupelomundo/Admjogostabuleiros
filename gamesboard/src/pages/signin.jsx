import { useState, useCallback, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Input, Select } from "../components";
import * as UserService from "../service/user.services";
import useUser from "../hooks/useUser";
import { AppContext } from "../context/AppContext";
export default function SignIn() {
  const [disabled, setDisabled] = useState(false);
  const [firstTry, setFirstTry] = useState(true);
  const { throwError } = useContext(AppContext);
  const { setLoggedUser } = useUser();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    birthday: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    email: "",
    gender: "male",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const userHasValidData = useCallback(() => {
    let errors = {};
    if (!formData.email) {
      errors.email = "Email inválido";
    } else {
      errors.email = "";
    }

    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password inválido";
    } else {
      errors.password = "";
    }

    if (!formData.name) {
      errors.name = "Nome inválido";
    } else {
      errors.name = "";
    }

    if (!formData.birthday) {
      errors.birthday = "Data de nascimento inválida";
    } else {
      errors.birthday = "";
    }

    setErrors(errors);

    return !errors.email && !errors.password;
  }, [formData]);

  const formDataIsEmpty = useCallback(() => {
    return Object.keys(formData).every((key) => formData[key] === "");
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstTry(false);
    if (userHasValidData()) {
      const response = await UserService.makeSignIn(formData);
      if (response.error) {
        throwError(response.error);
        return;
      }

      setLoggedUser(response.data.user);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!firstTry && !formDataIsEmpty()) setDisabled(!userHasValidData());
  }, [formData, userHasValidData, formDataIsEmpty, firstTry]);

  return (
    <Layout>
      <div className="h-[750px] flex justify-center  items-center">
        <form className="flex justify-center items-center gap-4 flex-col rounded-xl border text-card-foreground shadow px-8 p-4 w-[380px] h-[full] min-h-96">
          <h2 className="text-2xl text-gray-700 self-start">Criar conta</h2>
          <Input
            type="text"
            label="Nome"
            placeholder="Felipe Santos"
            value={formData.name}
            name="name"
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Data de nascimento"
            type="date"
            placeholder="01/01/2000"
            value={formData.birthday}
            name="birthday"
            onChange={handleChange}
            error={errors.birthday}
          />
          <Select
            name="gender"
            onChange={handleChange}
            value={formData.gender}
            label="Genero"
          >
            <option value="male">Homem</option>
            <option value="female">Mulher</option>
            <option value="other">Outro</option>
          </Select>
          <Input
            label="Email"
            type="text"
            placeholder="exemplo@hotmail.com"
            value={formData.email}
            name="email"
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="*******"
            value={formData.password}
            name="password"
            onChange={handleChange}
            error={errors.password}
          />
          <hr className="w-full" />
          <button
            className="bg-lime-600 hover:bg-lime-700 disabled:bg-gray-300 text-gray-100 text-bolder  w-full h-12 rounded-lg ease-in-out transition-all duration-300"
            type="button"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Cadastrar
          </button>

          <hr />
          <p>
            Já tem uma conta?
            <Link to="/login" className="font-thin text-sm text-blue-400">
              {` Faça login`}
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
