module.exports = () => {
    const express = require("express");
    const router = express.Router();
    const controller = require("../controllers/users")(); //Importa as funções do arquivo controllers
  
    router.post("/", controller.sendUser);
    router.get("/", controller.getAllusers);
    router.delete("/:cpf/:passorwdTest", controller.deleteUser);
    router.get("/session", controller.getCurrentUser);
  
    return router;
  };
  