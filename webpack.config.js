const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

const isDev = process.env.NODE_ENV === 'development';

const plugins = [];
if (isDev) {
  plugins.push(new Dotenv());
}

module.exports = {
  entry: ['./src/server.js'],
  target: 'node',
  node: {
    __dirname: true,
  },
  watch: isDev,
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql|gql)$/,
        use: [{ loader: 'graphql-tag/loader' }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.json'],
    alias: {
      modules: path.resolve(__dirname, 'src/modules'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      models: path.resolve(__dirname, 'src/models'),
      '~': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins,
};
