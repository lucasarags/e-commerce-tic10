const { productsModel } = require("../models");

const list = async () => {
  const products = await productsModel.list();

  return {
    errorMessage: null,
    statusCode: 200,
    value: products,
  };
};

const filter = async (category) => {
  const filteredProducts = await productsModel.filter(category);

  return {
    errorMessage: null,
    statusCode: 200,
    value: filteredProducts,
  };
};

module.exports = {
  list,
  filter,
};
