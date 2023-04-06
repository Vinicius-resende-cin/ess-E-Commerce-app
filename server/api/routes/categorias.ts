module.exports = () => {
  const express = require("express");
  const controller = require("../controllers/categorias")();
  const router = express.Router();

  router.get("/", controller.getAllCategories);

  router.post("/", controller.createCategory);
  router.get("/criar-categoria", controller.createCategory);

  router.put("/:nome", controller.updateCategory);

  return router;
};
