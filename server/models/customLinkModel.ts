module.exports = () => {
  const mongoose = require("mongoose");

  const Schema = mongoose.Schema;

  // Define o Schema 'customLinkSchema'
  const customLinkSchema = new Schema({
    id: Number,
    url: String
  });

  // Define o modelo 'customLink'
  const model = mongoose.model("CustomLink", customLinkSchema);

  return model;
};