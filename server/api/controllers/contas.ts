const nodemailer = require('nodemailer'); 
const userModel = require("../../models/userModel")();
const app = require("../../config/express")();
const jwt = require('jsonwebtoken');
const email_psw = app.get("email_psw");
const token_sk = app.get("token_sk");
import ResetEmailHtml from "../../../common/reset-email";

import { Sha256 } from '@aws-crypto/sha256-js';

module.exports = () => {
    const controller = {
      requestReset: async (req: any, res: any) => {
        /** */
        try {
            const reqEmail = req.params.id;
            const foundUser = await userModel.findOne({email: reqEmail}, { _id: false, _v: false }).exec();

            //se email nao estiver no BD
            if(!foundUser){
                res.status(200).json({
                    success: false,
                    registered: false,
                });
            }
            //se esta no BD
            else{
                const token = jwt.sign({ email: reqEmail }, token_sk, { expiresIn: '10m' });
                const resetUrl = 'http://localhost:4200/redefinir-senha?token=' + token;
                const senderEmail = 'ecommercin@gmail.com';
                const senderPass = email_psw;

                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                      user: senderEmail,
                      pass: senderPass
                    }
                });

                let message = {
                    from: senderEmail,
                    to: reqEmail,
                    subject: 'Redefinição de senha da conta Commercin',
                    html: ResetEmailHtml.replace('{reset-link}', resetUrl)
                };
                
                transporter.sendMail(message, (err: any, info: any) => {
                if (err) {
                    console.error(err);
                }
                });

                res.status(200).json({
                    success: true
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
      },

      changePassword: async (req: any, res: any) => {
        /**Altera a senha de um usuário se o token for válido*/
        try {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.{8,})/;

            const decoded = jwt.verify(req.body.token, token_sk);
            const email = decoded.email;
            const password = req.body.password;

            //testa se é uma senha válida
            if(passwordRegex.test(password)){
                const hash = new Sha256();
                hash.update(password);
                const hashPass = await hash.digest();
                
                userModel.updateOne({email: email}, { $set: { senha: hashPass}}).exec();
                res.status(200).json({
                    success: true,
                });
            }
            else{
                res.status(200).json({
                    success: false,
                    validPassword: false
                });
            }

        } catch (err) {
            if (err.name = 'JsonWebTokenError') {
                res.status(200).json({
                    success: false,
                    validToken: false
                });
            }
            else{
                console.log(err);
                res.status(500).send(err);
            }
        }
      }
      
    }
  
    return controller;
  };
  