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

//Função para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {

    //Criar uma copia dos JSON do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {



            let validar = await validarDados(filme)

            if (validar) {

                return validar

            } else {

                let result = await filmeDAO.insertFilme(filme)

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.response.count = result.length
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }

            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}
//Função para atualizar um filme existente
const atualizarFilme = async function () {

}

//Função para retornar todos os filmes existentes
const listarFilme = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Chama função do DAO para retornar a lista de filmes do banco de dados
        let result = await filmeDAO.selectAllFilme()

        //Validação para verificar se o DAO conseguio processar o Srcipt no banco de dados
        if (result) {

            //Validação para verificar se o conteudo do array tem dados de retorno ou se esta vazio
            if (result.length > 0) {

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE

            } else {
                return customMessage.ERROR_NOT_FOUND// Erro 404
            }

        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL// Erro 500 (model)
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // Erro 500 (controller)
    }

}

//Função para retornar um filme filtando pelo ID
const buscarFilme = async function (id) {


    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o id seja um numero valido
        if (String(id).replaceAll(' ', '') == '' || id == null || id == undefined || isNaN(id)) {

            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST

        } else {
            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)
            //Validção para verificar se o DAO retornou dados ou um false 
            if (result) {
                //Validação para verificar se o DAO tem algum dado no ARRAY
                if (result.length > 0) {

                    customMessage.DEFAULT_MESSAGE.status = configMessages.SUCCESS_RESPONSE.status
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
const excluirFilme = async function () {

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
    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {

        return false
    }
}

module.exports = {

    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}