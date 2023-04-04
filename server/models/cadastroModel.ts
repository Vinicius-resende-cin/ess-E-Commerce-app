//modelo temporário para testar login, substituir pelo modelo de cadastro final
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
  
  
 