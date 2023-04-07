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
        } else {
          res.send({ failure: "O User não pode ser inserido" });
        }
      } catch (RR) {
        res.send({ failure: "O User não pode ser inserido" });
      }
    },

    getAllusers: async (req: any, res: any) => {
      try {
        const userFind = await userModel.find({}, { _id: false });
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

    findUser: async (req: any, res: any) => {
      const infoVerify = JSON.stringify(req.query);

      try {
        const userFind = await userModel.find({}, { _id: false });
        res.json(userFind);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  };

  return controller;
};

function getInfoCad() {
  throw new Error("Function not implemented.");
}
