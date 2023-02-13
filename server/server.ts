const express = require("express");
const app = express();
const api = require("./routes/api");

app.use("/api", api);

app.get("/", (req: any, res: any) => {
  res.send("Server is working!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

export {};
