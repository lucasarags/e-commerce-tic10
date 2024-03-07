const productsService = require("../services/products");

const list = async (req, res) => {
  const { errorMessage, statusCode, value } = await productsService.list();

  const products = value ? value : { message: errorMessage };

  return res.status(statusCode).json(products);
};

const filter = async (req, res) => {
  const category = req.query.category; // Extrai a
  const { errorMessage, statusCode, value } = await productsService.filter(
    category
  );

  const filteredProducts = value ? value : { message: errorMessage };

  return res.status(statusCode).json(filteredProducts);
};

module.exports = {
  list,
  filter,
};
