const mongoose = require("mongoose");
const app = require("./config/express")();
const api = require("./api/api")();

const port = app.get("port");
const db_admin_psw = app.get("db_admin_psw");

// rotas
app.use("/api", api);

// Conecta ao mongodb
mongoose
  .connect(
    `mongodb+srv://admin:${db_admin_psw}@cluster0.zopdelz.mongodb.net/e-commerce?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("Failed to connect to MongoDB", err));

// Inicia o server
app.listen(3000, () => {
  console.log(`Servidor rodando na porta ${port}!`);
});

export {};
