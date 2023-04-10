module.exports = () => {
  const express = require("express");
  const controller = require("../controllers/customLinks")();
  const router = express.Router();

  router.post("/", controller.generateCustomLink);
  router.get("/", controller.getAllCustomLinks);
  router.get("/:id", controller.getCustomLink);

  return router;
};
