#permite criar um database
create database db_filmes_20261_b;

#Permite visualisar todos os databases existentes
show databases;

#Permite escolher o database a ser utilizado
use db_filmes_20261_b;

#Permite visualisar todas as tabelas existentes dentro do database
show tables;

#Pemite criar tabelas
create table tbl_filme (
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    sinopse text not null,
    capa varchar(255) not null,
    data_lancamento date not null,
    duracao time not null,
    valor decimal(5,2) default 0 ,
    avaliacao decimal(3,2) default null
);

create table tbl_genero (
	id int not null auto_increment primary key,
    genero varchar(20)
);
insert into tbl_genero(
	genero
) values (
'Drama'
);

create table tbl_classificacao (
	id int not null auto_increment primary key,
    classificacao varchar(3)

);
insert into tbl_classificacao (
	classificacao
) values (
	'+10'
);

#Permite apagar tabela
#drop database db_filmes_20261_b;

insert into tbl_filme(
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values (
	'Super Mario Galaxy: O Filme',
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
	'01:39:00',
    '50.60',
    '3',
    if('' = '', null, 2)
);

select * from tbl_filme order by id desc;
select * from tbl_filme where id = 35;
select * from tbl_genero order by id desc;

delete from tbl_filme where id > 0;

drop table tbl_filme;

select * from tbl_filme;

delete from tbl_filme;

alter table tbl_filme
	add column id_classificacao int not null,
    add constraint FK_CLASSIFICACAO_FILME
    foreign key (id_classificacao)
    references tbl_classificacao(id);

