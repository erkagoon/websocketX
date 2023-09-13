const bcrypt = require('bcryptjs');

// Fonction pour hasher un mot de passe
const hashPassword = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, callback);
    });
};

// Fonction pour comparer un mot de passe avec son hash
const comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, callback);
};

module.exports = {
    hashPassword,
    comparePassword
};