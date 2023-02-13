const express = require("express");
const router = express.Router();

// Define a route for the API endpoint
router.get("/", (req: any, res: any) => {
  res.send({ message: "Hello world!" });
});

module.exports = router;
