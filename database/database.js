const Sequelize = require("sequelize");
const config = require("config");

// Criando conexão com o banco de dados
/* 
new Sequelize("nomeDoBanco", "usuarioDoBanco", "senhaDoBanco"{
    host: "o endereço de onde está rodando a aplicação que no meu caso está no localhost",
    dialect: "qual banco está usando mysql, mongodb, mariadb...",
})
*/
const connection = new Sequelize(
    config.get('mysql.banco-de-dados'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'), 
    {
        host: config.get('mysql.host'),
        dialect: "mysql"
    }
);

module.exports = connection;