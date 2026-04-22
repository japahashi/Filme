/*****************************************************************************
 * Objetivo; arquivo resopnsavel pela padronização de menssagens e status code
 * do projeto filmes
 *            
 * Data:15/04/2026
 * 
 * Autor:Israel
 * 
 * Versâo: 1.0
 *
********************************************************************************/

//Padronização dos reetornos da API (Cabeçalho)
const DEFAULT_MESSAGE = {
    api_descrption: 'API para controar o projeto de filmes',
    development: 'Israel Fujimoto',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}

//Mensagens de erro do projeto de filmes
const ERROR_BAD_REQUEST = {
    status: false, status_code: 400, message: 'Não foi possivel processar a requisição devido a erro de entrada de dados'
}
// 
const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message:'Não foi possivel processar a requisição devido a um erro interno no servidor [MODEL]'}

//Mensagem de sucesso do projeto de filmes
const SUCCESS_CREATED_ITEM = { status: true, status_code: 201, message: 'Item inserido com sucesso!' }



module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    ERROR_INTERNAL_SERVER_MODEL,
    SUCCESS_CREATED_ITEM
}