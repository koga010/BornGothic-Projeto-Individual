const comecarQuiz = document.querySelector(".start")
const perguntas = document.querySelector(".questoes")
const questao = document.querySelector(".pergunta")
const respostas = document.querySelector(".respostas")
const proximaPergunta = document.querySelector(".next")

comecarQuiz.addEventListener("click", start)
proximaPergunta.addEventListener("click", next)

var perguntaAtual = 0;
var pontos = 0;
var erros = 0;

function start() {
    UsernameExib.style.display="none"
    comecarQuiz.style.display = "none"
containerPerguntas.style.display = "flex"
    perguntas.classList.remove("hide")
    next()

}

function sortearAlternativas(alternativas) {
    for (var i = alternativas.length - 1; i > 0; i--) {
        const sortear = Math.floor(Math.random() * (i + 1));
        [alternativas[i], alternativas[sortear]] = [alternativas[sortear], alternativas[i]];
    }
    return alternativas;
}

function next() {
    if (listaDePerguntas.length == perguntaAtual) {
        return finalizarQuiz()
    }

    listaDePerguntas[perguntaAtual].respostas = sortearAlternativas(listaDePerguntas[perguntaAtual].respostas);

    respostas.innerHTML = ""
    questao.textContent = listaDePerguntas[perguntaAtual].pergunta

    listaDePerguntas[perguntaAtual].respostas.forEach(answer => {
        const novaResposta = document.createElement("button")
        novaResposta.classList.add("botoes", "answer")
        novaResposta.textContent = answer.text

        if (answer.correct) {
            novaResposta.dataset.correct = true
        }

        respostas.appendChild(novaResposta)

        novaResposta.addEventListener("click", selecionarRespostas)
        proximaPergunta.classList.add("hide")
    })
}

function selecionarRespostas(event) {
    const respostaClicada = event.target

    if (respostaClicada.dataset.correct) {
        pontos++
    }
    else {
        erros++
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correto")
        } else {
            button.classList.add("incorreto")
        }

        button.disabled = true
        proximaPergunta.classList.remove("hide")
    })

    proximaPergunta.classList.remove("hide")
    perguntaAtual++
}

function finalizarQuiz() {
    const qtdPerguntas = listaDePerguntas.length
    proximaPergunta.classList.add("hide")

    perguntas.innerHTML = `
        <div class="msgFinal">
            <p>
                Você acertou ${pontos} de ${qtdPerguntas} perguntas!
            </p>
            <span>
                Tente de novo ou acesse a dashboard e veja como foi seu desempenho comparado ao dos outros usuários
            </span>
            <button onclick="window.location.reload()" class="botoes end">
                Tentar novamente
            </button>
        </div>
    `
    enviarPontuacao(pontos, sessionStorage.ID_USUARIO);
}

function enviarPontuacao() {
    fetch("/quiz/registrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fk_usuario: sessionStorage.ID_USUARIO,
            pontos: pontos,
            erros: erros

        })
    })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao enviar pontuação.")
            return res.json()
        })
        .then(data => {
            console.log("Pontuação cadastrada com sucesso:", data);
        })
        .catch(err => {
            console.error("Erro ao enviar pontuação:", err);
        });
}

var listaDePerguntas = [];

window.onload = () => {
    const idUsuario = sessionStorage.getItem("ID_USUARIO");
    const nomeUsuario = sessionStorage.getItem("NOME_USUARIO");

    if (!nomeUsuario || !idUsuario) {
        alert("Usuário não autenticado. Faça login novamente.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("b_usuario").textContent = nomeUsuario;



    fetch(`/quiz/perguntas`)
        .then(res => res.json())
        .then(data => {
            const perguntasAgrupadas = {}

            data.forEach(item => {
                if (!perguntasAgrupadas[item.idPergunta]) {
                    perguntasAgrupadas[item.idPergunta] = {
                        pergunta: item.pergunta,
                        respostas: []
                    }
                }

                perguntasAgrupadas[item.idPergunta].respostas.push({
                    text: item.resposta,
                    correct: item.correta == 1
                })
            })

            listaDePerguntas = Object.values(perguntasAgrupadas)
            next()
        })
        .catch(err => console.error("Erro ao carregar perguntas:", err))
}


function esconderForm() {
    formulario.style.display = "none";
}

function fechar() {
    formulario.style.display = "none";
    pontuacaoEJogo.style.display = "flex";
    resposta.innerHTML = "";
    window.formulario.destroy();
}

function exibirForm() {
    if (formulario.style.display == "none") {
        formulario.style.display = "flex";
        document.getElementById('pontuacao').style.display = "none";
        document.getElementById('jogo').style.display = "none";
        pontuacaoEJogo.style.display = "none"
        
    } else {
        esconderForm()
        pontuacaoEJogo.style.display = "flex"
    }
}

async function gerarResposta() {
    const selects = document.querySelectorAll("select");

    for (let select of selects) {
        if (select.value === "#") {
            alert("Por favor, responda todas as perguntas antes de finalizar.");
            return;
        }
    }

    setTimeout
    const box = document.getElementById("boxResposta");
    box.classList.toggle("expandir");

    const nivelTreino = document.getElementById('slcNivel').value;
    const grupoMuscular = document.getElementById('slcGrupo').value;
    const idade = document.getElementById('slcIdade').value;

    const response = await fetch('/perguntar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nivelTreino, grupoMuscular, idade })
    });

    const data = await response.json();

    resposta.style.display = 'block';
    document.getElementById('resposta').innerHTML = data.resultado
        .split('\n')
        .filter(linha => linha.trim() !== '')
        .map(linha => `<p>${linha.trim()}</p>`)
        .join('');
}

