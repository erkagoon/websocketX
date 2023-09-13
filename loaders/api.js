module.exports = {
    apiLoader: (router, path, fs) => {
        const apiPath = path.join(__dirname, '../api');

        // Créez un tableau pour stocker les routes et leurs ordres
        const routes = [];

        // Parcourir le dossier
        fs.readdirSync(apiPath).forEach(file => {
            if (file.endsWith('.js')) {
                const routeModule = require(path.join(apiPath, file));
                routes.push(routeModule);
            }
        });

        // Triez le tableau sur la base de l'ordre défini
        routes.sort((a, b) => a.order - b.order);

        // Enregistrez les routes avec le router
        routes.forEach(routeModule => {
            routeModule.route(router);
        });

        return router;
    }
}
