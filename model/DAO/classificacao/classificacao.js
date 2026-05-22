const knex = require('knex')

//import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertClassificacao = async function (classificacao) {
    try {
        let sql = `insert into tbl_classificacao (
            classificacao
        )values (
            '${classificacao.classificacao}'
        );`

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const updateClassificacao = async function(classificacao){
    try {
        let sql = `update tbl_classificacao set
        classificacao            = '${classificacao.classificacao}'
        where id            = ${classificacao.id};`

        let result = await knexConection.raw(sql)
        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectALLClassificacao = async function () {

    try {

        let sql = 'select * from tbl_classificacao order by id desc;'

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectByIdClassificacao = async function(id){
    try {
        let sql = `select * from tbl_classificacao where id=${id};`

        let result = await knexConection.raw(sql)

        
        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteClassificacao = async function(id){
    try {
        let sql = `delete from tbl_classificacao where id=${id}`
        let result = await knexConection.raw(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}


module.exports = {
    insertClassificacao,
    selectALLClassificacao,
    selectByIdClassificacao,
    updateClassificacao,
    deleteClassificacao
}
