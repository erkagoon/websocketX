const { dbconfig, mysql } = require('../config/dbConfig');

const connection = mysql.createConnection(dbconfig);

// Fonction pour récupérer un utilisateur par son nom d'utilisateur
const getUserByUsername = (username, callback) => {
    connection.query("SELECT * FROM users WHERE username = ?", [username], callback);
};

// Fonction pour récupérer un utilisateur par son ID
const getUserById = (id, callback) => {
    connection.query("SELECT * FROM users WHERE id = ?", [id], callback);
};

const getUserByIdWithoutPwd = (id, callback) => {
    connection.query("SELECT id, username, avatar, DATE_FORMAT(createdAt, '%d/%m/%Y') as createdAt FROM users WHERE id = ?", [id], callback);
};

// Fonction pour update un nouvel avatar
const updateAvatar = (id, avatar, callback) => {
    connection.query("UPDATE users SET avatar = ? WHERE id = ?", [avatar, id], callback);
};

// Fonction pour insérer un nouvel utilisateur
const insertUser = (username, hashedPassword, callback) => {
    connection.query("INSERT INTO users (username, password, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())", [username, hashedPassword], callback);
};

module.exports = {
    getUserByUsername,
    getUserById,
    insertUser,
    getUserByIdWithoutPwd,
    updateAvatar
};
