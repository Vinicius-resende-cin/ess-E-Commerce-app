const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });

mongoose.set("strictQuery", false);

module.exports = () => {
  const app = express();

  // definindo variaveis globais
  app.set("port", process.env.PORT || config.get("server.port"));
  app.set("db_admin_psw", process.env.DB_ADMIN_PSW);
  app.set("db_user_psw", process.env.DB_USER_PSW);
  app.set("express_sk", process.env.EXPRESS_SK);
  app.set("email_psw", process.env.EMAIL_PSW);
  app.set("token_sk", process.env.TOKEN_SK);

  // middlewares
  app.use(bodyParser.json());
  app.use(cors(process.env.CORS_OPT || config.get("corsOptions")));

  return app;
};
