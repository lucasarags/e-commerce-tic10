const pool = require("../database/db");

const list = async (userId) => {
  try {
    const sales = await pool.query(
      "SELECT * FROM Pedido WHERE usuario_id = $1",
      [userId]
    );

    const salesWithProducts = [];
    for (const sale of sales.rows) {
      const products = await pool.query(
        "SELECT p.nome, p.descricao, p.preco, ip.quantidade FROM Produto p INNER JOIN Item_do_Pedido ip ON p.id = ip.produto_id WHERE ip.pedido_id = $1",
        [sale.id]
      );

      salesWithProducts.push({
        sale: sale,
        products: products.rows,
      });
    }

    return salesWithProducts;
  } catch (error) {
    throw error;
  }
};

const create = async (usuarioId, cart) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Criar um novo pedido
    const novoPedido = await client.query(
      "INSERT INTO Pedido (usuario_id, estado) VALUES ($1, 'em processo') RETURNING id",
      [usuarioId]
    );

    const pedidoId = novoPedido.rows[0].id;

    // Mapear os itens do carrinho para os parâmetros da consulta
    const values = cart.map(
      (item, index) =>
        `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${
          index * 4 + 4
        })`
    );

    // Criar uma única consulta SQL para inserir todos os itens do carrinho
    const query = `
      INSERT INTO Item_do_Pedido (pedido_id, produto_id, quantidade, preco_unitario)
      VALUES ${values.join(",")}
      RETURNING produto_id, quantidade
    `;

    // Executar a consulta SQL para inserir todos os itens do carrinho
    const result = await client.query(
      query,
      cart.reduce((acc, item) => {
        acc.push(
          pedidoId,
          item.produto_id,
          item.quantidade,
          item.preco_unitario
        );
        return acc;
      }, [])
    );

    // Verificar se a quantidade em estoque é suficiente para todos os itens
    const hasInsufficientStock = await client.query(
      `
      SELECT EXISTS (
        SELECT *
        FROM Produto p
        WHERE p.id IN (${cart.map((item) => item.produto_id).join(",")})
        AND p.qtd_estq < (
          SELECT SUM(ip.quantidade)
          FROM Item_do_Pedido ip
          WHERE ip.pedido_id = $1
          AND ip.produto_id = p.id
        )
      )
      `,
      [pedidoId]
    );

    if (hasInsufficientStock.rows[0].exists) {
      await client.query("ROLLBACK");
      throw new InsufficientStockError(
        "Quantidade insuficiente em estoque para um ou mais produtos."
      );
    }

    // Commit da transação
    await client.query("COMMIT");

    return { message: "Pedido finalizado com sucesso." };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  list,
  create,
};
