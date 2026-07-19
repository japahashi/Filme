const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const app = express()

const corsOptions = {
    
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Authorization']
}

app.use(cors(corsOptions))

const controllerFilme = require('./controller/filme/controller_filmes.js')
const controllerGenero = require('./controller/genero/controller_genero.js')
const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')
const controllerFilmeGenero = require('./controller/filme/controller_filme_genero.js')

//FILME
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme', async function (request, response) {
    let result = await controllerFilme.listarFilme()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerFilme.buscarFilme(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerFilme.excluirFilme(id)
    response.status(result.status_code)
    response.json(result)
})

//GENERO
app.post('/v1/senai/locadora/genero', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerGenero.inserirNovoGenero(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero', async function (request, response) {
    let result = await controllerGenero.listarGenero()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/genero/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body
    let result = await controllerGenero.atualizarGenero(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/genero/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerGenero.excluirGenero(id)
    response.status(result.status_code)
    response.json(result)
})

//CLASSIFICACAO
app.post('/v1/senai/locadora/classificacao', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/classificacao', async function (request, response) {
    let result = await controllerClassificacao.listarClassificacao()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/classificacao/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerClassificacao.buscarClassificacao(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/classificacao/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body
    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/classificacao/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerClassificacao.excluirFilme(id)
    response.status(result.status_code)
    response.json(result)
})


//FILME_GENERO (relacionamento entre filme e gênero)
app.post('/v1/senai/locadora/filme-genero', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let result = await controllerFilmeGenero.inserirNovoFilmeGenero(dados)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme-genero', async function (request, response) {
    let result = await controllerFilmeGenero.listarFilmeGenero()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme-genero/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerFilmeGenero.buscarFilmeGenero(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme-genero/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body
    let result = await controllerFilmeGenero.atualizarFilmeGenero(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme-genero/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerFilmeGenero.deletarGenero(id)
    response.status(result.status_code)
    response.json(result)
})

//Lista os gêneros de um filme específico
app.get('/v1/senai/locadora/filme/:id_filme/genero', async function (request, response) {
    let id_filme = request.params.id_filme
    let result = await controllerFilmeGenero.buscarGeneroIdFilme(id_filme)
    response.status(result.status_code)
    response.json(result)
})

//Lista os filmes de um gênero específico
app.get('/v1/senai/locadora/genero/:id_genero/filme', async function (request, response) {
    let id_genero = request.params.id_genero
    let result = await controllerFilmeGenero.buscarFilmesIDGenero(id_genero)
    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function () {
    console.log('API aguardando novas requisições ...')
})