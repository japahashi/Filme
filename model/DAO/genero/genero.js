//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexdatabaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexdatabaseConfig.development)


//Função para inserir um novo gênero no banco de dados
const insertGenero = async function (genero) {

    try {

        let sql = `insert into tbl_genero(
                        genero
                    ) values (
                        '${genero.genero}'
                    );`

        let result = await knexConection.raw(sql)

        if (result) {

            return result[0].insertId

        } else {

            return false

        }

    } catch (error) {

        return false

    }

}


//Função para atualizar um gênero existente
const updateGenero = async function (genero) {

    try {

        let sql = `update tbl_genero set
                        genero = '${genero.genero}'
                    where id = ${genero.id};`

        let result = await knexConection.raw(sql)

        if (result)

            return true

        else

            return false

    } catch (error) {

        return false

    }

}


//Função para retornar todos os gêneros
const selectAllGenero = async function () {

    try {

        let sql = 'select * from tbl_genero order by id desc'

        let result = await knexConection.raw(sql)

        return result[0]

    } catch (error) {

        return false

    }

}


//Função para retornar um gênero pelo ID
const selectByIdGenero = async function (id) {

    try {

        let sql = `select * from tbl_genero where id = ${id}`

        let result = await knexConection.raw(sql)

        return result[0]

    } catch (error) {

        return false

    }

}


//Função para excluir um gênero pelo ID
const deleteGenero = async function (id) {

    try {

        let sql = `delete from tbl_genero where id = ${id}`

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


module.exports = {

    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero

}