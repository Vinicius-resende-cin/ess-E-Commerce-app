module.exports = () => {
    const express = require("express");
    const router = express.Router();
    const controller = require("../controllers/usuarios")();
    const rateLimit = require('express-rate-limit');

    const loginLimiter = rateLimit({
      windowMs: 1000 * 60 * 30, // 30 minutos
      max: 10, // 10 tentativas
      statusCode:200,
      handler: function(req:any, res:any) {
        res.status(200).json({
          success: false,
          registered: false,
          wasLogged: false,
          triesExceeded: true,
          message: 'Limite de tentativas excedido'
        });
      },
    });
    
    router.post("/:id", loginLimiter ,controller.requestReset);
    router.put("/", loginLimiter, controller.changePassword);
    
    return router;
  };
  