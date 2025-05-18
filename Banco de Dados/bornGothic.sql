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

