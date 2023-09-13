module.exports = {
    type: 'get',
    order:0,
    routePath: '/register',
    route: (router) => {
        router.get('/register', (req, res) => {
            res.render('register', { 
                title: 'Register', 
                cssBody: '/assets/css/body.css', 
                cssPage: '/assets/css/register.css' 
            });
        });
    }
}