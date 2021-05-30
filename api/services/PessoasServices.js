const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }
    //métodos específicos do controlador de Pessoas
    async pegaRegistrosAtivos(where = {}) {
        //Utilizamos notação de colchetes para passar o nome do modelo
        return database[this.nomeDoModelo].findAll({ where: { ...where } })
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoModelo]
            .scope('todos')
            .findAll({ where: { ...where } })
    }

    async cancelaPessoaEMatricula(estudanteId) {
        //Utilização do método transaction do Sequelize para operação de RollBack caso ocorra falhas durante a transação
        return database.Sequelize.transaction(async transacao => {
            //Desativa a Pessoa da requisição da tabela Pessoas
            await super.atualizaRegistro(
                { ativo: false }, 
                estudanteId, 
                { transaction: transacao })
            //Marca a Matricula da Pessoa da requisição como cancelada
            await this.matriculas.atualizaRegistros(
                { status: 'cancelado' }, 
                { estudante_id: estudanteId }, 
                { transaction: transacao })
        })
    }
}

module.exports = PessoasServices