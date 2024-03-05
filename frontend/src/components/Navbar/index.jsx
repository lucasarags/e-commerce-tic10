import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ showMob, setShowMob }) {
  return (
    <nav>
      <ul
        className={`w-full gap-10 justify-center hidden md:flex py-6 text-base font-semibold text-zinc-50`}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/produtos">Produtos</Link>
        </li>
        <li>
          <Link to="/categorias">Categorias</Link>
        </li>
        <li>
          <Link to="/meus-pedidos">Meus Pedidos</Link>
        </li>
      </ul>

      {/* Menu mobile */}
      <div
        className={` ${
          showMob ? "flex" : "hidden"
        } w-screen peer-focus:hidden fixed top-0 left-0 z-50`}
        onClick={() => setShowMob(false)}
      >
        <div className="w-full  bg-black opacity-40"></div>
        <div className=" md:hidden w-full max-w-[264px] p-6 bg-white opacity-100 flex flex-col ">
          <h1 className="text-black font-semibold">Páginas</h1>
          <div className="border-t border-stone-900 w-[210px] mt-4"></div>
          <ul className="flex-1 flex flex-col text-xs font-semibold p-4 ">
            <li className="">
              <Link to="/">Home</Link>
            </li>
            <li className="pt-4">
              <Link to="/produtos">Produtos</Link>
            </li>
            <li className="pt-4">
              <Link to="/categorias">Categorias</Link>
            </li>
            <li className="py-4">
              <Link to="/meus-pedidos">Meus Pedidos</Link>
            </li>
          </ul>
          <div className="border-t border-stone-900 w-[210px] my-4"></div>
          <div className="flex flex-row items-center gap-4 px-[11px]">
            <h1 className="text-xs font-semibold">Cadastra-se</h1>
            <button className="bg-blue-900 h-[30px] w-[106px] bottom-7 text-xs font-medium  text-white rounded-lg">
              Entrar
            </button>
          </div>
          <div className="h-screen"></div>
        </div>
      </div>
    </nav>
  );
}
