const pool = require("../conexao");
const { email } = require("./funcoes");



const cadastarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos, produto_id } = req.body
  

  try {
    
    const clienteExistente = await pool.query("select * from clientes where id = $1", [cliente_id]); 

    if (clienteExistente.rowCount < 1) {
      return res.status(401).json({
        mensagem:
          "O cliente informado não existe",
      });
    }

    const usuario = clienteExistente.rows[0].email;
    const nomeCliente = clienteExistente.rows[0].nome;

    let numero = 0
   
    const pedido = await pool.query(
      " insert into pedidos (cliente_id, observacao, valor_total) values ($1, $2, $3) returning*",
      [cliente_id, observacao, numero  ]
    );
   
   
    let valorTotalProduto = 0;
    const somaTotal = [];
    let valorTotal=0;

    for (const pedido_produto of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedido_produto;

      const produtoExistente = await pool.query("select * from produtos where id = $1", [produto_id]);
      if (produtoExistente.rowCount < 1) {
        return res.status(404).json({
          mensagem: "O produto informado não existe",
        });
      }      

      const quantidadeEstoque = produtoExistente.rows[0].quantidade_estoque;
      if (quantidadeEstoque < quantidade_produto) {
        return res.status(400).json({
          mensagem: `Quantidade em estoque insuficiente para o produto com id: ${produto_id}`
        });
      }

    const npp = await pool.query(
        " insert into pedido_produtos (pedido_id, produto_id, quantidade_produto, valor_produto) values ($1, $2, $3, $4) returning*",
        [pedido.rows[0].id, produto_id, quantidade_produto, produtoExistente.rows[0].valor]
      );

      somaTotal.push(valorTotalProduto = npp.rows[0].quantidade_produto * npp.rows[0].valor_produto)

      await pool.query(
        "update produtos set quantidade_estoque = quantidade_estoque - $1 where id = $2",
        [quantidade_produto, produto_id]
      );   

    }

for (let i = 0; i < somaTotal.length; i++){
  valorTotal+= somaTotal[i];
}

    const novoPedido = {
      pedido_id: pedido.rows[0].id,
      cliente_id,
      observacao,
      pedido_produtos,
     valorTotal
    };

    ;
    
    await pool.query("update pedidos set valor_total = $1 where id = $2", [valorTotal, pedido.rows[0].id]);

    const pedidoString = JSON.stringify(novoPedido.pedido_id);
   
    email(nomeCliente, usuario, pedidoString);


    return res.status(201).json(novoPedido)

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" })
  }
}

const pedidosPorCliente = async (req, res) =>{
  const { id } = req.params;

  const clienteValido = await pool.query('select * from clientes where id = $1', [id])
  
  if (clienteValido.rowCount === 0) {
    return res.status(404).json({mensagem: "Cliente não Existe"});
  }
  
    try {
  
      let query = "SELECT p.id, p.valor_total, p.observacao, p.cliente_id FROM pedidos p"
      if (id) {
        query += ` where p.cliente_id = ${id}`;
      }
  
      const resultadoPedidos = await pool.query(query);
      let todosPedidos = [];
  
      for (let i = 0; i < resultadoPedidos.rowCount; i++) {
        let pedido_produtos = await pool.query("SELECT id, quantidade_produto, valor_produto, pedido_id, produto_id FROM pedido_produtos where pedido_id = $1", [resultadoPedidos.rows[i].id]);
  
        let listaPedidos = {
          pedido: {
            id: resultadoPedidos.rows[i].id,
            valor_total: resultadoPedidos.rows[i].valor_total,
            observacao: resultadoPedidos.rows[i].observacao,
            cliente_id: resultadoPedidos.rows[i].cliente_id
          },
          pedido_produtos: pedido_produtos.rows
        }
  
        todosPedidos.push(listaPedidos);
      }
  
      return res.status(200).json(todosPedidos);
  
    } catch (error) {
     
      return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  };



const listarpedidos = async (req, res) => {
  const { id } = req.params;

  try {

    let query = "SELECT p.id, p.valor_total, p.observacao, p.cliente_id FROM pedidos p"
    if (id) {
      query += ` where p.cliente_id = ${id}`;
    }

    const resultadoPedidos = await pool.query(query);
    let todosPedidos = [];

    for (let i = 0; i < resultadoPedidos.rowCount; i++) {
      let pedido_produtos = await pool.query("SELECT id, quantidade_produto, valor_produto, pedido_id, produto_id FROM pedido_produtos where pedido_id = $1", [resultadoPedidos.rows[i].id]);

      let listaPedidos = {
        pedido: {
          id: resultadoPedidos.rows[i].id,
          valor_total: resultadoPedidos.rows[i].valor_total,
          observacao: resultadoPedidos.rows[i].observacao,
          cliente_id: resultadoPedidos.rows[i].cliente_id
        },
        pedido_produtos: pedido_produtos.rows
      }

      todosPedidos.push(listaPedidos);
    }

    return res.status(200).json(todosPedidos);

  } catch (error) {
   
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};


module.exports = {
  cadastarPedido,
  listarpedidos,
  pedidosPorCliente,
  
}
