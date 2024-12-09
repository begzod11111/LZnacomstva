const app = require('express')();

const host = '127.0.0.1';
const port = 7000;

const { Client } = require('pg');
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('lznacomstva_nodejs', 'admin', '123', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        freeTableName: true,
    },
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение с БД было успешно установлено');
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e);
    }
})();

app.get('/home', (req, res) => {
    res.status(200).type('text/plain');
    res.send('Home page');
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});