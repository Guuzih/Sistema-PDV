require('dotenv').config()

const pool = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hash = process.env.JWT_HASH

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  try {
    const usuario = await pool.query(
      " insert into usuarios (nome, email, senha) values ($1, $2, $3) returning*",
      [nome, email, senhaCriptografada]
    );

    const { senha: _, ...usuarioCadastrado } = usuario.rows[0];

    return res.status(201).json(usuarioCadastrado);

  } catch (error) {
    return res.status(409).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário" });
  }
};

const efetuarLogin = async (req, res) => {
  const { email, senha } = req.body;
  
  try {

    const {rows, rowCount }= await pool.query("select * from usuarios where email = $1", [email]);

    if( rowCount === 0 ) {
      return res.status(401).json({ mensagem: "Usuario e Senha não Conferem" });
    } 

    const senhaCorreta = await bcrypt.compare(senha, rows[0].senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Usuario e Senha não Conferem" });    }

    const token = jwt.sign({ id: rows[0].id }, hash, jwt.options);  

    const { senha: _, ...dadosUsuario} = rows[0];

    return res.status(200).json({ usuario: dadosUsuario, token });

    

  } catch (error) {

    return res.status(500).json({ mensagem: "Erro Interno do servidor" });
  }
};

const detalharUsuarioLogado = (req, res) => {

    if (!req.usuario) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso, um token de autenticação válido deve ser enviado.' });
      }

  return res.json(req.usuario);
};

const editarUsuarioLogado = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  const queryVerificarEmail = "select * from usuarios where email = $1";
  const queryAtualizarUsuario =
    "update usuarios set nome = $1, email = $2, senha = $3 where id = $4 returning id, nome, email";

  try {
    const { rowCount } = await pool.query(queryVerificarEmail, [email]);

    if (rowCount === 1) {
      return res.status(409).json({
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const senhaCript = await bcrypt.hash(senha, 10);

    const atualizar = await pool.query(queryAtualizarUsuario, [nome, email, senhaCript, id]);

   return res.status(200).json(atualizar.rows[0]);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro Interno do servidor" });
  }
};

module.exports = {
  cadastrarUsuario,
  efetuarLogin,
  detalharUsuarioLogado,
  editarUsuarioLogado,
};
