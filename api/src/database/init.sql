-- Criação da tabela "usuario"
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Criação da tabela "categoria"
CREATE TABLE IF NOT EXISTS categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- Criação da tabela "produto"
CREATE TABLE IF NOT EXISTS produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco NUMERIC(10, 2) NOT NULL,
    qtd_estq INTEGER DEFAULT 0,
    imagem text,
    categoria_id INTEGER REFERENCES categoria(id)
);

-- Criação da tabela "pedido"
CREATE TABLE IF NOT EXISTS pedido (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuario(id),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'pendente'
);

-- Criação da tabela "item_do_pedido"
CREATE TABLE IF NOT EXISTS item_do_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedido(id),
    produto_id INTEGER REFERENCES produto(id),
    quantidade INTEGER,
    preco_unitario NUMERIC(10, 2) NOT NULL
);

-- Inserção de algumas categorias de exemplo
INSERT INTO categoria (nome) VALUES
('Eletronicos'),
('Roupas'),
('Alimentos'),
('Livros');

-- -- Exemplo de inserção de produtos com categorias
-- INSERT INTO produto (nome, descricao, preco, qtd_estq, categoria_id) VALUES
-- ('Smartphone', 'Um smartphone de última geração', 1500.00, 100, 1),
-- ('Camiseta', 'Camiseta de algodão preta', 25.00, 50, 2),
-- ('Arroz', 'Pacote de arroz integral', 10.00, 200, 3),
-- ('JavaScript: The Good Parts', 'Livro sobre JavaScript', 35.00, 20, 4);

-- -- Inserir dados de produtos
-- INSERT INTO produto (nome, descricao, preco, qtd_estq, image)
-- VALUES
--   ('Produto 1', 'Descrição do Produto 1', 10.99, 100, '/product_images/produto1.jpg'),
--   ('Produto 2', 'Descrição do Produto 2', 20.99, 50, '/product_images/produto1.jpg'),
--   ('Produto 3', 'Descrição do Produto 3', 15.99, 75, '/product_images/produto1.jpg');
