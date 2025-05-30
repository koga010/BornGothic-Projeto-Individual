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
dtRealizacao DATETIME default current_timestamp,
acertos INT,
erros INT,
foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkQuiz) references quiz(idQuiz));

CREATE TABLE perguntas(
idPergunta INT AUTO_INCREMENT,
fkQuiz INT,
descricao VARCHAR(350),
Foreign Key (fkQuiz) REFERENCES quiz(idQuiz),
PRIMARY KEY(idPergunta, fkQuiz));

CREATE TABLE alternativas(
idAlternativa INT AUTO_INCREMENT,
fkPergunta INT,
resposta VARCHAR(100),
correta TINYINT,
Foreign Key (fkPergunta) REFERENCES perguntas(idPergunta),
PRIMARY KEY(idAlternativa, fkPergunta));

INSERT INTO quiz VALUES
(default, 'História e estética');

INSERT INTO perguntas (fkQuiz, descricao) VALUES
(1, "Onde e quando surgiu a subcultura gótica moderna?"),
(1, "Qual estilo musical está mais diretamente associado à subcultura gótica?"),
(1, "Quais cores são predominantes na estética visual gótica?"),
(1, "Qual é a origem histórica do termo “gótico”?"),
(1, "Por que o termo “gótico” é considerado pejorativo em sua origem?"),
(1, "Qual foi o impacto da ditadura militar brasileira na chegada da subcultura gótica ao Brasil?"),
(1, "Quais autores brasileiros apresentam elementos da estética gótica em suas obras?"),
(1, "Como a subcultura gótica se posiciona em relação ao gênero e à estética?"),
(1, "Qual é a visão da subcultura gótica sobre o consumismo e a moda?"),
(1, "A subcultura gótica é aberta a quais tipos de pessoas?");

INSERT INTO alternativas (fkPergunta, resposta, correta) VALUES
(1, "Alemanha, década de 1960", 0),
(1, "Estados Unidos, década de 1990", 0),
(1, "Reino Unido, final da década de 1970 e início dos anos 1980", 1),
(1, "França, década de 1920", 0),
(2, "Samba e MPB", 0),
(2,"Darkwave, Gothic Rock e Ethereal Wave", 1),
(2, "Heavy Metal tradicional", 0),
(2, "Grunge e Rap", 0),
(3, "Branco e azul claro", 0),
(3, "Verde e dourado", 0),
(3, "Preto, com toques de lilás, roxo e carmesim", 1),
(3, "Amarelo e vermelho", 0),
(4, "Deriva de uma tribo africana medieval", 0),
(4, "Refere-se a um estilo de pintura italiana", 0),
(4, "Vem dos Godos, povo germânico que invadiu o Império Romano", 1),
(4, "Nasceu com a Revolução Francesa", 0),
(5, "Porque foi associado a práticas religiosas proibidas", 0),
(5, "Porque era usado para designar tudo que era considerado bárbaro ou rude", 1),
(5, "Porque representava um estilo de governo ditatorial", 0),
(5, "Porque era usado por elites para descrever camponeses", 0),
(6, "Acelerou a chegada do movimento gótico", 0),
(6, "Proibiu totalmente a expressão artística", 0),
(6, "Condicionou a produção cultural e atrasou a popularização do termo", 1),
(6, "Incentivou a moda gótica como forma de resistência", 0),
(7, "Machado de Assis, Jorge Amado e Clarice Lispector", 0),
(7, "Carlos Drummond, Cecília Meireles, Mário Quintana", 0),
(7, "Ariano Suassuna, Rachel de Queiroz, José de Alencar", 0),
(7, "Álvares de Azevedo, Cruz e Souza, Augusto dos Anjos", 1),
(8, "Reforça papéis tradicionais de gênero", 0),
(8, "Segue tendências da moda comercial", 0),
(8, "Promove a androginia e a liberdade de expressão visual", 1),
(8, "Se limita a roupas pretas e visual sombrio apenas para mulheres", 0),
(9, "É entusiasta do fast-fashion", 0),
(9, "Segue tendências populares para ganhar visibilidade", 0),
(9, "Pratica o anticonsumismo e prefere brechós, de forma mais sustentável", 1),
(9, "Não possui relação com escolhas de consumo", 0),
(10, "Apenas pessoas com estilo dark", 0),
(10, "Apenas jovens urbanos", 0),
(10, "Apenas pessoas de determinada classe social", 0),
(10, "Todas as pessoas, independentemente de gênero, raça, sexualidade ou condição", 1);

    SELECT 
        u.nome,
        p.fkUsuario,
        p.dtRealizacao,
        p.acertos,
        p.erros
    FROM pontuacao as p
    JOIN usuario as u ON p.fkUsuario = u.idUsuario
    WHERE u.idUsuario = 2;

  SELECT p.idPergunta, p.descricao AS pergunta, a.idAlternativa, a.resposta, a.correta
        FROM (
            SELECT idPergunta, descricao
            FROM perguntas
            ORDER BY RAND()
            LIMIT 10
        ) AS p
        JOIN alternativas a ON a.fkPergunta = p.idPergunta
        ORDER BY p.idPergunta, a.idAlternativa;

        select * from quiz;
        select * from pontuacao;

          SELECT 
        u.nome,
        p.fkUsuario,
        p.dtRealizacao,
        p.acertos,
        p.erros
    FROM pontuacao as p
    JOIN usuario as u ON p.fkUsuario = u.idUsuario
    WHERE u.idUsuario = 1;