// Import the necessary modules
const jwt = require("jsonwebtoken");

// Define the verifyToken function
const authMiddleware = (req, res, next) => {
  try {
    // Verificar se o token de autenticação foi fornecido no cabeçalho da solicitação
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Token de autenticação não fornecido." });
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adicionar o payload do token à requisição
    next(); // Continuar para o próximo middleware
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(401).json({ error: "Token de autenticação inválido." });
  }
};

// Export the verifyToken function
module.exports = authMiddleware;
