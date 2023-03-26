const mongoose = require("mongoose");
const app = require("./config/express")();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const api = require("./api/api")();
const port = app.get("port");
const db_admin_psw = app.get("db_admin_psw");
const express_sk = app.get("express_sk");

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

//cria um store de sessoes do mongoDB
const mongoStore = new MongoDBStore({
  collection: 'sessions',
  uri: mongoose.connection.getClient().s.url
});

mongoStore.on('error', function(error: any) {
  console.log(error);
});

//cria a sessao
app.use(session({
  secret: express_sk,
  resave: false,
  saveUninitialized: false,
  secure: true,
  store: mongoStore,
  cookie: { maxAge: 1000 * 60 * 60 * 1 } //1 hora
}));


//paginas temporárias para debuggar o login, remover eventualmente
app.use('/logged',function(req: any, res: any){
  console.log(req.session);
  res.send(req.session.loggedIn?"logado":"nao logado");
})

app.use('/check',function(req: any, res: any){
  res.send(req.session);
})

app.use('/toggleLogged',function(req: any, res: any){
  console.log(req.session);
  req.session.loggedIn = !req.session.loggedIn;

  res.send(req.session.loggedIn?"foi logado":"foi deslogado");

  req.session.save();
})
//================================================

// rotas
app.use("/api", api);

// Inicia o server
app.listen(3000, () => {
  console.log(`Servidor rodando na porta ${port}!`);
});

export {};
