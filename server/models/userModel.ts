module.exports = () => {
  const mongoose = require("mongoose");

  const Schema = mongoose.Schema;

  if (!mongoose.models.User) {
    // Define um Schema
    const userschema = new Schema({
      nomeCompleto: String,
      cpf: String,
      celular: String,
      dataNasci: String,
      email: String,
      senha: String,
      endereco: String,
      complemento: String,
      cep: String,
      estado: String,
      cidade: String,
      permissao: Number 
    });

    // Define o modelo
    const model = mongoose.model("User", userschema);

    return model;
  } else {
    return mongoose.model("User");
  }
};
