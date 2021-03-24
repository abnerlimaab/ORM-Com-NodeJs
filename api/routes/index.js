const express = require('express')
//Rota de Pessoas
const pessoas = require('./pessoasRoute')
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')

module.exports = app => {
    app.use(express.json(),
    pessoas,
    niveis,
    turmas
    )
}