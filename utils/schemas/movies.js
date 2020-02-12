const joi = require("@hapi/joi");

const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/); //Validar con regex el id de mongoDB
const movieTitleSchema = joi.string().max(80);
const movieYearSchema = joi
  .number()
  .min(1888)
  .max(2077);
const movieCoverSchema = joi.string().uri();
const movieDescripcion = joi.string().max(300);
const movieDuractionSchema = joi
  .number()
  .min(1)
  .max(300);
const movieContentRatingSchema = joi.string().max(5);
const movieSourceSchema = joi.string().uri();
const movieTagSchema = joi.array().items(joi.string().max(50));

const createMovieSchema = {
  // Crear pelicula
  title: movieTitleSchema.required(),
  year: movieYearSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescripcion.required(),
  duration: movieDuractionSchema.required(),
  contentRating: movieContentRatingSchema.required(),
  source: movieSourceSchema.required(),
  tags: movieTagSchema
};

const updateMovieSchema = {
  // Actualizar pelicula
  title: movieTitleSchema,
  year: movieYearSchema,
  cover: movieCoverSchema,
  description: movieDescripcion,
  duration: movieDuractionSchema,
  contentRating: movieContentRatingSchema,
  source: movieSourceSchema,
  tags: movieTagSchema
};

module.exports = {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
};
