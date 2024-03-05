// import { createContext, useState, useEffect } from "react";
// import api from "../../api/index.js";

// export const ProductContext = createContext(null);

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await api.getProdutos();
//         setProducts(data);
//       } catch (error) {
//         console.error("Erro ao buscar produtos:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <ProductContext.Provider value={{ products, setProducts }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };
