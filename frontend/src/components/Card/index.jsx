export default function Card({ produto }) {
  return (
    <article className="h-70 w-36 my-1.5 mx-1">
      <div className="shadow-md shadow-gray-300">
        {produto.imagem ? (
          <img
            src={`data:image/png;base64,${produto.imagem}`}
            alt={""}
            className="h-40 w-36 object-cover "
          />
        ) : (
          <div>Imagem não disponível</div>
        )}
        <div className="p-2">
          <h1 className="text-blue-900 font-bold text-lg">{produto.nome}</h1>
          <h2 className="py-1 font-medium text-xs text-slate-300">
            {produto.descricao}
          </h2>
          <h3 className="text-orange-600 font-semibold text-base">
            {produto.preco}
          </h3>
          <button className="bg-blue-900 h-5 w-[75px] text-white text-xs font-medium rounded">
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}
