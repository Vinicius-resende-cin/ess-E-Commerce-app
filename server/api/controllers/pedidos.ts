module.exports = () => {
  const Pedido = require("../../models/pedidoModel")();

  const controller = {
    listOrders: async (req: any, res: any) => {
      try {
        // Retorna todos os pedidos
        const pedidos = await Pedido.find({});
        res.json(pedidos);
      } catch (err) {
        res.status(500).send(err);
      }
    },
  };

  return controller;
};
