var database = require("../database/config");

function registrarResultadoQuiz(fkUsuario, acertos, erros) {
    const instrucaoSql = `
        INSERT INTO pontuacao(fkUsuario, acertos, erros) 
        VALUES (${fkUsuario}, ${acertos}, ${erros});
    `;
    console.log("Executando SQL para registrar quiz:", instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrarResultadoQuiz 
};