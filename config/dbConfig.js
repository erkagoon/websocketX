const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// Configuration de la base de données
const dbconfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'websocketdb'
};

// Exporter la configuration et d'autres utilitaires relatifs à la base de données
module.exports = {
    mysql,
    dbconfig,
    MySQLStore
};