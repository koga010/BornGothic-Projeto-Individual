-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE bornGothic;
USE bornGothic;

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(100),
senha VARCHAR(45));

CREATE TABLE quiz(
idQuiz INT PRIMARY KEY AUTO_INCREMENT,
categoria VARCHAR(45));

CREATE TABLE pontuacao(
fkUsuario INT,
fkQuiz INT, 
idPontuacao INT auto_increment,
constraint pkComposta 
primary key (idPontuacao, fkUsuario, fkQuiz),
dtRealizacao DATETIME,
acertos INT,
erros INT,
foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkQuiz) references quiz(idQuiz));