const express = require("express");
const ecommerceController = require("../controllers/ecommerceController");
const router = express.Router();
const verifyAuthentication = require("../middleware/authMiddleware.js");

// Rota para listar produtos com paginação
router.get("/produtos", (req, res) => {
  ecommerceController.listarProdutos(req, res);
});
// Rota para filtrar produtos
router.get("/produtos/filtrar", (req, res) => {
  const { categoria, preco_min, preco_max } = req.query;
  ecommerceController.filtrarProdutos(
    req,
    res,
    categoria,
    preco_min,
    preco_max
  );
});
// Rota para cadastrar usuário
router.post("/usuarios/cadastrar", ecommerceController.cadastrarUsuario);
// Rota para realizar login
router.post("/usuarios/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const { token } = await ecommerceController.realizarLogin(email, senha);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
// Rota para obter vendas do usuário
router.get(
  "/vendas",
  verifyAuthentication,
  ecommerceController.obterVendasDoUsuario
);
// Rota para cadastrar uma nova venda
router.post("/vendas", ecommerceController.cadastrarVenda);

module.exports = router;
