import { User } from '../../../commom/usuario'

module.exports = () => {
    const userModel = require("../../models/userModel")();
    //const userFind = await userModel.find({}, { _id: false }); // Retorna tudo
    const controller = {
        verifyExist: async (obj:any) => {
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
                    emailC: "$emailC",
                    senha: "$senha",
                    senhaC: "$senhaC",
                    endereco: "$endereco",
                    complemento: "$complemento",
                    cep: "$cep",
                    estado: "$estado",
                    cidade: "$cidade",
                  }
                }
              ]);

            
            return userFind
        
        },
      
        
        sendUser : async (req:any, res:any) => {
            try{
                let user = req.body //Recebe os valores do put
                
                let cpfExist: any = await controller.verifyExist({'cpf': user.cpf});
                let emailExist: any = await controller.verifyExist({'email': user.email});
                console.log(cpfExist);
                console.log(emailExist);
                if(cpfExist.length === 0 && emailExist.length === 0){
                    await userModel.create(user);
                    res.send({"success": "O User foi inserido com sucesso"});
                }
                else{
                    res.send({"failure": "O User não pode ser inserido, CPF ou Email repetido"});
                }
            }
            catch(RR){
                res.send({"failure": "O User não pode ser inserido"});
            }
            

            
        },

        findUser : async (req:any, res:any, ) => {

            const infoVerify = JSON.stringify(req.query);

            try {
                const userFind = await userModel.find({}, { _id: false });
                res.json(userFind);
              } catch (err) {
                res.status(500).send(err);
              }
        }

    }

    return controller
}

function getInfoCad() {
    throw new Error('Function not implemented.');
}