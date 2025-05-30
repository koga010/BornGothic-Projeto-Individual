var database = require("../database/config")

function autenticar(email,senha){
console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome,email,senha){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    

    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function contarUsuarios() {
//     const instrucaoSql = `SELECT COUNT(*) AS total FROM usuario;`;
//     return database.executar(instrucaoSql);
// }

// function obterTop3() {
//     const instrucaoSql = `
//         SELECT 
//         u.nome,
//         COALESCE(SUM(r.pontos), 0) AS total_acertos
//         FROM usuario u
//         LEFT JOIN resultado_quiz r ON u.idUsuario = r.fk_usuario
//         GROUP BY u.idUsuario
//         ORDER BY total_acertos DESC
//         LIMIT 3;
//     `;
//     return database.executar(instrucaoSql);
// }

// function UsuariosPorGenero() {
//     const instrucaoSql = `
//         SELECT genero, COUNT(*) AS quantidade
//         FROM usuario
//         GROUP BY genero;
//     `;
//     return database.executar(instrucaoSql);
// }


module.exports = {
    autenticar,
    cadastrar
    // contarUsuarios,
    // obterTop3,
    // UsuariosPorGenero
};
   