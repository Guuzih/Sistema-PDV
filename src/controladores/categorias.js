const pool = require('../conexao');

const listarCategorias = async (req, res) => {
  try {
    const resultado = await pool.query("select * from categorias");
    return res.status(200).json(resultado.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = {
  listarCategorias,
};