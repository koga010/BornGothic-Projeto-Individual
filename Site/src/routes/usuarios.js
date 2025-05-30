var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});
// router.get("/total", usuarioController.obterTotalUsuarios);
// router.get("/top3", usuarioController.listarTop3);
// router.get("/usuarios-por-genero", usuarioController.obterUsuariosPorGenero);

module.exports = router;