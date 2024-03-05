import banner from "../../assets/banner.png";

export default function Banner() {
  return (
    <div className="relative">
      <img src={banner} alt="" className="w-screen max-h-[540px] object-cover" />
      <button className="absolute bg-orange-600 h-10 w-[276px] bottom-7 left-1/2 transform -translate-x-1/2 text-base font-semibold leading-5 text-white">
        Aproveite Oferta
      </button>
    </div>
  );
}
