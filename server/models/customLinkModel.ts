module.exports = () => {
  const mongoose = require("mongoose");

  const Schema = mongoose.Schema;

  const customLinkSchema = new Schema({
    id: Number,
    url: String
  });

  const model = mongoose.model("CustomLink", customLinkSchema);

  return model;
};