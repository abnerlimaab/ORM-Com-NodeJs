//Chama Router da biblioteca express
const { Router } = require('express')
//Define o Controller
const PessoaController = require('../controllers/PessoaController')

//Inicia Router
const router = Router()

//Definição de Rotas e a função correspondente do Controller
//Não é necessário instânciar pois os métodos foram definidos como static
//O caractere ":" indica um parâmetro passado na requisição
router.get('/pessoas', PessoaController.pegaPessoasAtivas)

router.get('/pessoas/todos', PessoaController.pegaTodasAsPessoas)

router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)

router.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)

router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)

router.get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas)

router.post('/pessoas', PessoaController.criaPessoa)

router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)

router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)

router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula)

router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)

router.put('/pessoas/:id', PessoaController.atualizaPessoa)

router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)

router.delete('/pessoas/:id', PessoaController.apagaPessoa)

router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)

module.exports = router