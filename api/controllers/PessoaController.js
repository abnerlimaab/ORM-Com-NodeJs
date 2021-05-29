//Importa o model
const database = require('../models')
//Importa o Sequelize
const Sequelize = require('sequelize')

class PessoaController {
    //Utilizaremos métoddos estáticos para que não seja necessária a instânciação de um novo objeto e definiremos como função async pois há uma comunicação assíncrona com o banco de dados
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await database.Pessoas.findAll()
            return res.status(200).json(pessoasAtivas)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async pegaUmaPessoa(req, res) {
        //Colhe o id da requisição
        const { id } = req.params
        try {
            //Através do método findOne, o Sequelize se comunicará com o banco de dados e retornará o objete que atenda as condições WHERE
            const umaPessoa = await database.Pessoas.findOne({
                //Parâmetros da busca passados como objeto
                where: {
                    id: Number(id)
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
        //Recolhe o objeto de informações definidas no corpo da requisião
        const novaPessoa = req.body
        try {
            //Através do método create, o Sequelize criará uma Pessoa no banco de dados e retornará uma instância do Sequelize com o objeto criado conforme especificado na Model pessoas
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
            //O método update do Sequelize retorna um valor booleano. No nosso caso, não precisaremos armazenar esse valor em uma const.
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
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: id } })
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
            await database.Pessoas.destroy({ where: { id: Number(id) } })
            //Como o objeto foi deletado, retornaremos o status 200 e a mensagem de confirmação de exclusão do registro
            res.status(200).json({ mensagem: `Id ${id} deletado` })
        } catch (erro) {
            //Caso haja erro, retornaremos a mensagem em JSON
            return res.status(500).json(erro.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.restore({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `Id ${id} restaurado` })
        } catch (erro) {
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
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
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
            const matriculaAtualizada = await database.Matriculas.findOne({ where: { id: matriculaId } })
            return res.status(200).json(matriculaAtualizada)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({ where: { id: Number(matriculaId) } })
            res.status(200).json({ mensagem: `Id ${matriculaId} deletado` })
        } catch (erro) {
            //Caso haja erro, retornaremos a mensagem em JSON
            return res.status(500).json(erro.message)
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.restore({ where: { id: Number(matriculaId) } })
            return res.status(200).json({ mensagem: `Id ${matriculaId} restaurado` })
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params
        try {
            //Retorna uma instãncia do sequelize com o id da requisição
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } })
            //Retorna um objeto com as aulas matriculadas do estudante requisitado. Método definido no escopo da associação entre Pessoa e Matricula implementado automaticamente pelo Sequelize
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        } catch (erro) {
            //Caso haja erro, retornaremos a mensagem em JSON
            return res.status(500).json(erro.message)
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        //Recolhe o Id da turma informado na requisição
        const { turmaId } = req.params
        try {
            //O método findAndCountAll retorna uma instância com os registros que correspondam as cláusulas where e sua contagem
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                //limite de registros por vez
                limit: 20,
                //Ordena os registros
                order: [['estudante_id', 'DESC']],
            })
            return res.status(200).json(todasAsMatriculas)
        } catch (erro) {
            //Caso haja erro, retornaremos a mensagem em JSON
            return res.status(500).json(erro.message)
        }
    }

    static async pegaTurmasLotadas(req, res) {
        //Define o valor de matriculas que caracteriza uma turma lotada
        const lotacaoTurma = 2
        //Recolhe o Id da turma informado na requisição
        const { turmaId } = req.params
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {status: 'confirmado'},
                //Checa os valores de turma_id
                attributes: ['turma_id'],
                //E os agrupa
                group: ['turma_id'],
                //Comando SQL utilizando o método literal do Sequelize onde definimos que serão retornados os registros cujo o grupo de turma_id esteja lotada
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas.count)
        } catch (erro) {
            //Caso haja erro, retornaremos a mensagem em JSON
            return res.status(500).json(erro.message)
        }
    }
}

module.exports = PessoaController