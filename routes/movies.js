const express = require("express");
const MoviesServices = require("../services/movies");
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require("../utils/schemas/movies");

const validationHandler = require("../utils/middleware/validationHandler");

const cacheRespose = require("../utils/cacheResponse");

const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require("../utils/time");

function moviesApi(app) {
  const router = express.Router();

  app.use("/api/movies", router);

  const moviesService = new MoviesServices();

  router.get("/", async function(req, res, next) {
    cacheRespose(res, FIVE_MINUTES_IN_SECONDS);

    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });

      //throw new Error("Error getting movie"); // test probar middleware error

      res.status(200).json({
        data: movies,
        message: "movies listed"
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    "/:movieId",
    validationHandler({ movieId: movieIdSchema }, "params"), //Validamos el id que viene en los params
    async function(req, res, next) {
      cacheRespose(res, SIXTY_MINUTES_IN_SECONDS);
      const { movieId } = req.params;
      try {
        const movies = await moviesService.getMovie({ movieId });

        res.status(200).json({
          data: movies,
          message: "movies retrieved"
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post("/", validationHandler(createMovieSchema), async function(
    // validamos la creacion de peliculas que viene en el body
    req,
    res,
    next
  ) {
    const { body: movie } = req;

    try {
      const createMovieId = await moviesService.createMovie({ movie });

      res.status(200).json({
        data: createMovieId,
        message: "movie created"
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    "/:movieId",
    validationHandler({ movieId: movieIdSchema }, "params"), //Validamos el id que viene en params y la data que viene en el body
    validationHandler(updateMovieSchema),
    async function(req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updateMovieId = await moviesService.updateMovie({
          movieId,
          movie
        });

        res.status(200).json({
          data: updateMovieId,
          message: "movie updated"
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    "/:movieId",
    validationHandler({ movieId: movieIdSchema }, "params"), // Validamos el id que viene en los params
    async function(req, res, next) {
      const { movieId } = req.params;
      try {
        const deleteMovieId = await moviesService.deleteMovie({ movieId });

        res.status(200).json({
          data: deleteMovieId,
          message: "movie deleted"
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = moviesApi;
