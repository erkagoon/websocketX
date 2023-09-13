const passport = require("passport");

module.exports = {
    type: 'post',
    order:2,
    routePath: '/login',
    route: (router) => {
        router.post('/login', (req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                // Erreur lors de l'authentification
                if (err) {
                    return res.status(500).json({ error: 'Erreur interne du serveur.' });
                }
    
                // L'utilisateur n'a pas été trouvé ou le mot de passe est incorrect
                if (!user) {
                    return res.status(400).json({ error: 'Le login ou mot de passe est incorrect' });
                }
    
                // Authentifier manuellement l'utilisateur
                req.logIn(user, (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Erreur lors de la connexion.' });
                    }
    
                    // Authentification réussie
                    return res.json({ success: true, redirection: '/' });
                });
            })(req, res, next);
        });
    }
}