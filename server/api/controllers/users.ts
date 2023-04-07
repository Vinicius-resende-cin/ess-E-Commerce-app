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
        console.log(userFind);
        res.json(userFind);
      } catch (err) {
        res.status(500).send(err);
      }
    },

    deleteUser: async (req: any, res: any) => {
      try {
        let userPassword = req.params.passorwdTest;
        const hash = new Sha256();
        hash.update(userPassword);
        const hashPass = await hash.digest();
        userPassword = hashPass;
        let rightPassword: any = await controller.verifyExist({ senha: userPassword });
        if (rightPassword.length === 0) {
          res.send({ failure: "Senha inserida está incorreta" });
        } else {
          await userModel.deleteOne({ cpf: req.params.cpf });
          res.send({ Sucess: "Usuário Deletado com Sucesso" });
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
