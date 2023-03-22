module.exports = () => {
  const express = require("express");
  const router = express.Router();

  // Define as rotas
  const users = require("./routes/users")();
  // const auth = require("./routes/auth")();
  const pedidos = require("./routes/pedidos")();
  // const itens = require("./routes/itens")();
  // const categorias = require("./routes/categorias")();
  // const links = require("./routes/links")();

  router.use("/users", users);
  // router.use("/auth", auth);
  router.use("/pedidos", pedidos);
  // router.use("/itens", itens);
  // router.use("/categorias", categorias);
  // router.use("/links", links);

  return router;
};
