module.exports = () => {
  const mongoose = require("mongoose");

  const Schema = mongoose.Schema;

  // Define um Schema
  const pedidoSchema = new Schema({
    id_pedido: Number,
    id_produto: Array<String>,
    data_hora: Date,
    valor: Number,
    quantidade: Array<String>,
    status: String,
  });

  // Define o modelo
  const model = mongoose.model("Pedido", pedidoSchema);

  return model;
};
