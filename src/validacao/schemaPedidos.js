const joi = require("joi");
("");
const schemaPedidos= joi.object({
  cliente_id: joi.number().required().greater(0).messages({
        "any.required": "O campo cliente_id é obrigatório",
    "number.base": "O campo cliente_id precisa ser um número",
    "number.greater": "o cliente_id 0 não existe"
    }),
  observacao: joi.string().messages({
        "any.required": "O campo observacao é obrigatório",
        "string.empty": "O campo observacao é obrigatório",
    }),
  pedido_produtos: joi.array().min(1).items(
    joi.object({
  produto_id: joi.number().required().greater(0).messages({
        "any.required": "O campo produto_id é obrigatório",
    "number.base": "O campo produto_id precisa ser um número",
    "number.greater": "o produto_id 0 não existe"
    }),
  quantidade_produto: joi.number().required().greater(0).messages({
        "any.required": "O campo quantidade_produto é obrigatório",
    "number.base": "O campo quantidade_produto precisa ser um número",
    "number.greater": "O campo quantidade_produto precisa ser maior que zero"
    }),
})
) .required()
.messages({
  "array.min": "O campo pedido_produtos deve conter pelo menos um item",
  "any.required": "O campo pedido_produtos é obrigatório"
})
});

module.exports = {
  schemaPedidos
};