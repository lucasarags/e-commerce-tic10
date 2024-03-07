import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import api from "../../api/index";

export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCadastroUsuario = async () => {
    try {
      const data = await api.cadastrarUsuario(nome, email, senha);
      console.log("Usuário cadastrado:", data);
      setMensagem("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
      setMensagem("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <div className=" flex flex-col bg-blue-900 h-screen md:flex-row relative items-center   font-Inter text-base">
      <section className="h-3/4 md:h-screen  md:w-1/2  md:bg-slate-100 absolute md:relative mt-20 md:mt-0   flex items-center justify-center">
        <div className="flex flex-col bg-white h-auto w-[304px] items-center justify-center ">
          <h1 className="text-2xl font-semibold py-2 md:text-left">
            Cadastre-se
          </h1>
          {mensagem && <p className="px-7 text-red-500">{mensagem}</p>}
          <label className="text-base font-semibold w-full px-7">Nome*</label>
          <input
            placeholder="Digite seu nome"
            className="h-8 px-2 w-64 border mt-2 mb-3  bg-slate-100 text-stone-500 text-base font-medium leading-4 rounded-lg "
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label className="text-base font-semibold w-full px-7">E-mail*</label>
          <input
            placeholder="Digite seu e-mail"
            className="h-8 px-2 w-64 border mt-2 mb-3 text-stone-500 bg-slate-100  text-base font-medium leading-4 rounded-lg "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-base font-semibold w-full px-7">Senha*</label>
          <input
            placeholder="Digite sua senha"
            className="h-8 px-2 w-64 border mt-2 mb-3  bg-slate-100 text-stone-500 text-base font-medium leading-4 rounded-lg "
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            className=" bg-orange-600 h-[60px] w-64 bottom-7  text-base font-semibold leading-5 text-white rounded-lg "
            onClick={handleCadastroUsuario}
          >
            Cadastrar
          </button>
          <div className="flex justify-center pt-2 pb-8">
            <h2 className="px-1">Já possui cadastro?</h2>
            <Link to="/Login">
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
