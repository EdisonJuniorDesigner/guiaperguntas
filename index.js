const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// Estou dizendo para o Express usar o EJS como View Engine
// que no caso é para renderizar meu código em HTML
app.set("view engine", "ejs");
app.use(express.static("public"));

// configurando body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// rotas
app.get("/", (req, res) => {
    // o código abaixo basicamente é
    // SELECT * FROM perguntas
    // raw:true -> este comando faz com que seja encaminhado para nós somente os dados do usuário, descartando muito códigos que são desnecessários.
    Pergunta.findAll({ raw: true, order:[
        ['id', 'DESC'] // ASC = crescente || DESC = decrescente
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    // o código abaixo basicamente é
    // INSERT INTO perguntas 
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        // comando para redirecionar o usuario para uma página específica
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) { // Pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]}).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else { // Não encontrada
            res.redirect("/");
        }
    });
});

// Reposta
app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

app.listen(8080, () => {console.log("App rodando!");});