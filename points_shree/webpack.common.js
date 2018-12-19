const path = require('path');
const webpack = require('webpack');
const projectRootPath = path.resolve(__dirname, './');
const assetsPath = path.resolve(projectRootPath, './dist');

module.exports = {
  entry: `${__dirname}/src/index.js`,
  output: {
    path: assetsPath,
    filename: 'points.js',
    library: 'Points',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        options: {
          compact: false,
          cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.glsl$/, use: 'text-loader'
      }
    ],
  },
};
