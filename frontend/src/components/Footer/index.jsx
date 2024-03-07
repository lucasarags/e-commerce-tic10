import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ProdutosContext } from "../../context/produtosContext";

function LeftInformation() {
  const infosPagina = [
    { id: 1, title: "Sobre o E-Rede Store", url: "/sobre" },
    { id: 2, title: "Segurança", url: "/segurança" },
    { id: 3, title: "Lista de desejos", url: "/lista-de-desejos" },
    { id: 4, title: "Trabalhe conosco", url: "/trabalhe-conosco" },
  ];

  return (
    <ul className="font-semibold text-[10px] min-w-32 text-white">
      <p className="pb-[14px]">Informações</p>
      {infosPagina.map((info) => (
        <li key={info.id} className="pl-[2px] pb-2">
          <Link to={info.url} className="text-slate-100 font-light">
            {info.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function RightInformation() {
  const infosCategoria = [
    { id: 1, title: "categoria", url: "/" },
    { id: 2, title: "categoria", url: "/" },
    { id: 3, title: "categoria", url: "/" },
    { id: 4, title: "categoria", url: "/" },
  ];
  return (
    <ul className="font-semibold text-[10px] min-w-32 text-white">
      <p className="pb-[14px]">Categorias</p>
      {infosCategoria.map((info) => (
        <li key={info.id} className="pl-[2px] pb-2">
          <Link to={info.url} className="text-slate-100 font-light">
            {info.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function LogoFooter() {
  return (
    <div className="flex flex-col gap-5 pb-5">
      <div className="flex gap-5">
        <img src={Logo} alt="" className="h-7" />
        <section className="text-[10px] text-slate-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          necessitatibus repellat, voluptatem! Nobis, ab!Perspiciatis
          necessitatibus Perspiciatis necessitatibus
        </section>
      </div>

      <section className="flex text-base gap-6 text-white">
        <FaFacebook />
        <FaInstagram />
        <FaWhatsapp />
      </section>
    </div>
  );
}

function LocationFooter() {
  return (
    <div className="text-[10px] text-white">
      <h1 className=" font-semibold py-[14px]">Localização</h1>
      <a
        href="https://g.co/kgs/9Nv6bKD"
        className="font-regular pb-2  text-slate-100"
        target="_blank"
        rel="noopener noreferrer"
      >
        Av. Treze de Maio, 1116, Bairro de Fátima, Fortaleza-CE
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-blue-900 p-6 flex flex-col ">
      <div className="flex flex-col md:flex-row md: md:gap-[60px] max-w-[1440px] mx-auto">
        <div className="max-w-[292px]">
          <LogoFooter />
        </div>
        <div className="flex md:gap-[60px]">
          <div className="flex-1">
            <LeftInformation />
          </div>
          <div className="flex-1">
            <RightInformation />
          </div>
        </div>
        <div className="flex-1">
          <LocationFooter />
        </div>
      </div>
      <hr className="mt-4 px-6" />
      <span className="mt-4 text-[10px] text-center text-white">
        2024 IREDE
      </span>
    </footer>
  );
}
