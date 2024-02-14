const joi = require("joi");

const schemaProdutos = joi.object({
    descricao: joi.any().required().messages({
		"any.required": "O campo descrição é obrigatório",
		"string.empty": "O campo descrição é obrigatório",
	}),

    quantidade_estoque: joi.number().required().greater(0).messages({
		"any.required": "O campo quantidade estoque é obrigatório",
        "number.greater": "O campo quantidade estoque precisa ser um número positivo",
        "number.base": "O campo quantidade estoque precisa ser um número"
	}),

    valor: joi.number().required().greater(0).messages({
		"any.required": "O campo valor é obrigatório",
        "number.greater": "O campo valor precisa ser um número positivo",
        "number.base": "O campo valor precisa ser um número"
	}),

    categoria_id: joi.number().required().greater(0).messages({
		"any.required": "O campo categoria id é obrigatório",
        "number.greater": "O campo categoria id precisa ser um número positivo",
        "number.base": "O campo categoria id precisa ser um número"
	}),

    produto_imagem: joi.string().trim().messages({
        "any.required": "O campo produto imagem é obrigatório",
        "string.empty": "O campo produto imagem é obrigatório"		
    })
});

const schemaEditarProduto = joi.object({
	descricao: joi.string().required().messages({
        "any.required": "O campo descrição é obrigatório",
        "string.empty": "O campo descrição é obrigatório",
        
    }),

    quantidade_estoque: joi.number().required().greater(0).messages({
        "any.required": "O campo quantidade é obrigatório",
        "number.empty": "O campo quantidade é obrigatório",
		"number.required": "O campo categoria é numérico obrigatório",
        "number.greater": "O campo quantidade precisa ser um número positivo"
    }),

    valor: joi.number().required().greater(0).messages({
        "any.required": "O campo valor é obrigatório",
        "number.empty": "O campo valor é obrigatório",
		"number.greater": "O campo valor precisa ser um número positivo"
    }),

	categoria_id: joi.number().required().messages({
        "any.required": "O campo categoria é obrigatório",
        "number.empty": "O campo categoria é obrigatório",
		"number.required": "O campo categoria é numérico obrigatório",
		"string.empyt": "O campo categoria é numérico obrigatório"
    }),

    produto_imagem: joi.string().trim().messages({
        "any.required": "O campo produto imagem é obrigatório",
        "string.empty": "O campo produto imagem é obrigatório"		
    })
});




module.exports = {
    schemaProdutos,
    schemaEditarProduto
}
