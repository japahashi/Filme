const configMessages = require('../modulo/configMessages.js')


const generoDAO = require('../../model/DAO/genero_filme/genero_filme.js')


const validarDados = async function (filme_genero) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    
    if (filme_genero.id_filme == undefined || filme_genero.id_filme == null || isNaN(filme_genero.id_filme) || filme_genero.id_filme <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = "[ID_FILME] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme_genero.id_genero == undefined || filme_genero.id_genero == null || isNaN(filme_genero.id_genero) || filme_genero.id_genero <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = "[ID_GENERO] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const inserirNovoFilmeGenero = async function (filme_genero) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        
        let resultValidar = await validarDados(filme_genero)

        
        if (resultValidar) {
            return resultValidar
        } else {
            
            let result = await generoDAO.insertGeneroFilme(filme_genero)
            console.log(result)

            if (result) {
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
        
        let result = await generoDAO.selectAllGeneroFilme()
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

                
                let result = await generoDAO.updateGeneroFilme(filme_genero)

                if (result) {
                    
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filme_genero

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            
            return resultBuscarGenero
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const buscarFilmeGenero = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || id == "" || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            
            let result = await generoDAO.selectByIdGeneroFilme(id)

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

const buscarGeneroIdFilme = async function (id_filme) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id_filme == undefined || id_filme == "" || id_filme == null || isNaN(id_filme) || id_filme < 1) {
            customMessage.ERROR_BAD_REQUEST.field = "[ID_FILME] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            
            let result = await generoDAO.selectGenerosByIdFilme(id_filme)

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

const buscarFilmesIDGenero = async function (id_Genero) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id_Genero == undefined || id_Genero == "" || id_Genero == null || isNaN(id_Genero) || id_Genero < 1) {
            customMessage.ERROR_BAD_REQUEST.field = "[ID_GENERO] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            
            let result = await generoDAO.selectFilmesByIdGenero(id_Genero)

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
        
        let resultBuscarFilmeGenero = await buscarFilmeGenero(id)

        if (resultBuscarFilmeGenero.status) {

            let result = await generoDAO.deleteGeneroFilme(id)
            console.log(result)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return resultBuscarFilmeGenero
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


module.exports = {
    deletarGenero,
    inserirNovoFilmeGenero,
    listarFilmeGenero,
    atualizarFilmeGenero,
    buscarFilmesIDGenero,
    buscarGeneroIdFilme,
    buscarFilmeGenero
}
