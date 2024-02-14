dotenv = require("dotenv").config();
const express = require("express");
const rotas = require("./rotas");
const server = express();

server.use(express.json());

server.use(rotas);

server.listen(process.env.PORT);
