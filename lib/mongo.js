const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config/index");

const USER = encodeURIComponent(config.dbUser); //encodeURIComponent garantiza que si hay caracteres especiales no haya problema
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

//Ejemplo con puerto
//const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`; // Se recomienda usar retryWrites=true&w=majority

//Sin puerto
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`; // Se recomienda usar retryWrites=true&w=majority

console.log(MONGO_URI);
class MongoLib {
  constructor() {
    // Definir el cliente
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true
    }); // use el parseo de url useNewUrlParser
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      // Singleton connection
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log("Connected succesfully to mongo!");
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  // pasamos la collection para que funcione con cualquier collection
  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  get(collection, id) {
    return this.connect().then(db => {
      // Le pasamos nuestro propio query { _id: ObjectId(id) }
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).updateOne(
          { _id: ObjectId(id) }, // updateOne busca si existe, si existe lo edita
          { $set: data }, //Le pasamos la data que actualizara
          { upserted: true } // Determina si actualiza o inserta
        );
      })
      .then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(result => id);
  }
}

module.exports = MongoLib;
