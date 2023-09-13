const session = require('express-session');
const { MySQLStore, dbconfig } = require('../config/dbConfig');
const passport = require('passport');
const flash = require('connect-flash');
const sessionStore = new MySQLStore({
    ...dbconfig,
    clearExpired: true,
    checkExpirationInterval: 15 * 60 * 1000, // vérifie toutes les 15 minutes
    expiration: 10 * 60 * 1000  // expire après 10 minutes
});

const { getUserByIdWithoutPwd } = require('../models/userQueries');

require('../config/passport')(passport);

module.exports = (app) => {
    // Configurer les sessions pour Express
    app.use(session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie : {
          sameSite: 'Strict',
          secure: false,
        }
    }));

    app.use(flash());

    // Initialise Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Username
    app.use((req, res, next) => {
        if (!req.session.passport || !req.session.passport.user) {
            return next();  // Aucun utilisateur n'est connecté
        }
        else {
            getUserByIdWithoutPwd(req.session.passport.user, (err, results) => {
                if (err) {
                    console.error('Erreur lors de la récupération de l\'utilisateur:', err);
                    return next(err);
                }
        
                if (results && results.length > 0) {
                    res.locals.user = results[0];
                }
                
                next();
            });
        }
    });    
};
