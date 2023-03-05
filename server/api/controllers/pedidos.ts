module.exports = () => {
  const Pedido = require("../../models/pedidoModel")();

  const controller = {
    listOrders: async (req: any, res: any) => {
      try {
        // Retorna todos os pedidos
        const pedidos = await Pedido.find({}, { _id: false });
        res.json(pedidos);
      } catch (err) {
        res.status(500).send(err);
      }
    },

    calcMonthRange: async (req: any, res: any) => {
      try {
        // Calcula o resumo mensal para o range de meses solicitado
        let filter: any = {};
        const stringCheck = JSON.stringify(req.query);
        if (
          stringCheck !== "{}" &&
          stringCheck !== JSON.stringify({ start: "", end: "" })
        ) {
          filter.mes_ano = {};

          if (req.query.start != "") {
            console.log("start");
            filter.mes_ano.$gte = req.query.start;
          }

          if (req.query.end != "") {
            console.log("end");
            let end_ = new Date(req.query.end);
            let end = new Date(end_.setMonth(end_.getMonth() + 1));
            filter.mes_ano.$lte = end.toISOString();
          }
        }

        const resultado = await Pedido.find(filter, { _id: false });
        res.json(resultado);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  };

  return controller;
};
