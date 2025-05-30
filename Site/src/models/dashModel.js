var database = require("../database/config");

function selecionarDados(idUsuario) {
    const instrucaoSql = `
    SELECT 
        u.nome,
        r.fk_usuario,
        r.acertos,
        r.erros,
        r.data_resposta
    FROM resultado_quiz as r
    JOIN usuario as u ON r.fk_usuario = u.idUsuario
    WHERE u.idUsuario = ${Number(idUsuario)};
    `;
    console.log("Executando SQL para selecionar dados do usuário:", instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    selecionarDados
};
