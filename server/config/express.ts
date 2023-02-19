const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");

module.exports = () => {
  const app = express();
  const api = require("../api/api")();

  // definindo variaveis globais
  app.set("port", process.env.PORT || config.get("server.port"));

  // middlewares
  app.use(bodyParser.json());

  // rotas
  app.use("/api", api);

  return app;
};
