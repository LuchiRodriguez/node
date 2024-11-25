const boom = require('@hapi/boom');

//Esta función recibe un schema o dto, le decimos con property dónde buscar la información y devuelve un middleware dinámico
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = { validatorHandler };
