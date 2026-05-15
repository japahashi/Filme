const knex = require('knex')

const knexdatabaseConfig = require('../../database_config/knexConfig.js')

const knexConection = knex(knexdatabaseConfig.development)

const insertClassificacao = async function (classificacao) {

    try {

        let sql = `insert into tbl_classificacao (
	classificaco
) values (
	${classificacao.classificacao}
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

module.exports = {

    insertClassificacao,
}
