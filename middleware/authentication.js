function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
        res.redirect('/login');
    }
}

module.exports = {
    ensureAuthenticated
}