/*****************************************************************************
 * Objetivo; arquivo responsavel pela validação, tratamento, manipulção de dados
 * para realizar o CRUD de filme
 *            
 * Data:17/04/2026
 * 
 * Autor:Israel
 * 
 * Versâo: 1.0
 *
********************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const filmeDAO = require('../../model/DAO/filme/filme.js')

const controllerClassificacao = require('../classificacao/controller_classificacao.js')
const controllerFilmeGenero = require('./controller_filme_genero.js')

//Função para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(filme)

            if (validar) {

                return validar

            } else {

                let result = await filmeDAO.insertFilme(await tratarDados(filme))

                if (result) {
                    filme.id = result

                   
                    if (filme.generos && Array.isArray(filme.generos)) {
                        for (let itemGenero of filme.generos) {
                            let filmeGenero = {
                                "id_filme": filme.id,
                                "id_genero": itemGenero.id
                            }
                            let resultFilmeGenero = await controllerFilmeGenero.inserirNovoFilmeGenero(filmeGenero)
                            //Validação para verificar se todos os itens de relacionamento foram inseridos
                            if(!resultFilmeGenero.status){
                                return customMessage.SUCCESS_CREATED_ITEM_WARNING//201 com alerta de

                            }
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filme

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }

            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Função para atualizar um filme existente
const atualizarFilme = async function (filme, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarFilme = await buscarFilme(id)
            if (resultBuscarFilme.status) {

                let validar = await validarDados(filme)
                if (!validar) {

                    filme.id = Number(id)

                    let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filme

                        return customMessage.DEFAULT_MESSAGE

                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }

            } else {
                return resultBuscarFilme
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todos os filmes existentes
const listarFilme = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeDAO.selectAllFilme()

        if (result) {

            if (result.length > 0) {

                for (let filme of result) {
                    let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)
                    if (resultClassificacao.status) {
                        filme.classificacao = resultClassificacao.response.classificacao
                        delete filme.id_classificacao
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.filme = result
                customMessage.DEFAULT_MESSAGE.response.count = result.length

                return customMessage.DEFAULT_MESSAGE

            } else {
                return customMessage.ERROR_NOT_FOUND
            }

        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(id).replaceAll(' ', '') == '' || id == null || id == undefined || isNaN(id)) {

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            let result = await filmeDAO.selectByIdFilme(id)

            if (result) {
                if (result.length > 0) {

                    for (let filme of result) {
                        let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)
                        if (resultClassificacao.status) {
                            filme.classificacao = resultClassificacao.response.classificacao
                            delete filme.id_classificacao
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE
                } else {

                    return customMessage.ERROR_NOT_FOUND

                }

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Função para excluir um filme
const excluirFilme = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarFilme = await buscarFilme(id)

        if (resultBuscarFilme.status) {
            let result = await filmeDAO.deleteFilme(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM

            } else {
                return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
            }

        } else {
           
            return resultBuscarFilme
        }

    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}

const validarDados = async function (filme) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
        customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.valor == undefined || isNaN(filme.valor)) {
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.avaliacao !== undefined && isNaN(filme.avaliacao)) {
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.id_classificacao == undefined || filme.id_classificacao == '' || filme.id_classificacao == null || isNaN(filme.id_classificacao) || filme.id_classificacao <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID CLASSIFICAÇÂO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const tratarDados = async function (filme) {

    filme.nome = filme.nome.replaceAll("'", "")
    filme.sinopse = filme.sinopse.replaceAll("'", "")
    filme.capa = filme.capa.replaceAll("'", "")
    filme.data_lancamento = filme.data_lancamento.replaceAll("'", "")
    filme.duracao = filme.duracao.replaceAll("'", "")
    filme.valor = String(filme.valor).replaceAll("'", "")
    if (filme.avaliacao !== undefined && filme.avaliacao !== null) {
        filme.avaliacao = String(filme.avaliacao).replaceAll("'", "")
    }

    return filme
}

module.exports = {

    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}
