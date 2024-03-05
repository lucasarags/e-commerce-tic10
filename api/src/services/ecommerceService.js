const pool = require("../database/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const listarProdutos = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const queryResult = await pool.query(
      "SELECT * FROM Produto LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    return queryResult.rows;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Erro ao buscar produtos.");
  }
};

const filtrarProdutos = async (categoria, precoMin, precoMax) => {
  try {
    let filterQuery = "SELECT * FROM Produto WHERE 1 = 1";
    const queryParams = [];

    if (categoria) {
      filterQuery += " AND categoria_id = $1";
      queryParams.push(parseInt(categoria));
    }

    if (precoMin) {
      filterQuery += " AND preco >= $2";
      queryParams.push(parseFloat(precoMin));
    }

    if (precoMax) {
      filterQuery += " AND preco <= $3";
      queryParams.push(parseFloat(precoMax));
    }

    const filteredProducts = await pool.query(filterQuery, queryParams);
    return filteredProducts.rows;
  } catch (error) {
    console.error("Erro ao filtrar produtos:", error);
    throw new Error("Erro ao filtrar produtos.");
  }
};

const cadastrarUsuario = async (nome, email, senha) => {
  // Verificar se todos os campos obrigatórios estão presentes
  if (!nome || !email || !senha) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  // Validar formato do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Formato de email inválido.");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Verificar se o usuário já existe com o mesmo email
    const userExists = await client.query(
      "SELECT * FROM Usuario WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      await client.query("ROLLBACK");
      throw new Error("Este email já está em uso.");
    }

    // Criptografar a senha antes de armazenar no banco de dados
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserir novo usuário no banco de dados
    const newUser = await client.query(
      "INSERT INTO Usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, hashedPassword]
    );

    await client.query("COMMIT");
    return newUser.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw new Error("Erro ao cadastrar usuário.");
  } finally {
    client.release();
  }
};

const realizarLogin = async (email, senha) => {
  try {
    // Verificar se o usuário existe com o mesmo email
    const user = await pool.query("SELECT * FROM Usuario WHERE email = $1", [
      email,
    ]);

    // Verificar se o usuário está cadastrado
    if (user.rows.length === 0) {
      throw new Error("Email incorreto.");
    }

    // Verificar se a senha está correta
    const passwordMatch = await bcrypt.compare(senha, user.rows[0].senha);

    if (!passwordMatch) {
      throw new Error("Senha incorreta.");
    }

    // Gerar token de autenticação
    const tokenPayload = {
      userId: user.rows[0].id,
      nome: user.rows[0].nome,
      email: user.rows[0].email,
      // avatar: user.rows[0].avatar,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return { token };
  } catch (err) {
    console.error("Erro ao realizar login:", err);
    throw new Error("Erro ao realizar login.");
  }
};

const obterVendasDoUsuario = async (userId) => {
  try {
    const vendas = await pool.query(
      "SELECT * FROM Pedido WHERE usuario_id = $1",
      [userId]
    );

    const vendasComProdutos = [];
    for (const venda of vendas.rows) {
      const produtosDaVenda = await pool.query(
        "SELECT p.nome, p.descricao, p.preco, ip.quantidade FROM Produto p INNER JOIN Item_do_Pedido ip ON p.id = ip.produto_id WHERE ip.pedido_id = $1",
        [venda.id]
      );
      vendasComProdutos.push({
        venda: venda,
        produtos: produtosDaVenda.rows,
      });
    }

    return vendasComProdutos;
  } catch (error) {
    console.error("Erro ao buscar vendas do usuário:", error);
    throw new Error("Erro ao buscar vendas do usuário.");
  }
};

const cadastrarVenda = async (usuarioId, carrinho) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Criar um novo pedido
    const novoPedido = await client.query(
      "INSERT INTO Pedido (usuario_id, estado) VALUES ($1, 'em processo') RETURNING id",
      [usuarioId]
    );

    const pedidoId = novoPedido.rows[0].id;

    // Adicionar os itens do carrinho ao item_do_pedido
    for (const item of carrinho) {
      const { produto_id, quantidade, preco_unitario } = item;

      // Verificar se há produtos suficientes em estoque
      const produto = await client.query(
        "SELECT qtd_estq FROM Produto WHERE id = $1",
        [produto_id]
      );

      if (produto.rows.length === 0) {
        await client.query("ROLLBACK");
        throw new Error("Produto não encontrado.");
      }

      if (produto.rows[0].qtd_estq < quantidade) {
        await client.query("ROLLBACK");
        throw new Error(
          `Quantidade insuficiente em estoque para o produto ID ${produto_id}.`
        );
      }

      // Inserir o item do pedido
      await client.query(
        "INSERT INTO Item_do_Pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES ($1, $2, $3, $4)",
        [pedidoId, produto_id, quantidade, preco_unitario]
      );

      // Atualizar o estoque do produto
      await client.query(
        "UPDATE Produto SET qtd_estq = qtd_estq - $1 WHERE id = $2",
        [quantidade, produto_id]
      );
    }

    await client.query("COMMIT");
    return { message: "Pedido finalizado com sucesso." };
  } catch (error) {
    console.error("Erro ao finalizar pedido:", error);
    await client.query("ROLLBACK");
    throw new Error("Erro ao finalizar pedido.");
  } finally {
    client.release();
  }
};

module.exports = {
  listarProdutos,
  filtrarProdutos,
  cadastrarUsuario,
  realizarLogin,
  obterVendasDoUsuario,
  cadastrarVenda,
};

// const visualizarTodosUsuarios = async (req, res) => {
//   try {
//     const users = await pool.query("SELECT * FROM Usuario");
//     res.json(users.rows);
//   } catch (err) {
//     console.error("Erro ao consultar usuários:", err);
//     res.status(500).json({ error: "Erro ao consultar usuários." });
//   }
// };
