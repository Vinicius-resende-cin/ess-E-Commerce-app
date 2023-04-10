module.exports = () => {
  const CustomLink = require("../../models/customLinkModel")();

  const controller = {
    // Insere um link personalizado e seu id no modelo 'CustomLink' (backend)
    generateCustomLink: async (req: any, res: any) => {
      try {
        const { id, currentUrl } = req.body;

        const existingLink = await CustomLink.findOne({ id: id });
        if (existingLink) {
          res.status(400).json({ message: "ID já existente." });
          return;
        }

        const newUrl = await CustomLink.create({ id, currentUrl });
        res.status(200).json({ message: `Link '${newUrl}' gerado com sucesso.` });
      } catch (err) {
        res.status(500).send(err);
      }
    },

    // Retorna todos os links personalizados e seus ids (backend)
    getAllCustomLinks: async (req: any, res: any) => {
      try {
        const customLinks = await CustomLink.find({}, { _id: false });
        res.json(customLinks);
      } catch (err) {
        res.status(500).send(err);
      }
    },

    // Retorna um link personalizado associado ao id passado como parâmetro (backend)
    getCustomLink: async (req: any, res: any) => {
      try {
        const { id } = req.params;
        const link = await CustomLink.findOne({ id: id });
        if (link) {
          res.status(200).redirect(link.url);
        } else {
          res.status(404).json({ message: "Link não encontrado." });
        }
      } catch (err) {
        res.status(500).send(err);
      }
    }
  };

  return controller;
};
