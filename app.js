//node_modules import
const app = require('./config/express');
const pug = require('./config/pug');
const path = require("path");
const express = require("express");
const fs = require("fs");
const router = express.Router();
const sequelize = require('./config/dbCreate');

//logs import
const importRoutes = require("./logs/importRoutes");
const projectTree = require("./logs/projectTree");

//webpack import
require('./config/webpack');

//loader import
const { apiLoader } = require("./loaders/api");

// chargement des models de bdd
const User = require('./models/user');
const Article = require('./models/article');
const Homepage = require('./models/homePage');

// Middlewares import
const essentialConfig = require("./middleware/essentialConfig");
const helmet = require("./middleware/helmet");
const rateLimiter = require("./middleware/rateLimiter");
const morgan = require("./middleware/morgan");
const bodyParser = require("./middleware/bodyParser");
const cookieParser = require("./middleware/cookieParser");
const session = require("./middleware/session");

//assets générales
const staticAssets = require("./middleware/staticAssets");
//asset du jeu
const staticGameAssets = require("./middleware/staticGameAssets");

const routeHandlers = require("./middleware/routeHandlers");
const authentication = require("./middleware/authentication");
const authorization = require("./middleware/authorization");
const customMiddleware = require("./middleware/customMiddleware");
const thirdPartyMiddleware = require("./middleware/thirdPartyMiddleware");
const notFoundHandler = require("./middleware/notFoundHandler");
const globalErrorHandler = require("./middleware/globalErrorHandler");

//variables
const hostname = '127.0.0.1';
const port = 3000;

//vues
pug(app);

//Middlewares INIT

// Middlewares d'initialisation
essentialConfig(app); // Configuration basique, par exemple pour définir des variables d'environnement

// Middlewares de sécurité
helmet(app); // Pour la configuration de Helmet, qui définit divers en-têtes HTTP pour renforcer la sécurité
rateLimiter(app); // Pour limiter le taux de requêtes et prévenir les attaques par force brute

// Middlewares d'enregistrement et de logging
morgan(app); // Pour l'enregistrement des requêtes

// Middlewares de traitement des requêtes
bodyParser(app); // Pour l'analyse du corps des requêtes POST
cookieParser(app); // Pour l'analyse des cookies de la requête
staticAssets(app); // Pour servir des fichiers statiques comme CSS, JavaScript, images
staticGameAssets(app); // Pour servir les fichiers statiques du jeu
session(app); // Pour la gestion des sessions

// Middlewares de routage
routeHandlers(app); // Pour définir des routes spécifiques, comme les routes CRUD pour les utilisateurs ou autres ressources

// Middlewares d'autorisation
authorization(app); // Pour gérer les autorisations et les rôles des utilisateurs

// Middlewares personnalisés et tiers
customMiddleware(app); // Middlewares d'application personnalisés
thirdPartyMiddleware(app); // Autres middlewares tiers que vous pourriez utiliser

// Middlewares de gestion d'erreurs
notFoundHandler(app); // Pour gérer les erreurs 404 (not found)
globalErrorHandler(app); // Pour gérer toutes les autres erreurs

// Automatisation de l'import des routes
apiLoader(router, path, fs);
app.use('/', router); // '/api' est un exemple de préfixe pour toutes vos routes API.

// Synchronisez la base de données
sequelize.sync({ force: false })
    .then(() => {
        console.log('La base de données a été synchronisée.');
        app.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la synchronisation de la base de données:', error);
    });