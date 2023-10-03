const { getArticleWithId } = require('../models/articleQueries');

module.exports = {
    type: 'get',
    order:0,
    routePath: '/article/:id',
    route: (router) => {
        router.get('/article/:id', (req, res) => {
            const articleId = req.params.id;

            getArticleWithId(articleId, (err, result) => {
                if (err) {
                    // Gérez l'erreur (par exemple, renvoyez une réponse d'erreur ou redirigez l'utilisateur)
                    console.error(err);
                    res.status(500).json({ error: 'L\'article n\'existe probablement plus !' });
                    return;
                }

                // Si tout va bien, transmettez le résultat au template
                res.render('article', { 
                    title: result[0].title, 
                    cssBody: '/assets/css/body.css', 
                    cssPage: '/assets/css/article.css',
                    userBar: '/assets/css/userBar.css',
                    article: result[0]
                });
            });
        });
    }
}