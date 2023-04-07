import { ObjectId } from "mongoose";

module.exports = () => {
    const Categoria = require("../../models/categoriaModel")();
    
    const controller = {
        createCategory: async (req: any, res: any) => {
            //console.log(`POST`);
            /* Cria uma nova categoria */
            try {
                //const {nome, descricao} = req.body;
                const nome = req.body.nome_categoria;
                const categoriaDuplicada = await Categoria.findOne({ nome_categoria: nome });
                if (!nome || nome === "") {
                    res.status(400).json({ message: "A categoria precisa de um nome" });
                } else if (categoriaDuplicada) {
                    res.status(400).json({ message: "Já existe uma Categoria com esse nome" });
                } else {
                    const novaCategoria = await Categoria.create(req.body);
                    res.status(200).json(novaCategoria);
                }
            } catch (err) {
                res.status(500).send(err);
            }
        },

        getAllCategories: async (req: any, res: any) => {
            //console.log(`GET`);
            /* Retorna todos as categorias */
            try {
                const categorias = await Categoria.find({}, { _id: false });
                res.json(categorias);
            } catch (err) {
                res.status(500).send(err);
            }
        },

        updateCategory: async (req: any, res: any) => {
            //console.log(`PUT`);
            /* Atualiza a descrição de uma categoria */
            try {
                const { nome } = req.params;
                const categoria = await Categoria.findOne({ nome_categoria: nome });
                const idAux = categoria._id;
                const id = idAux.toString();
                await Categoria.findByIdAndUpdate(id, req.body);
                res.status(200).json({ message: "Categoria atualizada"});
            }
            catch (err) {
                res.status(500).send({ message: "Essa categoria não existe no sistema"});
            }
        },
    };

    return controller;
};