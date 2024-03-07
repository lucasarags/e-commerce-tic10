const { usersModel } = require("../models");
const usersValidate = require("./usersValidation/users");
const { checkIfPersonExists, verifyPassword } = require("../models/users");

const create = async (user) => {
  const errorMessage = usersValidate.validateFields(user);

  if (errorMessage) {
    return {
      errorMessage,
      statusCode: 400,
      value: null,
    };
  }

  const personExists = await checkIfPersonExists(user.email);
  if (personExists) {
    return {
      errorMessage: "Este email já está em uso.",
      statusCode: 400,
      value: null,
    };
  }
  const newUser = await usersModel.create(user);

  return {
    errorMessage: null,
    statusCode: 201,
    value: newUser,
  };
};

const login = async (email, senha) => {
  const personExists = await checkIfPersonExists(email);
  if (!personExists) {
    return {
      errorMessage: "Este email não está em uso.",
      statusCode: 400,
      value: null,
    };
  }

  const passwordCorrect = await verifyPassword(email, senha);
  if (!passwordCorrect) {
    return {
      errorMessage: "Senha incorreta",
      statusCode: 400,
      value: null,
    };
  }

  const userLogin = await usersModel.login(email);

  return {
    errorMessage: null,
    statusCode: 201,
    value: userLogin.token,
  };
};

module.exports = {
  create,
  login,
};
