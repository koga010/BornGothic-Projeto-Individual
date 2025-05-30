var database = require("../database/config");

function selecionarDados(idUsuario) {
    const instrucaoSql = `
    SELECT 
        u.nome,
        p.fkUsuario,
        p.dtRealizacao,
        p.acertos,
        p.erros
    FROM pontuacao as p
    JOIN usuario as u ON p.fkUsuario = u.idUsuario
    WHERE u.idUsuario = ${Number(idUsuario)};
    `;
    console.log("Executando SQL para selecionar dados do usuário:", instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    selecionarDados
};
