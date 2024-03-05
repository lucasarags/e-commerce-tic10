import logo from "../../assets/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="h-[350px] bg-blue-900 p-6 text-[10px] leading-3">
      <section className="flex">
        <div>
          <img src={logo} alt="" className="h-7" />
          <div className="w-24 pt-6 pb-3 flex justify-between text-zinc-50 text-base">
            <FaFacebook />
            <FaInstagram />
            <FaWhatsapp />
          </div>
        </div>
        <p className="font-normal text-zinc-50">
          Lorem ipsum lorem ipsum lorem lorem ipsum lorem loram lorem lorem
          lorem ipsum ipsum ipsum
        </p>
      </section>
      <section className="flex flex-wrap text-slate-100 font-normal ">
        <div className="flex flex-col w-1/2 leading-loose">
          <h1 className="text-zinc-50 font-semibold pt-2 pb-1">Informações</h1>

          <a className="ml-0.5">Sobre o E-REDE Store</a>
          <a className="ml-0.5">Segurança</a>
          <a className="ml-0.5">Lista de desejos</a>
          <a className="ml-0.5">Trabalhe Conosco</a>
        </div>
        <div className="flex flex-col w-1/2 leading-loose">
          <h1 className="text-zinc-50 font-semibold pt-2 pb-1">Informações</h1>

          <a className="ml-0.5">Tênis</a>
          <a className="ml-0.5">Camisetas</a>
          <a className="ml-0.5">Acessórios</a>
          <a className="ml-0.5">Espostivo</a>
        </div>
        <div className="flex flex-col w-1/2 leading-loose">
          <h1 className="text-zinc-50 font-semibold pt-2 pb-1">Localização</h1>

          <h2>Rua Martinho Rodrigues, 331</h2>
          <h2>Bairro de Fátima, Fortaleza-CE</h2>
        </div>
      </section>
      <div className="border-t-[1px] color-zinc my-4"></div>
      <p className="text-center text-zinc-50 text-[10px] leading-3 font-normal ">
        2023 Irede
      </p>
    </footer>
  );
}
