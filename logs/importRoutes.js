const fs = require('fs');
const path = require('path');

const apiPath = path.join(__dirname, '../api');
let fileData = [];
let nonImportedFiles = [];

// Parcourir tous les fichiers dans le dossier 'api/'
fs.readdirSync(apiPath).forEach(file => {
    if (file.endsWith('.js')) {
        const modulePath = path.join(apiPath, file);
        const moduleImport = require(modulePath);

        // Vérifier si les variables 'order' et 'routePath' sont présentes
        if (typeof moduleImport.order !== 'undefined' && typeof moduleImport.routePath !== 'undefined' && typeof moduleImport.type !== 'undefined') {
            fileData.push({
                fileName: file,
                type: moduleImport.type,
                order: moduleImport.order,
                route: moduleImport.routePath
            });
        } else {
            nonImportedFiles.push(file);
        }
    }
});

// Trier les fichiers en fonction de la variable 'order'
fileData.sort((a, b) => a.order - b.order);

// Créer une chaîne de caractères pour le contenu du fichier logs.txt
let content = 'Liste des importations de route par fichier:\n\n';
content += 'Ordre - Fichier - Route - Type\n';
content += '-------------------------------------------------------------------------------------------\n';
fileData.forEach(data => {
    content += `${data.order} - ${data.fileName} - '${data.route}' - ${data.type},\n`;
});

if (nonImportedFiles.length > 0 && nonImportedFiles.length < 2) {
    content += `\n${nonImportedFiles.length} Un paramètre est manquant au fichier suivant: ${nonImportedFiles.join(', ')}\n`;
}
else if (nonImportedFiles.length > 1) {
    content += `\n${nonImportedFiles.length} Un paramètre est manquant aux fichiers suivants : ${nonImportedFiles.join(', ')}\n`;
}

// Écrire les données dans le fichier logs.txt
fs.writeFileSync(path.join(__dirname, 'importRoutes.txt'), content);

console.log('Log file has been created.');