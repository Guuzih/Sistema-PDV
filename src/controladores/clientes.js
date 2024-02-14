const pool = require("../conexao");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  try {
    const validarEmail = await pool.query(
      "select * from clientes where email = $1",
      [email]
    );
    const validarcpf = await pool.query(
      "select * from clientes where cpf = $1",
      [cpf]
    );
    if (validarEmail.rowCount > 0) {
      return res.status(400).json({
        mensagem: "Já existe cliente cadastrado com o e-mail informado.",
      });
    }
    if (validarcpf.rowCount > 0) {
      return res.status(400).json({
        mensagem: "Já existe cliente cadastrado com o cpf informado.",
      });
    }
    const newCliente = await pool.query(
      "insert into clientes (nome, email, cpf,cep, rua, numero, bairro, cidade, estado) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)returning*",
      [nome, email, cpf, cep, rua, numero, bairro, cidade, estado]
    );

    return res.status(201).json(newCliente.rows[0]);
  } catch (error) {
    
    return res.status(500).json({ messagem: "error interno no servidor" });
  }
};

const editarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  const { id } = req.params;

  const validaEmail = await pool.query("select * from clientes where email = $1", [email]);

  if (validaEmail.rowCount === 1){
    return res.status(404).json({ mensagem: "Já existe Cliente Cadastrado com esse Email" });
  }

  const validarcpf = await pool.query("select * from clientes where cpf = $1", [cpf]);
  
  if(validarcpf.rowCount === 1){
    return res.status(404).json({ mensagem: "Já existe Cliente Cadastrado com esse CPF" });
}

  try {
    const cliente = await pool.query("select * from clientes where id = $1", [id]);

    if (cliente.rowCount < 1) {
      return res.status(404).json({ mensagem: "cliente não encontrado" });
    }
    const editarCliente = await pool.query(
      "update clientes set nome = $1, email = $2, cpf = $3, cep = $4, rua = $5, numero = $6, bairro = $7, cidade = $8, estado = $9 where id = $10 returning*",
      [nome, email, cpf, cep, rua, numero, bairro, cidade, estado, id]
    );

    return res.status(201).json(editarCliente.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro Interno do servidor" });
  }
};

const listarClientes = async (req, res) => {
  try {
    const clientes = await pool.query(
      "select id, nome, email, cpf from clientes"
    );

    return res.status(200).json(clientes.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro Interno do servidor" });
  }
};

const detalharCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount, rows } = await pool.query(
      "select * from clientes where id = $1",
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro Interno do servidor" });
  }
};

module.exports = {
  cadastrarCliente,
  editarCliente,
  listarClientes,
  detalharCliente,
};
