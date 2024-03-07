import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UsersContext } from "../../context/userContext";
import api from "../../api/index";
import logo from "../../assets/logo.png";

export default function LoginUsuario() {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser, setToken } = useContext(UsersContext);
  const navigate = useNavigate();

  async function handleLogin() {
    const response = await api.login(userLogin.email, userLogin.password);
    const result = await response;
    if (!result.value) {
      setErrorMessage(
        "Erro ao fazer login. Por favor, verifique suas credenciais."
      );
      return;
    }
    setToken(result.token);
    setUser({
      name: result.value.nameUser,
      email: result.value.emailUser,
      idUser: result.value.idUser,
    });
    navigate("/");
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleInfoChanges(event, field) {
    setUserLogin({ ...userLogin, [field]: event.target.value });
  }

  return (
    <div className=" flex flex-col bg-blue-900 h-screen md:flex-row relative items-center   font-Inter text-base">
      <section className="h-3/4 md:h-screen  md:w-1/2  md:bg-slate-100 absolute md:relative mt-20 md:mt-0   flex items-center justify-center">
        <div className="flex flex-col bg-white h-auto w-[304px] items-center justify-center">
          <h1 className="text-2xl font-semibold py-2">Fazer Login</h1>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <label className="text-base font-semibold w-full px-7">E-mail*</label>
          <input
            placeholder="Digite seu e-nome"
            className="h-8 px-2 w-64 border mt-2 mb-3 text-stone-500 bg-slate-100  text-base font-medium leading-4 rounded-lg "
            value={userLogin.email}
            onChange={(e) => handleInfoChanges(e, "email")}
          />
          <label className="text-base font-semibold w-full px-7">Senha*</label>
          <input
            placeholder="Digite sua senha"
            className="h-8 px-2 w-64 border mt-2 mb-3  bg-slate-100 text-stone-500 text-base font-medium leading-4 rounded-lg "
            type="password"
            value={userLogin.password}
            onChange={(e) => handleInfoChanges(e, "password")}
          />
          <button
            className=" bg-orange-600 h-[60px] w-64 bottom-7  text-base font-semibold leading-5 text-white rounded-lg "
            onClick={handleLogin}
          >
            Fazer Login
          </button>
          <div className="flex justify-center pt-2 pb-8">
            <h2 className="px-1">Já possui cadastro?</h2>
            <Link to="/Cadastro">
              <h2>Clique aqui</h2>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-azul-escuro text-white h-screen w-screen flex flex-col justify-start md:justify-center items-center md:w-1/2">
        <div className="flex flex-col md:h-36 md:w-72 items-start md:items-center">
          <p className="hidden md:flex text-xl">
            Sua nova experiência em compras online
          </p>
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-8 my-10 md:my-0 md:h-28 mx-auto"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
