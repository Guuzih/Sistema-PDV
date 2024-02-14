const joi = require("joi");
("");
const schemaCliente = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),
  cpf: joi.string().required().messages({
    "any.required": "O campo cpf é obrigatório",
    "string.empty": "O campo cpf é obrigatório",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),
  cep: joi.string().trim().messages({
    "any.required": "O campo cep é obrigatório",
    "string.empty": "O campo cep é obrigatório",
  }),
  rua: joi.string().trim().messages({
    "any.required": "O campo rua é obrigatório",
    "string.empty": "O campo rua é obrigatório",
  }),
  numero: joi.string().messages({
    "any.required": "O campo numero é obrigatório",
    "string.empty": "O campo numero é obrigatório",
  }),
  bairro: joi.string().trim().messages({
    "any.required": "O campo bairro é obrigatório",
    "string.empty": "O campo bairro é obrigatório",
  }),
  cidade: joi.string().trim().messages({
    "any.required": "O campo cidade é obrigatório",
    "string.empty": "O campo cidade é obrigatório",
  }),
  estado: joi.string().trim().messages({
    "any.required": "O campo estado é obrigatório",
    "string.empty": "O campo estado é obrigatório",
  }),
});

module.exports = {
  schemaCliente,
};
