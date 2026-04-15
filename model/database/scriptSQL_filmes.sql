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

#Permite apagar tabela
#drop database db_filmes_20261_b;
