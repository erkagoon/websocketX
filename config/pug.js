const path = require('path');

function pug(app) {
    // Configurer Express pour utiliser Pug comme moteur de vue
    app.set('view engine', 'pug');

    // Configurez le répertoire des vues
    app.set('views', path.join(__dirname, '../views'));
}


module.exports = pug;