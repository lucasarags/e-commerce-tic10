const salesService = require("../services/sales");

const list = async (req, res) => {
  const token = req.headers.authorization;

  const { errorMessage, statusCode, value } = await salesService.list(token);

  const response = value ? value : { message: errorMessage };

  return res.status(statusCode).json(response);
};

const create = async (req, res) => {
  const { userId, cart } = req.body;
  const { errorMessage, statusCode, value } = await salesService.create(
    userId,
    cart
  );

  const response = value ? value : { message: errorMessage };

  return res.status(statusCode).json(response);
};

module.exports = {
  list,
  create,
};
