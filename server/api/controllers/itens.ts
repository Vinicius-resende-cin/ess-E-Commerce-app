import { ObjectId } from "mongoose";

module.exports = () => {
  const Item = require("../../models/itemModel")();

  const controller = {
    listProducts: async (req: any, res: any) => {
      /** Retorna todos o item */
      try {
        const id_produto: ObjectId = <ObjectId>req.params.id;
        const itens = await Item.findOne({ _id: id_produto });
        res.json(itens);
      } catch (err) {
        res.status(500).send(err);
      }
    },

    getAllItens: async (req: any, res: any) => {
      try {
        const itens = await Item.find({});
        res.json(itens);
      } catch (err) {
        res.status(500).send(err);
      }
    
    },

    createItem: async (req: any, res: any) => {
      try {
        const nome = req.body.nome;
        const itemDuplicado = await Item.findOne({ nome: nome });

       if (itemDuplicado) {
          res.status(400).json({ message: "Já existe um Item com esse titulo" });
        } else {
          const newItem = await Item.create(req.body);
          res.status(200).json(newItem);
        }

      } catch (err) {
        res.status(500).send(err);
      }
    }

    //FAZER O DELETEITEM
  };

  return controller;
};
