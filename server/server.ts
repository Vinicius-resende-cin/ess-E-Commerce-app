const app = require("./config/express")();
const port = app.get("port");

app.listen(3000, () => {
  console.log(`Servidor rodando na porta ${port}!`);
});
