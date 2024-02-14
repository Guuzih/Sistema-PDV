# PDV Backend

Bem-vindo ao projeto final do PDV (Ponto de Venda) backend!

Este projeto consiste em uma API desenvolvida para um sistema de Ponto de Venda, que permite gerenciar categorias, clientes, pedidos, produtos e usuários. A API foi construída utilizando Node.js e PostgreSQL, seguindo os princípios de uma arquitetura RESTful.

## Funcionalidades

- **Autenticação de Usuário**: Permite que os usuários se cadastrem, façam login e gerem um token de autenticação para acessar as funcionalidades protegidas da API.
- **Gerenciamento de Usuários**: Os usuários podem visualizar e atualizar seus próprios perfis.
- **Gerenciamento de Categorias**: Permite listar todas as categorias cadastradas.
- **Gerenciamento de Clientes**: A funcionalidade de gerenciamento de clientes será implementada no futuro.
- **Gerenciamento de Pedidos**: A funcionalidade de gerenciamento de pedidos será implementada no futuro.
- **Gerenciamento de Produtos**: A funcionalidade de gerenciamento de produtos será implementada no futuro.

## Setup do Projeto

1. **Clone o repositório:**

   ```
   git clone https://github.com/seu-usuario/pdv-backend.git
   ```

2. **Instale as dependências:**

   ```
   cd pdv-backend
   npm install
   ```

3. **Configure o banco de dados:**

   - Crie um banco de dados PostgreSQL chamado `pdv`.
   - Execute o script de criação do banco de dados localizado em `database/pdv.sql`.

4. **Configure as variáveis de ambiente:**

   - Renomeie o arquivo `.env.example` para `.env`.
   - Preencha as variáveis de ambiente no arquivo `.env` com suas configurações locais.

5. **Execute o servidor:**
   ```
   npm start
   ```

## Endpoints

- **Cadastro de Usuário**:
  - Método: POST
  - Rota: `/api/usuario`
  - Corpo da Requisição:
    ```json
    {
      "nome": "Nome do Usuário",
      "email": "usuario@example.com",
      "senha": "senha"
    }
    ```
- **Login de Usuário**:
  - Método: POST
  - Rota: `/api/login`
  - Corpo da Requisição:
    ```json
    {
      "email": "usuario@example.com",
      "senha": "senha"
    }
    ```
- **Detalhes do Perfil do Usuário Logado**:
  - Método: GET
  - Rota: `/api/usuario`
  - Requer Token de Autenticação no Cabeçalho da Requisição

## Status Codes

- 200 (OK): Requisição bem-sucedida
- 201 (Created): Requisição bem-sucedida e algo foi criado
- 204 (No Content): Requisição bem-sucedida, sem conteúdo no corpo da resposta
- 400 (Bad Request): O servidor não entendeu a requisição devido a sintaxe/formato inválido
- 401 (Unauthorized): O usuário não está autenticado (logado)
- 403 (Forbidden): O usuário não tem permissão para acessar o recurso solicitado
- 404 (Not Found): O servidor não pode encontrar o recurso solicitado
- 500 (Internal Server Error): Erro inesperado do servidor

## Deploy

## Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- JSON Web Token (JWT) para autenticação
- Heroku para implantação
