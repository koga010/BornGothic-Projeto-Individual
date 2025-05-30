

var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultado) {
                    if (resultado.length > 0) {

                        res.json(resultado[0]);
                    } else {

                        res.status(403).send("Email e/ou senha inválidos!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// function obterTotalUsuarios(req, res) {
//     usuarioModel.contarUsuarios()
//         .then(resultado => {
//             res.json(resultado[0]); 
//         })
//         .catch(erro => {
//             console.error("Erro ao contar usuários:", erro);
//             res.status(500).json({ mensagem: "Erro ao contar usuários." });
//         });
// }

// function listarTop3(req, res) {
//     usuarioModel.obterTop3()
//         .then(resultado => {
//             res.json(resultado);
//         })
//         .catch(erro => {
//             console.error("Erro ao buscar top 3 usuários:", erro);
//             res.status(500).json({ mensagem: "Erro ao buscar ranking." });
//         });
// }

// function obterUsuariosPorGenero(req, res) {
//     usuarioModel.UsuariosPorGenero()
//         .then(resultado => {
//             res.json(resultado);
//         })
//         .catch(erro => {
//             console.error("Erro ao contar usuários por gênero:", erro);
//             res.status(500).json({ mensagem: "Erro ao contar usuários por gênero." });
//         });
// }


module.exports = {
    autenticar,
    cadastrar
    // obterTotalUsuarios,
    // listarTop3,
    // obterUsuariosPorGenero
};