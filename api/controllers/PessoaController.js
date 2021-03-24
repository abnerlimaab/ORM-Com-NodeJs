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
            //Caso haja erro, retornaremos a mensagem em JSON
            return res.status(500).json(erro.message)
        }
    }

    static async pegaUmaPessoa(req, res) {
        //Colhe o id da requisição
        const { id } = req.params
        try {
            //Através do método findOne, o Sequelize se comunicará com o banco de dados e retornará o objete que atenda as condições WHERE
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number (id)
                }
            })
            //Responderemos com o objeto localizado em JSON e status 200
            return res.status(200).json(umaPessoa)
        } catch (erro) {
            //Caso haja erro, retornaremos a mensagem em JSON
            return res.status(500).json(erro.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            //Através do método create, o Sequelize criará uma pessoa no banco de dados e retornará uma instância do Sequelize com o objeto criado conforme especificado na Model pessoas
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            //Responderemos com status 200 e a instância do Sequelize em JSON
            return res.status(200).json(novaPessoaCriada)
        } catch (erro) {
            //Caso haja erro, retornaremos a mensagem em JSON
            return res.status(500).json(erro.message)
        }
    }

    static async atualizaPessoa(req, res) {
        //Colhe o id do registro a ser alterado na requisição
        const { id } = req.params
        //Recebe as informações que devem ser alteradas no corpo da requisição
        const novasInfos = req.body
        try {
            await database.Pessoas.update(
                //Informações a serem atualizadas
                novasInfos,
                //Registro que deve ser atualizado
                {
                    where: {
                        id: Number(id)
                    }
                }
            )
            //Retorna uma instância do Sequelize com o objeto atualizado
            const pessoaAtualizada = await database.Pessoas.findOne({where: {id: id}})
            //Responderemos com status 200 e a instância do Sequelize em JSON
            return res.status(200).json(pessoaAtualizada)
        } catch (erro) {
            //Caso haja erro, retornaremos a mensagem em JSON
            return res.status(500).json(erro.message)
        }
    }

    static async apagaPessoa(req, res) {
        //Colhe o id do registro a ser apagado na requisição
        const { id } = req.params
        try {
            //Através do método destroy, o Sequelize se comunica com o banco de dados e exclui o registro especificado em WHERE
            await database.Pessoas.destroy({where: {id: Number(id)}})
            //Como o objeto foi deletado, retornaremos o status 200 e a mensagem de confirmação de exclusão do registro
            res.status(200).json({mensagem: `Id ${id} deletado`})
        } catch (erro) {
            //Caso haja erro, retornaremos a mensagem em JSON
            return res.status(500).json(erro.message)
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async criaMatricula(req, res) {
        const {estudanteId} = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const novasInfos = req.body
        try {
            await database.Pessoas.update(
                novasInfos,
                {
                    where: {
                        id: Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    }
                }
            )
            const matriculaAtualizada = await database.Matriculas.findOne({where: {id: matriculaId}})
            return res.status(200).json(matriculaAtualizada)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({where: {id: Number(matriculaId)}})
            res.status(200).json({mensagem: `Id ${matriculaId} deletado`})
        } catch (erro) {
            //Caso haja erro, retornaremos a mensagem em JSON
            return res.status(500).json(erro.message)
        }
    }
}

module.exports = PessoaController