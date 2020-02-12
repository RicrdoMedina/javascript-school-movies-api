const sinon = require("sinon"); // permite probar si el servico q fue ejecutado llamo los metodos de la libreria
const { moviesMock, filteredMoviesMock } = require("./movies"); //mocks que usaremos en las pruebas

const getAllStub = sinon.stub(); // Crear el stub para el getAll

getAllStub.withArgs("movies").resolves(moviesMock); // definimos la respuesta para el getAll

const tagQuery = { tags: { $in: ["Drama"] } }; //query para filtrar peliculas

getAllStub.withArgs("movies", tagQuery).resolves(filteredMoviesMock("Drama")); // definimos la respuesta

const createStub = sinon.stub().resolves(moviesMock[0].id); //definimos la respuesta para la creacion de peliculas

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query); // retornamos el stub correspondiente
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
};
