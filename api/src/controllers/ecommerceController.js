const ecommerceService = require("../services/ecommerceService");

const listarProdutos = async (req, res) => {
  const { page, limit } = req.query;
  const produtos = await ecommerceService.listarProdutos(page, limit);
  res.json({ status: "OK", data: produtos });
};

const filtrarProdutos = async (req, res, categoria, preco_min, preco_max) => {
  try {
    const produtos = await ecommerceService.filtrarProdutos(
      categoria,
      preco_min,
      preco_max
    );
    res.json({ status: "OK", data: produtos });
  } catch (error) {
    console.error("Erro ao filtrar produtos:", error);
    res.status(500).json({ error: "Erro ao filtrar produtos." });
  }
};

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const newUser = await ecommerceService.cadastrarUsuario(nome, email, senha);
    res.status(201).json({ status: "OK", data: newUser });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }
};

const realizarLogin = async (email, senha) => {
  return await ecommerceService.realizarLogin(email, senha);
};

const obterVendasDoUsuario = async (req, res) => {
  try {
    const userId = req.user.userId; // Obtendo o ID do usuário autenticado a partir do token
    const vendas = await ecommerceService.obterVendasDoUsuario(userId);
    res.json({ status: "OK", data: vendas });
  } catch (error) {
    console.error("Erro ao buscar vendas do usuário:", error);
    res.status(500).json({ error: "Erro ao buscar vendas do usuário." });
  }
};

const cadastrarVenda = async (req, res) => {
  const { usuarioId, carrinho } = req.body;

  try {
    const mensagem = await ecommerceService.cadastrarVenda(usuarioId, carrinho);
    res.status(200).json({ status: "OK", message: mensagem });
  } catch (error) {
    console.error("Erro ao cadastrar venda:", error);
    res.status(500).json({ error: "Erro ao cadastrar venda." });
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
