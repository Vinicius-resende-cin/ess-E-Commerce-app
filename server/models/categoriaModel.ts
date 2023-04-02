module.exports = () => {
  const mongoose = require("mongoose");

  const Schema = mongoose.Schema;

  // Define um Schema
  const categoriaSchema = new Schema({
    nome_categoria: String,
    descricao_categoria: String
  });

  // Define o modelo
  const model = mongoose.model("Categoria", categoriaSchema);

  return model;
};
