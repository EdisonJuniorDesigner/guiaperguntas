// um arquivo model começa com a letra maiuscula

const Sequelize = require("sequelize");
const connection = require("./database");

// Criando a tabela pergunta utilizando o sequelize
const Pergunta = connection.define('perguntas', {
    titulo:{
        // tipo varchar
        type: Sequelize.STRING,
        // not null
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Este comando vai sincronizar este arquivo com o banco de dados e faz uma condição que se a tabela pergunta já tiver sido criada ele não vai forçar a criação desta tabela novamente, caso ela não exista ele ira criar esta tabela no seu banco de dados.
Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;