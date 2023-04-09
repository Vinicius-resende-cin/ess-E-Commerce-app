import { Sha256 } from "@aws-crypto/sha256-js";

module.exports = () => {
  const userModel = require("../../models/userModel")();
  //const userFind = await userModel.find({}, { _id: false }); // Retorna tudo
  const controller = {
    verifyExist: async (obj: any) => {
      let filter: any = obj;
      const userFind = await userModel.aggregate([
        { $match: filter },
        {
          $project: {
            nomeCompleto: "$nomeCompleto",
            cpf: "$cpf",
            celular: "$celular",
            dataNasci: "$dataNasci",
            email: "$email",
            senha: "$senha",
            endereco: "$endereco",
            complemento: "$complemento",
            cep: "$cep",
            estado: "$estado",
            cidade: "$cidade"
          }
        }
      ]);

      return userFind;
    },

    sendUser: async (req: any, res: any) => {
      try {
        let user = req.body; //Recebe os valores do put
        delete user.senhaC;
        delete user.emailC;
        user.permissao = 0; //Garantir a segurança do sistema
        let cpfExist: any = await controller.verifyExist({ cpf: user.cpf });
        let emailExist: any = await controller.verifyExist({ email: user.email });
        console.log(cpfExist);
        console.log(emailExist);
        if (cpfExist.length === 0 && emailExist.length === 0) {
          //Realiza o hash da senha
          const hash = new Sha256();
          hash.update(user.senha);
          const hashPass = await hash.digest();
          user.senha = hashPass;

          await userModel.create(user);
          res.send({ success: "O User foi inserido com sucesso" });
        } else if (!(cpfExist.length === 0) && emailExist.length === 0) {
          res.send({ CPF: "O CPF a ser cadastrado já existe no sistema" });
        } else if (cpfExist.length === 0 && !(emailExist.length === 0)) {
          res.send({ EMAIL: "O E-mail a ser cadastrado já existe no sistema" });
        } else if (!(cpfExist.length === 0) && !(emailExist.length === 0)) {
            res.send({ EMAIL: "O E-mail a ser cadastrado já existe no sistema", CPF: "O CPF a ser cadastrado já existe no sistema" });
        } else {
          res.send({ failure: "O User não pode ser inserido" });
        }
      } catch (RR) {
        res.send({ failure: "O User não pode ser inserido" });
      }
    },

    getAllusers: async (req: any, res: any) => {
      try {
        const userFind = await userModel.find({ $or: [{ permissao: 0 }, { permissao: 1 }] });
        res.json(userFind);
      } catch (err) {
        res.status(500).send(err);
      }
    },

    getCurrentUser:async (req: any, res: any) => {
      try{
        let userFind = await userModel.find({email: req.session.user_email})
        res.send(userFind)

      }catch (err) {
        return err
      }
    },

    deleteUser: async (req: any, res: any) => {
      try {
        //Recebe a tentativa do usuário
        let userPassword = req.params.passorwdTest;
        const hash = new Sha256();
        hash.update(userPassword);
        const hashPass = await hash.digest();
        var passString : string = hashPass.toString();
        
        //Pega a senha do usuário no BD
        let user = await userModel.find({email: req.session.user_email})
   
        //Verifica se a senha informada está correta
        if (user[0].senha == passString) {
          await userModel.deleteOne({ cpf: req.params.cpf });
          res.send({ Sucess: "Usuário Deletado com Sucesso" });
          
        } else {
          res.send({ failure: "Senha inserida está incorreta" });
        }
        
      } catch (err) {
        res.status(500).send(err);
      }
    },

    updateUserPermission: async (req: any, res: any) => {

      try{
        let userUpdate = req.body

        let userPassword = req.params.passorwdTest;
        const hash = new Sha256();
        hash.update(userPassword);
        const hashPass = await hash.digest();
        var passString : string = hashPass.toString();
        
        //Pega a senha do usuário no BD
        let userAdmin = await userModel.find({email: req.session.user_email})
        
        if (userAdmin[0].senha == passString) {
          if (userUpdate.permissao == 0){
            userModel.updateOne({cpf: userUpdate.cpf}, { $set: { permissao: 1}}).exec();
            res.send({ Sucess: "Permissão do Usuário foi alterada com Sucesso" });
          }
          else if(userUpdate.permissao == 1){
            userModel.updateOne({cpf: userUpdate.cpf}, { $set: { permissao: 0}}).exec();
            res.send({ Sucess: "Permissão do Usuário foi alterada com Sucesso" });
          }
          else{
            res.send({ failure: "Senha inserida está incorreta" });
          }
        }else{
          res.send({ failure: "Senha inserida está incorreta" });
        }
      }catch (err) {
        res.status(500).send(err);
      }
    }, 

    updatePassword: async (req: any, res: any) => {
      let userUpdate = req.body
      console.log(userUpdate)
      console.log(req.params.actuaPassword)
      console.log(req.params.newPassword)

      const hash = new Sha256();
      hash.update(req.params.actuaPassword);
      const hashPass = await hash.digest();
      var passString : string = hashPass.toString();
      
      //Pega a senha do usuário no BD
      let userAdmin = await userModel.find({email: req.session.user_email})
      
      if (userAdmin[0].senha == passString) {
        const hash = new Sha256();
        hash.update(req.params.newPassword);
        const hashPass = await hash.digest();
        userModel.updateOne({cpf: userAdmin[0].cpf}, { $set: { senha: hashPass}}).exec();
        res.send({ Sucess: "A senha foi alterada com sucesso" });

      }else{
        res.send({ failure: "Senha inserida está incorreta" });
      }
    },

    updateAddress:async (req: any, res: any) => {
      console.log("Passei aqui")
     
      let userUpdate = req.body
      let userAdmin = await userModel.find({email: req.session.user_email})
      console.log(userUpdate)
      console.log(userAdmin)
      
      const hash = new Sha256();
      hash.update(req.params.passorwdTest);
      const hashPass = await hash.digest();
      var passString : string = hashPass.toString();

      if (userAdmin[0].senha == passString) {
        userModel.updateOne({cpf: userAdmin[0].cpf}, { $set: { endereco: userUpdate.endereco, complemento: userUpdate.complemento, cep: userUpdate.cep, cidade: userUpdate.cidade, estado: userUpdate.estado}}).exec();
        res.send({ Sucess: "O endereço foi alterado com sucesso" });

      }else{
        res.send({ failure: "Senha inserida está incorreta" });
      }
  
    }
  }

  return controller;
};

function getInfoCad() {
  throw new Error("Function not implemented.");
}
