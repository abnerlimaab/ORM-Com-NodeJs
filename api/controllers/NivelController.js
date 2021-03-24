const database = require('../models')

class NivelController {
    static async pegarTodosOsNíveis(req, res) {
        try {
            const todosOsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        } catch (erro) {
            res.status(500).json(erro.message)
        }
    }

    static async pegaUmNivel(req, res) {
        const { id } = req.params
        try {
            const umNivel = await database.Niveis.findOne({where: {id: Number(id)}})
            res.status(200).json(umNivel)
        } catch (erro) {
            res.status(500).json(erro.message)
        }
    }

    static async criaNivel(req, res) {
        const novoNivel = req.body
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return res.status(200).json(novoNivelCriado)
        } catch (erro) {
            res.status(500).json(erro.message)
        }
    }

    static async atualizaNivel(req, res) {
        const {id} = req.params
        const novasInfos = req.body
        try {
            await database.Niveis.update(novasInfos, {where: {id: Number(id)}})
            const nivelAtualizado = await database.Niveis.findOne({where: {id: Number(id)}})
            return res.status(200).json(nivelAtualizado)
        } catch (erro) {
            res.status(500).json(erro.message)
        }
    }

    static async apagaNivel(req, res) {
        const {id} = req.params
        try {
            await database.Niveis.destroy({where: {id: Number(id)}})
            return res.status(200).json({mensagem: `Id ${id} deletado`})
        } catch (erro) {
            res.status(500).json(erro.message)
        }
    }
}

module.exports = NivelController