module.exports = () => {
    const express = require("express");
    const router = express.Router();
    const controller = require("../controllers/usuarios")();
    
    router.post("/:id" ,controller.requestReset);
    router.put("/", controller.changePassword);
    
    return router;
  };
  