const { salesModel } = require("../models");
const { verifyToken } = require("../utils/verifyToken");

const list = async (token) => {
  try {
    console.log("Token recebido:", token);
    const decodedToken = await verifyToken(token);
    console.log("Token decodificado:", decodedToken);
    const userId = decodedToken.id;
    console.log("ID do usuário:", userId);
    const sales = await salesModel.list(userId);
    console.log("Vendas do usuário:", sales);

    return {
      errorMessage: null,
      statusCode: 200,
      value: sales,
    };
  } catch (error) {
    return {
      errorMessage: "Token inválido",
      statusCode: 400,
      value: null,
    };
  }
};

const create = async (userId, cart) => {
  if (!cart || cart.length === 0) {
    return {
      errorMessage: "O carrinho está vazio.",
      statusCode: 400,
      value: null,
    };
  }

  try {
    const order = await salesModel.create(userId, cart);
    return {
      errorMessage: null,
      statusCode: 200,
      value: order,
    };
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error) => {
  switch (error.name) {
    case "ValidationError":
      return {
        errorMessage: error.message,
        statusCode: 400,
        value: null,
      };
    case "NotFoundError":
      return {
        errorMessage: error.message,
        statusCode: 404,
        value: null,
      };
    case "InsufficientStockError":
      return {
        errorMessage: error.message,
        statusCode: 400,
        value: null,
      };
    default:
      return {
        errorMessage: "Erro ao criar o pedido.",
        statusCode: 500,
        value: null,
      };
  }
};

module.exports = {
  list,
  create,
};
