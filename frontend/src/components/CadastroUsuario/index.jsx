import logo from "../../assets/logo.png"

export default function CadastroUsuario() {
    return(
    <div className=" bg-blue-900 h-screen p-2">
      <div className="flex flex-col items-center">
        <img src={logo} alt="" className="h-7 m-7" />
        <div className="flex flex-col bg-white h-auto w-[304px] items-center justify-center">
          <h1 className="text-2xl font-semibold py-2">Cadastre-se</h1>
          <label className="text-base font-semibold w-full px-7">Nome*</label>
          <input
          placeholder="Digite seu nome"
          className="h-8 px-2 w-64 border mt-2 mb-3  bg-slate-100 text-stone-500 text-base font-medium leading-4 rounded-lg "
          />
          <label className="text-base font-semibold w-full px-7">E-mail*</label>
          <input
          placeholder="Digite seu e-nome"
          className="h-8 px-2 w-64 border mt-2 mb-3 text-stone-500 bg-slate-100  text-base font-medium leading-4 rounded-lg "
          />
          <label className="text-base font-semibold w-full px-7">Senha*</label>
          <input
          placeholder="Digite sua senha"
          className="h-8 px-2 w-64 border mt-2 mb-3  bg-slate-100 text-stone-500 text-base font-medium leading-4 rounded-lg "
          />
          <button className=" bg-orange-600 h-[60px] w-64 bottom-7  text-base font-semibold leading-5 text-white rounded-lg " >
          Cadastrar
          </button>
          <div className="flex justify-center pt-2 pb-8">
            <h2 className="px-1">Já possui cadastro?</h2>
            <h2>Clique aqui</h2>
          </div>
        </div>
      </div>
    </div>
    )
    
}