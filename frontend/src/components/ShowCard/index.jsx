import Card from "../Card";
import produtos from "../../../public/produtos.json";

export default function ShowCard() {
  // Defina uma altura mínima desejada para o componente ShowCard
  const minHeight = "348px";

  // Calcule a altura com base no número de produtos
  const calculatedHeight = Math.ceil(produtos.length / 3) * 352 + "px";

  // Use a altura calculada, mas não inferior à altura mínima
  const dynamicHeight = `max(${minHeight}, ${calculatedHeight})`;

  return (
    <div className={`bg-zinc-50 h-${dynamicHeight} w-screen p-2`}>
      <h1 className="text-blue-900 font-semibold text-xl px-4 pb-4 pt-5">
        Destaques
      </h1>
      <div className="flex flex-wrap justify-center">
        {produtos.map((produto) => (
          <Card key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}
