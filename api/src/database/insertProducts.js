import fs from "fs";
import path from "path";
import pool from "./db.mjs";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// Informações dos produtos
const produtos = [
  {
    nome: "Smartphone",
    descricao: "Um smartphone de última geração",
    preco: 1500.0,
    qtd_estq: 100,
    categoria_id: 1,
    imagem: "smart.png",
  },
  {
    nome: "Camiseta",
    descricao: "Camiseta de algodão preta",
    preco: 25.0,
    qtd_estq: 50,
    categoria_id: 2,
    imagem: "camisa.png",
  },
  {
    nome: "Arroz",
    descricao: "Pacote de arroz integral",
    preco: 10.0,
    qtd_estq: 200,
    categoria_id: 3,
    imagem: "arroz.png",
  },
  {
    nome: "JavaScript: The Good Parts",
    descricao: "Livro sobre JavaScript",
    preco: 35.0,
    qtd_estq: 20,
    categoria_id: 4,
    imagem: "javascript.png",
  },
];

// Diretório das imagens
const dir = "./product_images";

(async () => {
  const client = await pool.connect();
  try {
    for (const produto of produtos) {
      const imagePath = path.join(dir, produto.imagem);

      // Ler o arquivo de imagem como buffer
      const bufferData = fs.readFileSync(imagePath);

      // Converter buffer para base64
      const base64Image = bufferData.toString("base64");

      // Inserção na tabela produto
      await client.query(
        "INSERT INTO produto (nome, descricao, preco, qtd_estq, image, categoria_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          produto.nome,
          produto.descricao,
          produto.preco,
          produto.qtd_estq,
          base64Image,
          produto.categoria_id,
        ]
      );

      console.log(`Produto "${produto.nome}" inserido com sucesso.`);
    }
    console.log("Inserção concluída com sucesso.");
  } catch (error) {
    console.error("Erro ao inserir produtos:", error);
  } finally {
    client.release();
  }
})();
