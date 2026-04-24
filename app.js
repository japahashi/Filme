const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()


//criando um objeto do express para criar API
const app = express()

//cofigurações do CORS da API
const corsOptions = {

    origin: ['*'],  //configuração de origem da requisição (IP ou dominio)
    methods: 'GET, POST, PUT, DELETE, OPTIONS',  //configuração dos verbo que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization'] // configurações de permissoes
    //tipo de dados //autorização de acesso
}


//aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

const controllerFilme = require('./controller/filme/controller_filmes.js')

app.post('/v1/senai/locadora/filme', bodyParserJSON, async function (request, response) {

    //Recebendo o body da requisição
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

app.get('/v1/senai/locadora/filme/:id', async function (request,response) {

    //Rcebe id di filme via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
    
})

app.listen(8080, function () {

    console.log('API aguardando novas requisições ...')
})