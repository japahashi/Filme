/*****************************************************************************
 * Objetivo; arquivo resopnsavel pelo CRUD de dados do Filme no banco de dados
 *            MySQL
 * Data:15/04/2026
 * 
 * Autor:Israel
 * 
 * Versâo: 1.0
 *
********************************************************************************/

// Função para inserir um novo filme no banco de dados
const insertFilme = async function (filme) {
    let sql = `insert into tbl_filme(
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values (
	'${filme.nome}',
    '${filme.sinopse}',
    '${filme.capa}',
    '${filme.data_lancamento}',
	'${filme.duracao}',
    '${filme.valor}',G
    '${filme.avaliacao}'
);`
}

//Função para atualizar um filme exitente no banco de dados
const updateFilme = async function (filme) {
}

//Função para retonar todos os dados de filmes do banco de dados
const selectAllFilme = async function () {
}

//Função para retonar um filme pelo id
const selectByIdFilme = async function (id) {
}

//Função para excluir um filme filtrando pelo id
const deleteFilme = async function (id) {
}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}