const configMessages = require('../modulo/configMessages.js')

const generoDAO = require('../../model/DAO/genero_filme/genero_filme.js')


const validarDados = async function (filme_genero) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    if (filme_genero.id_filme == undefined || filme_genero.id_filme == null || filme_genero.id_filme.length > 45 || !isNaN(filme_genero.id_filme || filme_genero.id_filme <= 0)) {
        customMessage.ERROR_BAD_REQUEST.field = "[ID_FILME] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme_genero.i_dgenero) {
        if (filme_genero.id_genero == undefined || filme_genero.id_genero == null || filme_genero.id_genero.length > 45 || !isNaN(filme_genero.id_genero || filme_genero.id_genero <= 0)) {
            customMessage.ERROR_BAD_REQUEST.field = "[ID_genero] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {
            return false
        }
    }

    else {
        return false
    }
}

const inserirNovoFilmeGenero = async function (filme_genero) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let validarDados = await validarDados(filme_genero)

        if (validacao) {
            return validacao
        } else {
            let result = await filmeDAO.insertFilmeGenero(filme_genero)
            console.log(result)


            if (result) { // 201

                filme_genero.id = result

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = filme_genero

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const listarFilmeGenero = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filme_generoDAO.selectAllFilmeGenero()
        console.log(result)

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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

const atualizarFilmeGenero = async function (filme_genero, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {

        let resultBuscarGenero = await buscarFilmeGenero(id)

        if (resultBuscarGenero.status) {

            let validar = await validarDados(filme_genero)

            if (!validar) {

                filme_genero.id = Number(id)

                let result = await filme_generoDAO.updateFilmeGenero(filme_genero)

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATE_ITEM.status

                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATE_ITEM.status_code


                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_UPDATE_ITEM.message

                    customMessage.DEFAULT_MESSAGE.response = filme_genero

                    return customMessage.DEFAULT_MESSAGE
                } else {

                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const buscarFilmeGenero = async function buscarGenero(id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || id == "" || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            let result = await filme_generoDAO.selectFilmeGenero(id)

            if (result) {

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status

                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code

                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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

const buscarGeneroIdFilme = async function buscarGenero(id_filme) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id_filme == undefined || id_filme == "" || id_filme == null || isNaN(id_filme) || id_filme < 1) {
            customMessage.ERROR_BAD_REQUEST.field = "[ID_FILME] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            let result = await filme_generoDAO.selectgenerosByIdFilme(id)

            if (result) {

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status

                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code

                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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

const buscarFilmesIDGenero = async function buscarGenero(id_Genero) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id_Genero == undefined || id_Genero == "" || id_Genero == null || isNaN(id_Genero) || id_Genero < 1) {
            customMessage.ERROR_BAD_REQUEST.field = "[ID_GENERO] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            let result = await filme_generoDAO.selectFilmesByIdGenero(id_Genero)

            if (result) {

                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status

                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code

                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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


const deletarGenero = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {

        let resultBuscarFilmeGenero = await buscarGenero(id)

        if (resultBuscarGenero.status) {


            let result = await generoDAO.deleteFilmeGenero(id)
            console.log(result)


            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return resultBuscarGenero
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const tratarDados = async function (genero) {
    genero.nome_genero = genero.nome_genero.replaceAll("'", "")

    return genero
}


module.exports = {

    deletarGenero,
    inserirNovoFilmeGenero,
    listarFilmeGenero,
    atualizarFilmeGenero,
    tratarDados,
    buscarFilmesIDGenero,
    buscarGeneroIdFilme
}