const assert = require("assert"); //Verificar si el test es exitoso
const proxyquire = require("proxyquire"); //permite cada vez que hagamos un require podemos elegir que en vez que traiga el paquete real nos traiga un mock

const { moviesMock, MoviesServiceMock } = require("../utils/mocks/movies"); //Traemos los mocks a utilizar

const testServer = require("../utils/testServer"); //Nuestro server de pruebas

// Describimos nuestros test, le podmeos colocar el nombre que queramos
describe("routes - movies", function() {
  // proxyquire interviene la ruta de las peliculas, pasandole el path de nuestro archivo de rutas para usarlo con proxyquire
  // con proxyquire podemos decirle el mocks que debe usar para esta ruta, ya que no queremos usar nuestros servicios
  // Los servicios de prueban a parte este test es solo para las rutas
  const route = proxyquire("../routes/movies", {
    "../services/movies": MoviesServiceMock // Aqui le indicamos que remplace la llamada a nuestros servicios por nuestro mock
  });

  const request = testServer(route); // Creamos el request pasandole esa unica ruta

  describe("GET /movies", function() {
    //test de status
    it("should respond with status 200", function(done) {
      request.get("/api/movies").expect(200, done);
    });

    //test de la data que devuelve la ruta
    it("should respond with the list of movies", function(done) {
      request.get("/api/movies").end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: "movies listed"
        });

        done(); // Importante para indicarle al test que finalizo
      });
    });
  });
});
