const prisma = require('../data/prisma.js');


const listar = async (req, res) => {

    try {

        const lista = await prisma.pedido.findMany({
            include: {
                usuario: true
            }
        });

        res.status(200).json(lista);

    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao listar pedidos",
            erro: error.message
        });
    }
};


const cadastrar = async (req, res) => {

    try {

        const { produto, usuarioId } = req.body;

        const novoPedido = await prisma.pedido.create({
            data: {
                produto,
                usuarioId: Number(usuarioId)
            }
        });

        res.status(201).json(novoPedido);

    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao cadastrar pedido",
            erro: error.message
        });
    }
};


const atualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const { produto, usuarioId } = req.body;

        const pedidoAtualizado = await prisma.pedido.update({
            where: {
                id: Number(id)
            },
            data: {
                produto,
                usuarioId: Number(usuarioId)
            }
        });

        res.status(200).json(pedidoAtualizado);

    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao atualizar pedido",
            erro: error.message
        });
    }
};


const deletar = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.pedido.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json({
            mensagem: "Pedido deletado"
        });

    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao deletar pedido",
            erro: error.message
        });
    }
};

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar
};