const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// // Récupérez tous les fichiers .js de ./assets/js/ et de ses sous-dossiers
// const jsFiles = glob.sync('./game/src/*.js');

// // Créez une map des points d'entrée à partir de ces fichiers
// const entryPoints = jsFiles.reduce((acc, filePath) => {
//   // Supprimez './assets/js/' du chemin et utilisez le reste comme clé
//   const nameWithoutExt = path.relative('./assets/js/', filePath).replace(/\.js$/, '');
//   acc[nameWithoutExt] = `./${filePath}`;
//   return acc;
// }, {});

module.exports = {
  entry: './game/src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../game/dist/assets/js/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    // Ce plugin va supprimer le contenu du dossier dist avant chaque build
    new CleanWebpackPlugin(),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
    }
};
