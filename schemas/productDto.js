const Joi = require('joi');

//Creación del objeto "product" para validar los datos recibidos en las peticiones
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);

//Schemas o Dtos
const createProductDto = Joi.object({
  name: name.required(),
  price: price.required(),
});

const updateProductDto = Joi.object({
  name: name,
  price: price,
});

const getProductDto = Joi.object({
  id: id.required(),
});

module.exports = { createProductDto, updateProductDto, getProductDto };
