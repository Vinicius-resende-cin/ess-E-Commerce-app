module.exports = () => {
  const pedidosDB = require("../data/pedidos.json");
  const controller = {
    listOrders: (req: any, res: any) => {
      res.status(200).json(pedidosDB);
    },
  };

  return controller;
};
