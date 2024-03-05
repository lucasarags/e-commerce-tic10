// corsMiddleware.js

const corsMiddleware = (req, res, next) => {
  // Permitir solicitações de todas as origens
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Permitir os métodos HTTP especificados
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // Permitir os cabeçalhos especificados
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Permitir cookies
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Passar para o próximo middleware
  next();
};

module.exports = corsMiddleware;
