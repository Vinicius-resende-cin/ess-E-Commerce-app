module.exports = () => {
  const express = require("express");
  const router = express.Router();

  // Define uma rota para o endpoint da api
  router.get("/", (req: any, res: any) => {
    res.send("A api está funcionando!");
  });

  // Define as rotas para cada feature
  // const usuarios = require("./routes/usuarios")();
  // const auth = require("./routes/auth")();
  const pedidos = require("./routes/pedidos")();
  // const itens = require("./routes/itens")();
  // const categorias = require("./routes/categorias")();
  // const links = require("./routes/links")();

  // router.use("/usuarios", usuarios);
  // router.use("/auth", auth);
  router.use("/pedidos", pedidos);
  // router.use("/itens", itens);
  // router.use("/categorias", categorias);
  // router.use("/links", links);

  return router;
};
