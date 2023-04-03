module.exports = () => {
    const mongoose = require("mongoose");

    const Schema = mongoose.Schema;

    //Definindo Schema
    const itemScema = new Schema({
        id: String,
        nome: String,
        descricao: String,
        quantidade: Number,
        preco: Number,
        forma_pagamento: Array<String>,
        categoria: Array<String>,
    });

    // Eh pra ficar escrito iten aqui em vez de item, pois no mongobd ta itens em vez de items
    const model = mongoose.model("Iten", itemScema);

    return model;
};