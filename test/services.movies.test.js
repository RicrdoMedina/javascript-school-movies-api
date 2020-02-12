const assert = require("assert");

const proxyquire = require("proxyquire");

const { MongoLibMock, getAllStub } = require("../utils/mocks/mongoLib");

const { moviesMock } = require("../utils/mocks/movies");

describe("services - movies", function() {
  const MovieServices = proxyquire("../services/movies", {
    //Indicamos a proxyquire el servicio y reemplazamos la libreria de mongo por el mock
    "../lib/mongo": MongoLibMock
  });

  const moviesService = new MovieServices(); // Creamos la instancia de nuestro servicio

  describe("when getMovies method is called", async function() {
    // COmo los servicios son funciones asincronas el test debe tener un callback asincrono igualmente
    //Comprobar que el metodo se llama en la libreria
    it("should call the getall MongoLib method", async function() {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true); //Indicamos que el llamado a moviesService.getMovies debe ser estrictamente igual a cuando el getAllStub fue llamado
    });

    //Comprobar que retorne un array de peliculas
    it("should return an array of movies", async function() {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected); // Comprobar el resultado de objetos de muchos niveles
    });
  });
});
