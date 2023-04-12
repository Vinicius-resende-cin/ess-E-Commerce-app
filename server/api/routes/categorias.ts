module.exports = () => {
  const express = require("express");
  const controller = require("../controllers/categorias")();
  const router = express.Router();

  router.get("/", controller.getAllCategories);
  router.get("/criar-categoria", controller.createCategory);

  router.post("/", controller.createCategory);

  router.put("/:nome", controller.updateCategory);

  router.delete("/:nome", controller.deleteCategory);

  return router;
};
