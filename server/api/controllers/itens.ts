import { ObjectId } from "mongodb";

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

    getAllItensUser: async (req: any, res: any) => {
      try {
        const itens = await Item.find({ id_user: req.session.user_email });
        res.json(itens);
      } catch (err) {
        res.status(500).send(err);
      }
    
    },

    createItem: async (req: any, res: any) => {
      try {
        const itemDuplicado = await Item.findOne({ nome: req.body.nome, id_user: req.session.user_email });

        if (itemDuplicado) {
            res.status(400).json({ message: "Já existe um produto com esse titulo em sua loja" });
        } else if (req.body.quantidade < 0 || req.body.preco < 0) {
            res.status(400).json({ message: "Valores negativos não são permitdos" });
        } else {
            const newItem = await Item.create(req.body);
            res.status(200).json(newItem);
        }

      } catch (err) {
        res.status(500).send(err);
      }
    },

    editItem: async (req: any, res: any) => {
      try {
        const id = req.params.id;
        
        const item = await Item.findOne({ _id: id });
        const itemDuplicado = await Item.findOne({ nome: req.body.nome, id_user: req.session.user_email });

        if (itemDuplicado){
          res.status(400).json({ message: "Já existe um produto com esse titulo em sua loja" });
        } else if (req.body.quantidade < 0 || req.body.preco < 0) {
          res.status(400).json({ message: "Valores negativos não são permitdos" });
        } else {
          const updates = req.body;
          const result = await Item.findByIdAndUpdate(id, updates);
          res.status(200).json({ message: "Item atualizado"});
        }
     
      } catch (err) {
        res.status(500).send(err);
      }
    },

    deleteItem: async (req: any, res: any) => {
      try {
        const id = req.params.id;
        const item = await Item.findOne({ _id: id });

       if (item) {
          const itemRemoved = await Item.findByIdAndDelete(id);
          res.status(200).json(itemRemoved);

        } else {
          res.status(400).json({ message: "Não há um Item com esse titulo" });
        }

      } catch (err) {
        res.status(500).send(err);
      }
    }
  };

  return controller;
};
