import Carrinho from "../Carrinho";
import produtos from "../../../public/produtos.json";

export default function ShowCarrinho() {
  return (
    <div
      className={`bg-zinc-50  max-w-72 p-[22px]  shadow-Stone-900 shadow-md rounded-lg`}
    >
      <h1 className="text-stone-900 font-semibold text-base pb-4">
        Meu Carrinho
      </h1>
      <div className="border-t border-stone-900 w-[210px]"></div>
      <div className="flex flex-col justify-center overflow-y-auto h-full">
        {produtos.map((produto) => (
          <Carrinho key={produto.id} produto={produto} />
        ))}
      </div>
      <div className="border-t border-stone-900 w-[210px] mt-4"></div>
      <div className="flex flex-row pt-4">
        <h1 className="text-stone-900 font-semibold text-base pr-[14px]">
          Valor Total:{" "}
        </h1>
        <span className="text-blue-900 font-semibold text-base">R$ 440,00</span>
      </div>
    </div>
  );
}
