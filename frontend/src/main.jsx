import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ProdutosProvider from "./context/produtosContext/index.jsx";
import UsersProvider from "./context/userContext/index.jsx";
import PedidosProvider from "./context/pedidosContext/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProdutosProvider>
    <UsersProvider>
      <PedidosProvider>
        <App />
      </PedidosProvider>
    </UsersProvider>
  </ProdutosProvider>
);
