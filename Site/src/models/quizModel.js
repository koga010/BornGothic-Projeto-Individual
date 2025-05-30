var database = require("../database/config");

function buscarPerguntas() {
    const instrucao = `
        SELECT p.idPergunta, p.descricao AS pergunta, a.idAlternativa, a.resposta, a.correta
        FROM (
            SELECT idPergunta, descricao
            FROM perguntas
            ORDER BY RAND()
            LIMIT 10
        ) AS p
        JOIN alternativas a ON a.fkPergunta = p.idPergunta
        ORDER BY p.idPergunta, a.idAlternativa;
    `;
    console.log("Executando a instrução SQL:\n" + instrucao);
    return database.executar(instrucao);
}


function registrarResultadoQuiz(fkUsuario, acertos, erros) {
    const instrucaoSql = `
        INSERT INTO pontuacao (fkUsuario, fkQuiz,acertos, erros) 
        VALUES (${fkUsuario}, 1,${acertos}, ${erros});
    `;
    console.log("Executando SQL para registrar quiz:", instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrarResultadoQuiz,
    buscarPerguntas
};