const pool = require("../database/db");

const list = async () => {
  const products = await pool.query("SELECT * FROM Produto");

  return products.rows;
};

const filter = async (category) => {
  const filteredProducts = await pool.query(
    "SELECT * FROM Produto WHERE categoria_id = $1",
    [category]
  );

  return filteredProducts.rows;
};

module.exports = {
  list,
  filter,
};
