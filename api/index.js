const express = require('express')

//Inicia o express
const app = express()

//Converte as requisições em JSON
app.use(express.json())

//Porta do servidor
const port = 3000

//Rota de teste
app.get('/teste', (req, res) => {
    res.status(200)
    res.send({mensagem: 'Boas vindas a API'})
})

//Escuta o servidor e executa a função de callback
app.listen(port, () => console.log(`O Servidor está rodando na porta ${port}`))

//Exporta o express para o restante da aplicação
module.exports = app