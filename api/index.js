const { getAllArticles } = require('../models/articleQueries');
const { getHomepageContent } = require('../models/homePageQueries');

module.exports = {
    type: 'get',
    order: 0,
    routePath: '/',
    route: (router) => {
        router.get('/', (req, res) => {

            getAllArticles((err, articlesResult) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erreur lors de la récupération des articles.' });
                    return;
                }

                getHomepageContent((err, homepageResult) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Erreur lors de la récupération du contenu de la page d\'accueil.' });
                        return;
                    }

                    const homepageContent = homepageResult[0]; // Car LIMIT 1 nous renvoie un tableau avec un seul élément

                    res.render('index', { 
                        title: homepageContent.title || 'Page d\'accueil', // Utilisez le titre récupéré s'il existe
                        text: homepageContent.texte, // Nouveau champ pour le texte
                        cssBody: '/assets/css/body.css', 
                        cssPage: '/assets/css/index.css',
                        userBar: '/assets/css/userBar.css',
                        articles: articlesResult,
                    });
                });
            });
        });
    }
}
