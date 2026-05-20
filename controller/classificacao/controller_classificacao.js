const configMessages = require('../modulo/configMessages.js')

const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')

const inserirNovaClassificacao = async function (classificacao, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(classificacao)

            if (validar) {

                return validar

            } else {

                let result = await classificacaoDAO.insertClassificacao(await tratarDados(classificacao))


                if (result) {

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = classificacao

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

const atualizarClassificacao = async function (classificacao, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para verificar se o conteúdo do Body é um JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função para buscar o filme e validar se o ID est correto, Se o ID existe no BD e se o filme existe
            let resultBuscarClassificacao = await buscarClassificacao(id)
            if (resultBuscarClassificacao.status) {

                //Chama a função para validar os dados no
                let validar = await validarDados(classificacao)
                if (!validar) {

                    //Adiciona um atributo ID no JSON de filme, para enviar ao DAO um único objeto
                    classificacao.id = Number(id)

                    //Chama a função para atualizar o filme no BD
                    let result = await classificacaoDAO.updateClassificacao(await tratarDados(classificacao))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = classificacao

                        return customMessage.DEFAULT_MESSAGE //200 (atualizado)

                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL  //500 (Model)   
                    }
                } else {
                    return validar  //400 de validação dos campos do banco de dados
                }

            } else {
                return resultBuscarFilme //400(ID inválido) ou 404(não encontrado) ou 500
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER  //500(controller)
    }
}

const listarClassificacao = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Chama função do DAO para retornar a lista de filmes do banco de dados
        let result = await classificacaoDAO.selectAllClassificacao()

        //Validação para verificar se o DAO conseguio processar o Srcipt no banco de dados
        if (result) {

            //Validação para verificar se o conteudo do array tem dados de retorno ou se esta vazio
            if (result.length > 0) {

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.filme = result
                customMessage.DEFAULT_MESSAGE.response.count = result.length

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


const validarDados = async function (classificacao) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (classificacao.classificacao == '' ||
        classificacao.classificacao == null ||
        classificacao.classificacao == undefined ||
        classificacao.classificacao.lenght > 20

    ) {

        customMessage.ERROR_BAD_REQUEST.field = '[CLASSIFICAÇÂO] INVALIDO'

        return customMessage.ERROR_BAD_REQUEST

    } else {

        return false
    }

}

const tratarDados = async function (classificacao) {

    classificacao.classificacao = classificacao.classificacao.replaceAll("'", "")

    return classificacao
}

module.exports = {

    inserirNovaClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    validarDados,
    tratarDados
}