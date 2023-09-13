const fs = require('fs');
const path = require('path');

function getImagesFromDirectory(directory) {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            // Filtrer uniquement les fichiers d'image (en supposant qu'ils aient des extensions .jpg, .jpeg, .png, .gif)
            const imageFiles = files
                .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
                .map(file => {
                    return {
                        src: path.join('/assets/img/avatar/', file).replace(/\\/g, '/'),
                        alt: path.basename(file, path.extname(file))
                    };
                });



            resolve(imageFiles);
        });
    });
}
module.exports = {
    getImagesFromDirectory
}