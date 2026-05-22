//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexdatabaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexdatabaseConfig.development)


//Função para inserir um novo gênero no banco de dados
const insertGeneroFilme = async function (generoFilme) {

    try {

        let sql = `insert into tbl_genero_filme(
                        id_filme,
                        id_genero
                    ) values (
                        ${generoFilme.id_filme}
                        ${generoFilme.id_genero}

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
const updateGeneroFilme = async function (generoFilme) {

    try {

        let sql = `update tbl_genero set
                        id_filme = ${generoFilme.id_filme},
                        id_genero = ${generoFilme.id_genero}
                    where id = ${generoFilme.id};`

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
const selectAllGeneroFilme = async function () {

    try {

        let sql = 'select * from tbl_genero_filme order by id desc'

        let result = await knexConection.raw(sql)

        return result[0]

    } catch (error) {

        return false

    }

}


//Função para retornar um gênero pelo ID
const selectByIdGeneroFilme = async function (id) {

    try {

        let sql = `select * from tbl_genero_filme where id = ${id}`

        let result = await knexConection.raw(sql)

        return result[0]

    } catch (error) {

        return false

    }

}

const selectGenerosByIdFilme = async function (idFilme) {

    try {

        let sql = ` select tbl_genero.*
                    from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                        
                    where tbl_filme.id = ${idFilme}`

        let result = await knexConection.raw(sql)

        return result[0]

    } catch (error) {

        return false

    }

}

const selectFilmesByIdGenero = async function (idGenero) {

    try {

        let sql = ` select tbl_filme.*
                    from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                        
                    where tbl_genero.id = ${idGenero}`

        let result = await knexConection.raw(sql)

        return result[0]

    } catch (error) {

        return false

    }

}


//Função para excluir um gênero pelo ID
const deleteGeneroFilme = async function (id) {

    try {

        let sql = `delete from tbl_genero_filme where id = ${id}`

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

    insertGeneroFilme,
    updateGeneroFilme,
    selectAllGeneroFilme,
    selectByIdGeneroFilme,
    selectGenerosByIdFilme,
    selectFilmesByIdGenero,
    deleteGeneroFilme

}