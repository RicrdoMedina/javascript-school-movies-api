const express = require("express");
const app = express();

const { config } = require("./config/index");
const moviesApi = require("./routes/movies.js");

const {
  logErrors,
  errorHandler,
  wrapErrors
} = require("./utils/middleware/errorHandlers");

const notFoundHandler = require("./utils/middleware/notFoundHandler");

// Permitir interpretar datos json usando body parser
app.use(express.json());

//routes
moviesApi(app);

// catch 404
app.use(notFoundHandler);

// Los middleware deben ir al final de las rutas
app.use(logErrors);
app.use(wrapErrors); //En la mitad para caturar los error con boom
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
