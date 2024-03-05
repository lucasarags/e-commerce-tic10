===== Subir Banco =====

psql -U postgres -c "CREATE DATABASE
ecommerce;"
psql -U postgres -d ecommerce -f ./db/init.sql

===== Body das Rotas da API =====

Cadastro de Usuário (/cadastro):

{
"nome": "Nome do Usuário",
"email": "email@example.com",
"senha": "senhaDoUsuario"
}

Login de Usuário (/login):

{
"email": "email@example.com",
"senha": "senhaDoUsuario"
}

Listagem de Produtos (/produtos):

{}

Filtragem de Produtos (/produtos/filtrar):

http://localhost:3000/produtos/filtrar?preco_min=0&preco_max=2000
ou
http://localhost:3000/produtos/filtrar?categoria=1&preco_min=1000&preco_max=2000

Listagem de Vendas de um Usuário (/vendas):

{}

Cadastro de uma Venda (/vendas):

{
"usuarioId": "idDoUsuario",
"carrinho": [
{
"produto_id": "idDoProduto",
"quantidade": "quantidadeDoProduto",
"preco_unitario": "precoUnitarioDoProduto"
},
{
"produto_id": "idDoProduto",
"quantidade": "quantidadeDoProduto",
"preco_unitario": "precoUnitarioDoProduto"
}
// Outros produtos do carrinho...
]
}

obs:
Em uma solicitação GET, os parâmetros são geralmente passados pela URL, não pelo corpo (body) da requisição. Isso ocorre porque os métodos GET são usados para recuperar dados de um servidor, e os parâmetros geralmente são parte da própria URL, tornando-os visíveis e acessíveis.

obs: preco negativo ta passando , comparar preco com o banco, zero tb

obs: criar o middleware dentro do escopo da rota, e reutilizar em outras rotas seguintes, quando necessário.

obs: ver foma de visualizar /produtos page

obs: barra pesquisar, adicionar dentro da rota, filtro pelo nome, "misa' de camisa ex.
