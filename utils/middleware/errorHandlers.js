//Acceso a las variables de entorno
//Dependiendo del entorno mostraremos el stack del error si develoment si es prod solo un msj
const boom = require("@hapi/boom");
const { config } = require("../../config/index");

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack }; //Destructuramos para tener todos los elementos del error, message, status, etc
  }
  return error;
}

// Usamos boom para obtener todos los errors con boom
function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err); // Llamanos al siguiente middleware con el error
}

function logErrors(err, req, res, next) {
  console.log(err); //debug en la terminal
  next(err); // llamar al siguiente middleware de error
}

function errorHandler(err, req, res, next) {
  // es necesario lo cuatro parametros para que express detecte que es un middleware
  const {
    output: { statusCode, payload }
  } = err; //Obtenemos los elementos del error que destructuramos anteriormente
  console.log("*******", err);

  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  errorHandler,
  wrapErrors
};
