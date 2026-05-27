const express = require('express');

const route = express.Router();

const {
    listar,
    cadastrar,
    atualizar,
    deletar
} = require('../controllers/pedido.controller.js');


route.get('/listar', listar);


route.post('/cadastrar', cadastrar);

route.put('/atualizar/:id', atualizar);


route.delete('/deletar/:id', deletar);

module.exports = route;