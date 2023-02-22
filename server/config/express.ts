const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set("strictQuery", false);

module.exports = () => {
  const app = express();

  // definindo variaveis globais
  app.set("port", process.env.PORT || config.get("server.port"));
  app.set("db_admin", process.env.DB_ADMIN || config.get("databaseAuth.admin"));
  app.set("db_user", process.env.DB_ADMIN || config.get("databaseAuth.user"));

  // middlewares
  app.use(bodyParser.json());
  app.use(cors(process.env.CORS_OPT || config.get("corsOptions")));

  return app;
};
