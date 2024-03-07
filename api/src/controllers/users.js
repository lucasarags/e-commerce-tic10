const usersService = require("../services/users");

const create = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { errorMessage, statusCode, value } = await usersService.create(
    req.body
  );

  const users = value
    ? value
    : {
        message: errorMessage,
      };

  return res.status(statusCode).json(users);
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  const { errorMessage, statusCode, value } = await usersService.login(
    email,
    senha
  );

  const usersLogin = value ? value : { message: errorMessage };

  return res.status(statusCode).json(usersLogin);
};

module.exports = {
  create,
  login,
};
