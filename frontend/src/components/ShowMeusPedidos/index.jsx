import MeusPedidos from "../MeusPedidos";
import produtos from "../../../public/produtos.json";

export default function ShowMeusPedidos() {
  return (
    <div
      className={`bg-slate-100  max-w-72 py-[15px] px-[22px] shadow-Stone-900 shadow-md rounded-lg md:w-[500px]`}
    >
      <h1 className="text-stone-900 font-semibold text-base md:hidden">
        Meus Pedidos
      </h1>
      <div className="hidden md:flex">
    <h1 className="text-orange-600 font-semibold text-base md:hidden">
        Meus Pedidos
    </h1>
    <div className="border-t border-stone-500 w-[240px] mt-4"></div>
    <h1 className="text-stone-500 font-semibold text-base md:hidden">
        Minhas Informações
    </h1>
</div>

      <div className="flex flex-col justify-center items-center overflow-y-auto h-full">
        {produtos.map((produto) => (
          <MeusPedidos key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}
