module.exports = {
    type: 'get',
    order:0,
    routePath: '/login',
    route: (router) => {
        router.get('/login', (req, res) => {
            res.render('login', { 
                title: 'Connexion', 
                cssBody: '/assets/css/body.css', 
                cssPage: '/assets/css/login.css' 
            });
        });
    }
}