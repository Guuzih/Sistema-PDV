
const validarCorpoRequisicao = (joiSchema) => async (req, res, next) => {
  try {

    await joiSchema.validateAsync(req.body);
    
    next();

  } catch (error) {

if (error.message === "\"cliente_id\" must be greater than 0" ){
  return res.status(400).json({ mensagem: "Cliente id não pode ser 0" });
}else if(error.message === "\"numero\" must be a string"){
     return res.status(400).json({ mensagem: "Campo Numero, precisa ser um Texto" });
    }

    res.status(400).json({ error: error.message });
  }
  
};

const validacaoExclusaoProduto = async (req, res, next) => {

  const produtoId = req.params.id;
  const query = "SELECT * FROM pedido_produto WHERE produto_id = $1";

  try {

    const {rowCount} = await pool.query(query, [produtoId]);

    (rowCount === 0) ? next() : res.status(400).json({ mensagem: "Produto cadastrado em um pedido"});

  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};


module.exports = {
  validarCorpoRequisicao,
  validacaoExclusaoProduto
};
