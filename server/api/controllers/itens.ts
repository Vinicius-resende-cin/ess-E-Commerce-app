module.exports = () => {
    const Item = require("../../models/itemModel")();
  
    const controller = {
      listProducts: async (req: any, res: any) => {
        /** Retorna todos o item */
        try {
          const id_produto: string = <string> req.params.id;
          const itens = await Item.findOne({id: id_produto}, { _id: false });
          res.json(itens);
        } catch (err) {
          res.status(500).send(err);
        }
      },
    };
  
    return controller;
  };