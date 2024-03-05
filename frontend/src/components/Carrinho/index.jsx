import nique from "../../assets/niqueairsurf.png";

export default function Carrinho({ produto }) {
  return (
    <article className="h-[70px] w-[210px] my-[13px]">
      <div className="flex flex-row">
        <div className="w-2/5 flex object-cover">
          <img src={nique} alt={produto.nique} className="rounded-lg " />
        </div>

        <div className=" pt-[8px] px-[15px] w-3/5 h-full overflow-hidden">
          <h1 className="text-black font-bold text-sm">{produto.title}</h1>
          <h2 className=" font-medium text-[10px] text-stone-500">
            {produto.description}
          </h2>
          <h3 className="text-black font-semibold text-sm mt-[6px]">
            {produto.price}
          </h3>
          <p className="text-stone-500 text-sm">Qtd: 01</p>
        </div>
      </div>
    </article>
  );
}
