import { User } from '../../../commom/usuario'

module.exports = () => {
    const userModel = require("../../models/userModel")();

    const controller = {
        
        sendUser : async (req:any, res:any) => {
            try{
                let user = req.body //Recebe os valores do put
                await userModel.create(user)
                res.send({"success": "O User foi inserido com sucesso"});
            }
            catch(RR){
                res.send({"failure": "O User não pode ser inserido"});
            }
            

            
        }

    }

    return controller
}