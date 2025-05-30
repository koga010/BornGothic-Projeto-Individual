var dashModel = require("../models/dashModel");

function exibirDados(req, res) {
    const idUsuario = req.query.idUsuario;

    if (!idUsuario) {
        return res.status(400).json({ mensagem: "idUsuario é obrigatório" });
    }

    dashModel.selecionarDados(idUsuario)
        .then(resultados => {
            if (resultados && resultados.length > 0) {
                res.json(resultados);
            } else {
                res.status(404).json({ mensagem: "Nenhum resultado encontrado para este usuário." });
            }
        })
        .catch(erro => {
            console.error("Erro ao obter dados do quiz:", erro);
            res.status(500).json({ mensagem: "Erro ao obter dados do quiz: " + erro.message });
        });
}


function buscarJogadoresPontuacoes(req, res) {

    dashModel.buscarJogadoresPontuacoes()
        .then(resultados => res.json(resultados))
        .catch(erro => {
            console.error('Erro ao buscar pontuações dos jogadores: ', erro);
            res.status(500).json({ erro: 'Erro ao buscar as pontuações dos jogadores.' });
        });
}

module.exports = {
    exibirDados,
    buscarJogadoresPontuacoes
};