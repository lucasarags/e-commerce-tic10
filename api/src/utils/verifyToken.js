const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject("Token não fornecido");
    }

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject("Token inválido");
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  verifyToken,
};
