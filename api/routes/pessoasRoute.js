//Recurso de rotas do express
const { Router } = require('express')
//Importa o controller de Pessoa
const PessoaController = require('../controllers/PessoaController')

//Instância os recursos de Router do express
const router = Router()

//Invoca o método estático pegaTodasAsPessoas do Controller
router.get('/pessoas', PessoaController.pegaTodasAsPessoas)

//Invoca o método estático pegaUmaPessoa do Controller
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)

//Invoca o método estático criarPessoa do Controller
router.post('/pessoas', PessoaController.criaPessoa)

//Invoca o método estático atualizaPessoa do Controller
router.put('/pessoas/:id', PessoaController.atualizaPessoa)

//Invoca o método estático apagaPessoa do Controller
router.delete('/pessoas/:id', PessoaController.apagaPessoa)

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)

router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)

router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)

router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)

module.exports = router