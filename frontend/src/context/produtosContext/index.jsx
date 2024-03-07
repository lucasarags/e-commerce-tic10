import { useState, createContext, useEffect } from "react";
import api from "../../api";

export const ProdutosContext = createContext([]);

export default function ProdutosProvider({ children }) {
  const [produtos, setProdutos] = useState([]);

  async function fetchProdutos() {
    const response = await api.listProducts();
    const result = await response;
    setProdutos(result);
  }

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <ProdutosContext.Provider value={{ produtos, setProdutos }}>
      {children}
    </ProdutosContext.Provider>
  );
}
