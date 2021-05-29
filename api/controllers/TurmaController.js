const database = require('../models')
const Sequelize = require('sequelize')
//Importe de operadores do Sequelize
const Op = Sequelize.Op

class TurmaController {
    static async pegaTodasAsTurmas(req, res) {
        //Descontrução da requisição colhendo a data_inicial e data_final da query string
        const { data_inicial, data_final } = req.query
        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null
        try {
            const todasAsTurmas = await database.Turmas.findAll({where})
            return res.status(200).json(todasAsTurmas)
        } catch (erro) {
            res.status(500).json(erro.message)
        }
    }

    // {
    //     where : {
    //         data_inicio: {
    //             [Op.gte]: data,
    //             [Op.lte]: data
    //         }
    //     }
    // }

    static async pagaUmaTurma(req, res) {
        const {id} = req.params
        try {
            const umaTurma = await database.Turmas.findOne({where: {id: Number(id)}})
            return res.status(200).json(umaTurma)
        } catch (erro) {
            res.status(500).json(erro.message)
        }
    }

    static async criaTurma(req, res) {
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch (erro) {
            res.status(500).json(erro.message)
        }
    }

    static async atualizaTurma(req, res) {
        const {id} = req.params
        const novasInfos = req.body
        try {
            await database.Turmas.update(novasInfos, {where: {id: Number(id)}})
            const turmaAtualizada = await database.Turmas.findOne({where: {id: Number(id)}})
            return res.status(200).json(turmaAtualizada)
        } catch (erro) {
            res.status(500).json(erro.message)
        }
    }

    static async apagaTurma(req, res) {
        const {id} = req.params
        try {
            await database.Turmas.destroy({where: {id: Number(id)}})
            res.status(200).json({mensagem: `Id ${id} deletado.`})
        } catch (erro) {
            res.status(500).json(erro.message)
        }
    }

    static async restauraTurma(req, res) {
        const {id} = req.params
        try {
            await database.Turmas.restore({where: {id: Number(id)}})
            return res.status(200).json({mensagem: `Id ${id} restaurado`})
        } catch (erro) {
            res.status(500).json(erro.message)
        }
    }
}

module.exports = TurmaController