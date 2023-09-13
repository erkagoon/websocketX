const { dbconfig, mysql } = require('../config/dbConfig');

const connection = mysql.createConnection(dbconfig);

// Fonction pour sélectionner tout les articles
const getAllArticles = (callback) => {
    connection.query("SELECT * FROM articles", callback);
};

// Fonction pour sélectionner un seul article avec son id
const getArticleWithId = (id, callback) => {
    connection.query("SELECT * FROM articles WHERE id=?", [id], callback);
};

module.exports = {
    getAllArticles,
    getArticleWithId
};
