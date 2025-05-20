create database db_diario_viagem_b;

use db_diario_viagem_b;

create table tbl_usuario(
    id int primary key auto_increment,
    nome varchar(50),
    username varchar(50),
    email varchar(50),
    senha varchar(20),
    biografia varchar(200),
    data_conta timestamp,
    foto_perfil varchar(200),
    id_sexo int,
    id_nacionalidade int,
    foreign key(id_sexo) references tbl_sexo(id),
    foreign key(id_nacionalidade) references tbl_nacionalidade(id)
);

create table tbl_sexo(
    id int primary key auto_increment,
    nome varchar(20),
    sigla varchar(1)
);

create table tbl_nacionalidade(
    id int primary key auto_increment,
    pais varchar(80),
    sigla varchar(3)
);