const express = require("express");
const multer = require("./multer");


const { schemaCliente } = require("./validacao/schemaCliente");
const { schemaUsuario, schemaLogin } = require("./validacao/schemaUsuario");
const {detalharUsuarioLogado, editarUsuarioLogado, cadastrarUsuario, efetuarLogin} = require("./controladores/usuarios");
const { validarCorpoRequisicao } = require("./intermediario/autenticacao");
const { filtroLogin } = require("./intermediario/filtroLogin");
const { listarCategorias } = require("./controladores/categorias");
const { cadastrarProduto, editarProduto, excluirProduto, detalharProduto, listarProduto } = require("./controladores/produtos");

const {listarClientes, detalharCliente, cadastrarCliente, editarCliente} = require("./controladores/clientes");
const { cadastarPedido, listarpedidos, pedidosPorCliente } = require("./controladores/pedidos");
const { schemaPedidos } = require("./validacao/schemaPedidos");
const {schemaProdutos} = require("./validacao/schemaProdutos");

const rotas = express();

rotas.post("/usuario", validarCorpoRequisicao(schemaUsuario), cadastrarUsuario);
rotas.post("/login", validarCorpoRequisicao(schemaLogin), efetuarLogin);
rotas.get("/categoria", listarCategorias);

rotas.use(filtroLogin);

rotas.get("/usuario", detalharUsuarioLogado);
rotas.put("/usuario", validarCorpoRequisicao(schemaUsuario), editarUsuarioLogado);


rotas.get("/produto", listarProduto);
rotas.get("/produto/:id", detalharProduto);
rotas.delete("/produto/:id", multer.single('produto_imagem'), excluirProduto);
rotas.post("/produto", multer.single('produto_imagem'), validarCorpoRequisicao(schemaProdutos), cadastrarProduto);
rotas.put("/produto/:id", multer.single('produto_imagem'), validarCorpoRequisicao(schemaProdutos), editarProduto);


rotas.post("/cliente", validarCorpoRequisicao(schemaCliente), cadastrarCliente);
rotas.put("/cliente/:id", validarCorpoRequisicao(schemaCliente), editarCliente);
rotas.get("/cliente", listarClientes);
rotas.get("/cliente/:id", detalharCliente);


rotas.post("/pedido",validarCorpoRequisicao(schemaPedidos), cadastarPedido);
rotas.get("/pedido", listarpedidos); 
rotas.get("/pedido/:id", pedidosPorCliente);

module.exports = rotas;
