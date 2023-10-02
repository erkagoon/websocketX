const { ensureAuthenticated } = require("../middleware/authentication")

module.exports = {
    type: 'get',
    order:0,
    routePath: '/game',
    route: (router) => {
        router.get('/game', ensureAuthenticated, (req, res) => {
            res.render('game', { 
                title: 'Play', 
                cssBody: '/assets/css/body.css', 
                cssPage: '/assets/css/game.css',
                userBar: '/assets/css/userBar.css',
            });
        });
    }
}