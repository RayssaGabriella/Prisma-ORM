const prisma = require('../data/prisma.js');


const listar = async (req, res) => {

    try {

        const lista = await prisma.usuario.findMany();

        res.status(200).json(lista);

    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao listar usuários",
            erro: error.message
        });
    }
};


const cadastrar = async (req, res) => {

    try {

        const { nome, senha, email, idade } = req.body;

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                senha,
                email,
                idade: Number(idade)
            }
        });

        res.status(201).json(novoUsuario);

    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário",
            erro: error.message
        });
    }
};


const atualizar = async (req, res) => {

    try {

        const { id } = req.params;

        const { nome, senha, email, idade } = req.body;

        const usuarioAtualizado = await prisma.usuario.update({
            where: {
                id: Number(id)
            },
            data: {
                nome,
                senha,
                email,
                idade: Number(idade)
            }
        });

        res.status(200).json(usuarioAtualizado);

    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao atualizar usuário",
            erro: error.message
        });
    }
};


const deletar = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.usuario.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json({
            mensagem: "Usuário deletado"
        });

    } catch (error) {

        res.status(500).json({
            mensagem: "Erro ao deletar usuário",
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