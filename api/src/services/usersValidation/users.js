const validateFields = (user) => {
  if (!user.nome || typeof user.nome !== "string") {
    return "Nome inválido!";
  }

  if (
    !user.email ||
    typeof user.email !== "string" ||
    !isValidEmail(user.email)
  ) {
    return "Email inválido!";
  }

  if (!user.senha || typeof user.senha !== "string") {
    return "Senha inválida!";
  }

  return "";
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  validateFields,
};
