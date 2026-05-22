use db_filmes_20261_b;

select * from tbl_filme;
select * from tbl_classificacao;

#Exemplo de como relacionar tabelas no select par unir atributos

#INNER JOIN
#Retorna todos o filmes que somente estão relacionados com a classificação
select  tbl_filme.nome as nome_filme, tbl_filme.sinopse, tbl_filme.duracao,
		tbl_classificacao.classificacao as nome_classificacao
from    tbl_filme
			inner join tbl_classificacao
				on tbl_classificacao.id = tbl_filme.id_classificacao;
                
#LEFT JOIN
select  tbl_filme.nome as nome_filme, tbl_filme.sinopse, tbl_filme.duracao,
		tbl_classificacao.classificacao as nome_classificacao
from    tbl_filme
			LEFT join tbl_classificacao
				on tbl_classificacao.id = tbl_filme.id_classificacao

                