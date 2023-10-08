const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './game/src/main.js',
    mainCore: './game/src/mainCore.js',
  },
  output: {
    filename: '[name].js',
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
