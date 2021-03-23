const express = require('express')
//Rota de Pessoas
const pessoas = require('./pessoasRoute')

module.exports = app => {
    app.use(express.json())
    app.use(pessoas)
}