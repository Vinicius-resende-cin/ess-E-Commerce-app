module.exports = () => {
  const express = require("express");
  const router = express.Router();
  const controller = require("../controllers/auth")();
  const rateLimit = require("express-rate-limit");
  const userModel = require("../../models/userModel")();

  const loginLimiter = rateLimit({
    windowMs: 1000 * 60 * 30, // 30 minutos
    max: (req: any, res: any) => {
      if (req.body.email == "ecommercin@gmail.com") return 0;
      else return 10;
    }, // 10 tentativas
    statusCode: 200,
    handler: async function (req: any, res: any) {
      let registered = false;
      const foundUser = await userModel
        .findOne({ email: req.body.email }, { _id: false, _v: false })
        .exec();

      if (foundUser) registered = true;

      res.status(200).json({
        success: false,
        registered: registered,
        wasLogged: false,
        triesExceeded: true,
        message: "Limite de tentativas excedido"
      });
    }
  });

  router.post("/login", loginLimiter, controller.tryLogin);
  router.post("/confirmPassword", loginLimiter, controller.confirmPassword);
  router.get("/session", controller.checkSession);
  router.post("/logout", controller.logout);
  // router.get("/resetTries", async (req: any, res: any, next: any) => {
  //   await loginLimiter.resetKey(<string>req.ip);
  //   res.send("resetado");
  // });
  return router;
};
