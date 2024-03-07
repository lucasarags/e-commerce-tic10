const baseUrl = "http://localhost:3000"; // Altere para o endereço do seu backend

const api = {
  listProducts: async () => {
    try {
      const response = await fetch(`${baseUrl}/products/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao obter os produtos");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao obter os produtos:", error.message);
      throw error;
    }
  },

  cadastrarUsuario: async (nome, email, senha) => {
    try {
      const response = await fetch(`${baseUrl}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });
      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }
      return response.json();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  },

  filterProducts: async (category) => {
    try {
      const response = await fetch(
        `${baseUrl}/products/filter?category=${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao filtrar os produtos por categoria");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Erro ao filtrar os produtos por categoria:",
        error.message
      );
      throw error;
    }
  },

  login: async (email, senha) => {
    try {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      throw error;
    }
  },
};

export default api;

// // Função para filtrar produtos
// filtrarProdutos: async (categoria, preco_min, preco_max) => {
//   try {
//     let url = `${baseUrl}/produtos/filtrar?`;
//     if (categoria) url += `categoria=${categoria}&`;
//     // if (preco_min) url += `preco_min=${preco_min}&`;
//     // if (preco_max) url += `preco_max=${preco_max}&`;

//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Erro ao filtrar produtos");
//     }
//     return response.json();
//   } catch (error) {
//     console.error("Erro ao filtrar produtos:", error);
//     throw error;
//   }
// },

//   // Função para fazer login
//   fazerLogin: async (email, senha) => {
//     try {
//       const response = await fetch(`${baseUrl}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, senha }),
//       });

//       if (!response.ok) {
//         throw new Error("Erro ao fazer login");
//       }

//       // Extrair o token do corpo da resposta
//       const { token } = await response.json();

//       // Armazenar o token no localStorage para uso posterior
//       localStorage.setItem("user", token);
//       console.log(
//         "Token armazenado no localStorage:",
//         localStorage.getItem("user")
//       );
//       // Retornar o token para uso no código que chama fazerLogin
//       return token;
//     } catch (error) {
//       console.error("Erro ao fazer login:", error);
//       throw error;
//     }
//   },

//   // Função para obter vendas de um usuário específico
//   getVendas: async (token) => {
//     try {
//       const response = await fetch(`${baseUrl}/vendas`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Erro ao buscar vendas");
//       }
//       return response.json();
//     } catch (error) {
//       console.error("Erro ao buscar vendas:", error);
//       throw error;
//     }
//   },

//   // Função para obter todos os usuários
//   getUsuarios: async () => {
//     try {
//       const response = await fetch(`${baseUrl}/usuarios`);
//       if (!response.ok) {
//         throw new Error("Erro ao buscar usuários");
//       }
//       return response.json();
//     } catch (error) {
//       console.error("Erro ao buscar usuários:", error);
//       throw error;
//     }
//   },

//   // Função para cadastrar uma venda
//   cadastrarVenda: async (usuarioId, carrinho, token) => {
//     try {
//       const response = await fetch(`${baseUrl}/vendas`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ usuarioId, carrinho }),
//       });
//       if (!response.ok) {
//         throw new Error("Erro ao cadastrar venda");
//       }
//       return response.json();
//     } catch (error) {
//       console.error("Erro ao cadastrar venda:", error);
//       throw error;
//     }
//   },
