const { ensureAuthenticated } = require("../middleware/authentication")

module.exports = {
    type: 'get',
    order:0,
    routePath: '/game',
    route: (router) => {
        router.get('/gameCore', ensureAuthenticated, (req, res) => {
            res.render('gameCore', { 
                title: 'Play', 
                cssBody: '/assets/css/body.css', 
                cssPage: '/assets/css/game.css',
                userBar: '/assets/css/userBar.css',
            });
        });
    }
}