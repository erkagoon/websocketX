const fs = require('fs').promises;
const path = require('path');

async function walk(dir, prefix = '') {
    let files = await fs.readdir(dir);
    let filepaths = [];

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        
        // Ignorer le dossier node_modules
        if (file === 'node_modules') continue;
        if (file === '.git') continue;

        const fullPath = path.join(dir, file);
        const stat = await fs.stat(fullPath);

        // Logique pour l'affichage
        if (i === files.length - 1) {  // dernier fichier ou dossier
            filepaths.push(`${prefix}└───${file}`);
            prefix += '    ';  // mise à jour de l'indentation
        } else {
            filepaths.push(`${prefix}│   ${file}`);
        }

        // Traitement récursif pour les sous-dossiers
        if (stat.isDirectory()) {
            filepaths = filepaths.concat(await walk(fullPath, prefix + '│   '));
        }
    }
    return filepaths;
}

const baseDir = path.join(__dirname, '../');
const outputFile = path.join(__dirname, 'projectTree.txt');

(async () => {
    const filepaths = await walk(baseDir);
    const arborescence = filepaths.join('\n');
    await fs.writeFile(outputFile, arborescence);
    console.log('Arborescence écrite avec succès dans project-arborescence.txt !');
})();
