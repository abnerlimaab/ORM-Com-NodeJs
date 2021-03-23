const express = require('express')
const routes = require('./routes')

//Inicia o express
const app = express()

//Porta do servidor
const port = 3000

//Envia o express para rotas
routes(app)

//Escuta o servidor e executa a função de callback
app.listen(port, () => console.log(`O Servidor está rodando na porta ${port}`))

//Exporta o express para o restante da aplicação
module.exports = app