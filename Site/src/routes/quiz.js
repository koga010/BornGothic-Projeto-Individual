var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");

router.post("/registrar", function (req, res) {
    quizController.registrarResultadoQuiz(req, res);
});
router.get("/perguntas", quizController.buscarPerguntas);

module.exports = router;
