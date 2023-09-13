const path = require('path');
const { ensureAuthenticated } = require("../middleware/authentication")
const imageFolder = path.join(__dirname, '../assets/img/avatar/');
const { getImagesFromDirectory } = require("../utilities/avatarUtils")

module.exports = {
    type: 'get',
    order:0,
    routePath: '/infosUser',
    route: (router) => {
        router.get('/infosUser', ensureAuthenticated, async (req, res) => {
            try {
                const images = await getImagesFromDirectory(imageFolder);
                res.render('infosUser', { 
                    title: 'Mon compte', 
                    cssBody: '/assets/css/body.css', 
                    cssPage: '/assets/css/infosUser.css',
                    userBar: '/assets/css/userBar.css',
                    images: images
                });
            } catch (error) {
                // Gérer l'erreur comme bon vous semble (par exemple, envoyer une réponse d'erreur)
                console.error(error);
                res.status(500).send('Erreur lors de la récupération des images.');
            }
        });
    }
}
