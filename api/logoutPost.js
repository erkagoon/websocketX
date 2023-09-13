module.exports = {
    type: 'post',   // Modifier 'get' en 'post'
    order:2,
    routePath: '/logout',
    route: (router) => {
        router.post('/logout', (req, res, next) => {  // Modifier 'router.get' en 'router.post'
            req.logout((err) => {
                if (err) {
                    return next(err);
                }
                req.session.destroy((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');  // rediriger vers la page de connexion après la déconnexion
                });
            });
        });
    }
}