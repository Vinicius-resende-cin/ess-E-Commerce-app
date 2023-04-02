module.exports = () => {
  const express = require("express");
  const bodyParser = require("body-parser");
  const router = express.Router();
  const controller = require("../controllers/categorias")();

  router.use(bodyParser.json());

  router.get("/", controller.getAllCategories);

  router.post("/", controller.createCategory);
  router.get("/criar-categoria", controller.createCategory)

  router.put("/:id", controller.updateCategory);

  return router;
};
