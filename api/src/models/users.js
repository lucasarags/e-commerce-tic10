const pool = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkIfPersonExists = async (email) => {
  const result = await pool.query("SELECT * FROM Usuario WHERE email = $1", [
    email,
  ]);
  return result.rows.length > 0;
};

const verifyPassword = async (email, senha) => {
  try {
    const personExists = await checkIfPersonExists(email);

    if (!personExists) {
      return false;
    }

    const user = await pool.query(
      "SELECT senha FROM Usuario WHERE email = $1",
      [email]
    );

    return await bcrypt.compare(senha, user.rows[0].senha);
  } catch (error) {
    throw error;
  }
};

const create = async (user) => {
  const { nome, email, senha } = user;
  const client = await pool.connect();

  try {
    await client.query("BEGIN;");

    const hashedPassword = await bcrypt.hash(senha, 10);

    // Armazenar a senha diretamente
    const newUser = await client.query(
      "INSERT INTO Usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, hashedPassword] // Armazenar a senha diretamente sem hash
    );

    await client.query("COMMIT;");
    return newUser.rows[0];
  } catch (error) {
    await client.query("ROLLBACK;");
    throw error;
  } finally {
    client.release();
  }
};

const login = async (email) => {
  try {
    // Buscar informações do usuário pelo email
    const user = await pool.query(
      "SELECT id, nome FROM Usuario WHERE email = $1",
      [email]
    );

    const { id, nome } = user.rows[0]; // Extrair id e nome do usuário

    // Gerar token de autenticação
    const tokenPayload = {
      id: id,
      email: email,
      nome: nome,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return { token };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkIfPersonExists,
  create,
  verifyPassword,
  login,
};
