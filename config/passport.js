const LocalStrategy = require('passport-local').Strategy;
const { getUserByUsername, getUserById } = require('../models/userQueries');
const { comparePassword } = require('./bcrypt');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            // Recherche de l'utilisateur par son nom d'utilisateur
            getUserByUsername(username, (err, results) => {
                if (err) throw err;

                if (results.length === 0) {
                    return done(null, false, { message: 'Nom d\'utilisateur introuvable' });
                }

                const user = results[0];

                // Comparaison des mots de passe
                comparePassword(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Mot de passe incorrect' });
                    }
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        getUserById(id, (err, results) => {
            if (err) throw err;
            done(null, results[0]);
        });
    });
};