module.exports = () => {
    const express = require("express");
    const router = express.Router();
    const controller = require("../controllers/auth")();
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

    router.post("/login", loginLimiter, controller.tryLogin);
    router.post("/confirmPassword", loginLimiter, controller.confirmPassword);
    router.get("/session", controller.checkSession);
    router.post("/logout", controller.logout);
    router.get('/resetTries', (req:any, res:any, next:any) => {
      loginLimiter.resetKey('::ffff:127.0.0.1');
      res.send("resetado");
    });
    return router;
  };
  