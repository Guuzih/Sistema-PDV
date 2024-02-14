const pool = require("../conexao");
const { upload, excluirArquivo } = require("./armazenamento");

const cadastrarProduto = async (req, res) => {
  let { descricao, quantidade_estoque, valor, categoria_id} = req.body;  


  if (req.file !== undefined){
    try {      
      const { originalname, mimetype, buffer } = req.file; 
      
      const categoria_idEncontrada = await pool.query('select * from categorias where id = $1', [categoria_id]);
      
      if (categoria_idEncontrada.rowCount === 0) {
        return res.status(400).json({ mensagem: 'Categoria não encontrada' })
        }     
      
       const imagem = await upload(
        `produtos/imagens/${originalname}`,
        buffer,
        mimetype
        );
        
        const { rows } = await pool.query(
          'insert into produtos (descricao, quantidade_estoque, valor, categoria_id, produto_imagem) values ($1, $2, $3, $4, $5) returning *',
          [descricao, quantidade_estoque, valor, categoria_id, imagem.url]);
          
          res.status(201).json(rows[0]);
        } catch (error) {
          return res.status(500).json({mensagem: "Erro interno Servidor"});
        }
          
        }

  try {
    const categoria_idEncontrada = await pool.query('select * from categorias where id = $1', [categoria_id]);

    if (categoria_idEncontrada.rowCount === 0) {
      return res.status(400).json({ mensagem: 'Categoria não encontrada' });
    }

   const { rows } = await pool.query(
      'insert into produtos (descricao, quantidade_estoque, valor, categoria_id) values ($1, $2, $3, $4) returning *',
      [descricao, quantidade_estoque, valor, categoria_id]); 

    res.status(201).json(rows[0]);

  } catch (error) {
   
    return res.status(500).json({ messagem: 'error interno no servidor' });
  }
};

const editarProduto = async (req, res) => {
  let { descricao, quantidade_estoque, valor, categoria_id, imagem} = req.body; 
  const { id } = req.params;

  const ValidarProduto = await pool.query("select * from produtos where id = $1", [id]);

  if(ValidarProduto.rowCount < 1){
    return res.status(404).json({ mensagem: "Produto Não Encontrado ou Inexistente"});
  }

  const imagemDeletar = await pool.query("select produto_imagem from produtos where id = $1", [id]);
  

if (imagemDeletar.rows[0].produto_imagem !== null){
  excluirArquivo(imagemDeletar.rows[0].produto_imagem);
  await pool.query("update produtos set descricao = $1, quantidade_estoque =$2, valor =$3, categoria_id = $4 where id = $5 returning * ", [descricao, quantidade_estoque, valor, categoria_id, id]);
  await pool.query("update produtos set produto_imagem = null where id = $1", [id]);
}

  if (req.file !== undefined){
    try {      
      const { originalname, mimetype, buffer } = req.file;
      
      const categoria_idEncontrada = await pool.query('select * from categorias where id = $1', [categoria_id]);
      
      if (categoria_idEncontrada.rowCount === 0) {
        return res.status(400).json({ mensagem: 'Categoria não encontrada' });
      }   

       imagem = await upload(
        `produtos/imagens/${originalname}`,
        buffer,
        mimetype
        );
        
        const { rows } = await pool.query(
          'update produtos set descricao = $1, quantidade_estoque = $2, valor = $3, categoria_id = $4, produto_imagem = $5 where id = $6 returning *',
          [descricao, quantidade_estoque, valor, categoria_id, imagem.url, id]);
          
          res.status(201).json(rows[0]);

        } catch (error) {
          console.log(error);
          return res.status(500).json({mensagem: "Erro interno Servidor"});
        }
          
        }
      
  

  try {

    const categoriaValida = await pool.query("select * from categorias where id = $1", [categoria_id])

    if (categoriaValida.rowCount < 1) {
      return res.status(400).json({ mensagem: "Categoria não encontrada" })
    }

    const produto = await pool.query("select * from produtos where id = $1", [id])

    if (produto.rowCount < 1) {
      return res.status(400).json({ mensagem: "Produto não encontrado" })
    }

    const editar = await pool.query("update produtos set descricao = $1, quantidade_estoque = $2, valor = $3, categoria_id = $4 where id = $5 returning*", [descricao, quantidade_estoque, valor, categoria_id, id])

    

    return res.status(200).json(editar.rows[0]);

  } catch (error) {

    console.log(error.mensagem);
    return res.status(500).json("Erro Interno Servidor")
  }

}

const listarProduto = async (req, res) => {

  const categoriaId = req.query.categoria_id;

  try {

    let query;

  (categoriaId) ? query = "SELECT * FROM PRODUTOS WHERE categoria_id = $1" : query = "SELECT ID, DESCRICAO, categoria_id FROM PRODUTOS";

    const { rowCount, rows } = (categoriaId) ? await pool.query(query, [categoriaId]) : await pool.query(query);

    (rowCount === 0) ? res.status(404).json({ mensagem: "Nenhum produto encontrado" }) : res.status(200).json(rows);

  } catch (error) {
    
  return res.status(500).json("Erro Interno Servidor");
  
  };

};

const detalharProduto = async (req, res) => {

  const produtoId = req.params.id;

  try {

    const query = "SELECT * FROM produtos WHERE id = $1";
    const produto = await pool.query(query, [produtoId]);

    return (produto.rowCount === 0) ? res.status(404).json({ mensagem: "Produto não encontrado" }) : res.status(200).json(produto.rows[0]);

  } catch (error) {

    return res.status(500).json("Erro Interno Servidor");

  };

};

const excluirProduto = async (req, res) => {
  const { id } = req.params;

const carrinho = await pool.query("select * from pedido_produtos where produto_id = $1", [id]);

if(carrinho.rowCount >=1){
  return res.status(404).json({ mensagem: "Este Produto Esta vinculado a 1 ou mais Pedidos"})

}
  try {
    const {rows, rowCount} = await pool.query("select * from produtos where id =$1", [id]);
      
    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    if(rows[0].produto_imagem !== null){
      await excluirArquivo(rows[0].produto_imagem);   
}


    await pool.query("delete from produtos where id =$1", [id]);

    return res.status(204).send();

  } catch (error) {
console.log(error);
    return res.status(500).json("Erro Interno Servidor")
  }

};

module.exports = {
  cadastrarProduto,
  editarProduto,
  listarProduto,
  detalharProduto,
  excluirProduto
};
