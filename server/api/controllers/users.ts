import { Sha256 } from "@aws-crypto/sha256-js";

module.exports = () => {
  const userModel = require("../../models/userModel")();
  const controller = {

    //Método utilizada nos testes para verificar que não há o usuário cadastrado no sistema
    getVerifyCad :async (req: any, res: any) => {
      let info:string = req.params.info;
      let infoFind:string = ''
      //Condicional para verificar se o parâmetro passado é um email ou um CPF
      if (info.indexOf('@') !== -1){
        infoFind = await userModel.find({email: info});
      }
      else{
        infoFind = await userModel.find({cpf: info});
        
      }

      res.send(infoFind);
    },

    //Método responsável por criptografar a senha informada pelo usuário
    async hashPassword(UserPass: string){
      const hash = new Sha256();
      hash.update(UserPass);
      const hashPass = await hash.digest();
      return hashPass
    },

    //Método responsável por cadastrar um novo usuário no banco de dados
    sendUser: async (req: any, res: any) => {
      try {
        let user = req.body; 
        //Deletando informações desnecessárias 
        delete user.senhaC;
        delete user.emailC;
        user.permissao = 0; //Garantir que todos os usuários terão permissão zero
        let cpfExist: any = await userModel.find({ cpf: user.cpf });
        let emailExist: any = await userModel.find({ email: user.email });
        
        //Condicional que verifica que não há nenhum usuário no sistema com o mesmo CPF ou com o mesmo EMAIL
        if (cpfExist.length === 0 && emailExist.length === 0) {
          //Realiza o hash da senha
          user.senha = await await controller.hashPassword(user.senha);
          await userModel.create(user);
          res.send({ success: "O User foi inserido com sucesso" });

        } else if (!(cpfExist.length === 0) && emailExist.length === 0) {
          res.send({ CPF: "O CPF a ser cadastrado já existe no sistema" });

        } else if (cpfExist.length === 0 && !(emailExist.length === 0)) {
          res.send({ EMAIL: "O E-mail a ser cadastrado já existe no sistema" });

        } else if (!(cpfExist.length === 0) && !(emailExist.length === 0)) {
          res.send({
            EMAIL: "O E-mail a ser cadastrado já existe no sistema",
            CPF: "O CPF a ser cadastrado já existe no sistema"
          });

        } else {
          res.send({ failure: "O User não pode ser inserido" });
        }
      } catch (RR) {
        res.send({ failure: "O User não pode ser inserido" });
      }
    },

    //Método que retorna todos os usuários do sistema com permissão == 0 ou == 1 
    getAllusers: async (req: any, res: any) => {
      try {
        const userFind = await userModel.find({
          $or: [{ permissao: 0 }, { permissao: 1 }]
        });
        res.json(userFind);
      } catch (err) {
        res.status(500).send(err);
      }
    },

    //Método que retorna as informações do usuário logado no sistema
    getCurrentUser: async (req: any, res: any) => {
      try {
        let userFind = await userModel.find({ email: req.session.user_email });
        res.send(userFind);
      } catch (err) {
        res.send(err);
      }
    },

    //Método responsável por deletar um usuário no Painel do ADM
    deleteUser: async (req: any, res: any) => {
      try {
        let userPassword = req.params.passorwdTest;
        var passString:any = await controller.hashPassword(userPassword);
        var passString = passString.toString();

        let user = await userModel.find({ email: req.session.user_email });
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

    //Método responsável por altertar a permissão um usuário no Painel do ADM
    updateUserPermission: async (req: any, res: any) => {
      try {
        let userUpdate = req.body;

        let userPassword = req.params.passorwdTest;
        var passString:any = await controller.hashPassword(userPassword);
        var passString = passString.toString();


        let userAdmin = await userModel.find({ email: req.session.user_email });
        if (userAdmin[0].senha == passString) {
          if (userUpdate.permissao == 0) {
            userModel
              .updateOne({ cpf: userUpdate.cpf }, { $set: { permissao: 1 } })
              .exec();
            res.send({ Sucess: "Permissão do Usuário foi alterada com Sucesso" });
          } else if (userUpdate.permissao == 1) {
            userModel
              .updateOne({ cpf: userUpdate.cpf }, { $set: { permissao: 0 } })
              .exec();
            res.send({ Sucess: "Permissão do Usuário foi alterada com Sucesso" });
          } else {
            res.send({ failure: "Senha inserida está incorreta" });
          }
        } else {
          res.send({ failure: "Senha inserida está incorreta" });
        }
      } catch (err) {
        res.status(500).send(err);
      }
    },

    //Método responsável por alterar a senha de um usuário
    updatePassword: async (req: any, res: any) => {
      let userUpdate = req.body;
      var passString:any = await controller.hashPassword(req.params.actuaPassword);
      var passString = passString.toString();

      let userAdmin = await userModel.find({ email: req.session.user_email });
      if (userAdmin[0].senha == passString) {
        const hashPass = await controller.hashPassword(req.params.newPassword);

        userModel
          .updateOne({ cpf: userAdmin[0].cpf }, { $set: { senha: hashPass } })
          .exec();
        res.send({ Sucess: "A senha foi alterada com sucesso" });
      } else {
        res.send({ failure: "Senha inserida está incorreta" });
      }
    },

     //Método responsável por alterar o endereço de um usuário
    updateAddress: async (req: any, res: any) => {
      let userUpdate = req.body;
      let userAdmin = await userModel.find({ email: req.session.user_email });

      var passString:any = await controller.hashPassword(req.params.passorwdTest);
      var passString = passString.toString();

      if (userAdmin[0].senha == passString) {
        userModel
          .updateOne(
            { cpf: userAdmin[0].cpf },
            {
              $set: {
                endereco: userUpdate.endereco,
                complemento: userUpdate.complemento,
                cep: userUpdate.cep,
                cidade: userUpdate.cidade,
                estado: userUpdate.estado
              }
            }
          )
          .exec();
        res.send({ Sucess: "O endereço foi alterado com sucesso" });
      } else {
        res.send({ failure: "Senha inserida está incorreta" });
      }
    }
  };

  return controller;
};

function getInfoCad() {
  throw new Error("Function not implemented.");
}
