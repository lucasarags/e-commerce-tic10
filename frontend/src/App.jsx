import Categorias from "./pages/Categorias";
import Home from "./pages/Home";
import MeusPedidos from "./pages/MeusPedidos";
import Produtos from "./pages/Produtos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
// import Produto from "./pages/Produto";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="/MeusPedidos" element={<MeusPedidos />} />
        <Route path="/Produtos" element={<Produtos />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        {/* <Route path="/Produto/:id" element={<Produto />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
