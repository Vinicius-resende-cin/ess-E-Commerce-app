import { Sha256 } from '@aws-crypto/sha256-js';

module.exports = () => {
    const mongoose = require("mongoose");
  
    const Schema = mongoose.Schema;
  
    if (!mongoose.models.Cadastro) {
      // Define um Schema
      const cadastroSchema = new Schema({
        id_usuario: String,
        email: String,
        hash_senha: String,
        token_sessao: String
      });
    
      // Define o modelo
      const model = mongoose.model("Cadastro", cadastroSchema);
    
      return model;
    }
    else{
      return mongoose.model('Cadastro');
    }
  };
  
  
 