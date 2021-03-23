//Recurso de rotas do express
const { Router } = require('express')
//Importa o controller de Pessoa
const PessoaController = require('../controllers/PessoaController')

//Instância os recursos de Router do express
const router = Router()

//Invoca o método estático pegaTodasAsPessoas do Controller
router.get('/pessoas', PessoaController.pegaTodasAsPessoas)

module.exports = router