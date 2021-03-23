//Importa o model
const database = require('../models')

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            //Através do método findAll o Sequelize lança a query no banco de dados SELECT * FROM Pessoas
            const todasAsPessoas = await database.Pessoas.findAll()
            //Convertemos a instância retornada pelo Sequelize em Json e retornamos com o status 200
            return res.status(200).json(todasAsPessoas)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }
}

module.exports = PessoaController