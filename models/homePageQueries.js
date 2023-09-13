const { dbconfig, mysql } = require('../config/dbConfig');

const connection = mysql.createConnection(dbconfig);

// Fonction pour sélectionner le contenu de la page d'accueil
const getHomepageContent = (callback) => {
    connection.query("SELECT title, texte FROM homepage LIMIT 1", callback);
};

module.exports = {
    getHomepageContent
};