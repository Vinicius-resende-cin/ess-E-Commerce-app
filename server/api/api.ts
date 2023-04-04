module.exports = () => {
  const express = require("express");
  const router = express.Router();

  // Define as rotas
  const usuarios = require("./routes/usuarios")();
  const auth = require("./routes/auth")();
  const users = require("./routes/users")();
  const pedidos = require("./routes/pedidos")();
  const itens = require("./routes/itens")();
  const categorias = require("./routes/categorias")();
  // const links = require("./routes/links")();

  router.use("/usuarios", usuarios);
  router.use("/auth", auth);
  router.use("/users", users);
  router.use("/pedidos", pedidos);
  router.use("/itens", itens);
  router.use("/categorias", categorias);
  // router.use("/links", links);

  return router;
};
