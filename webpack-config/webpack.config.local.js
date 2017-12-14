const webpack = require('webpack');

const config = require("./webpack.shared.config.js").config;

config.devtool = 'source-map';

config.plugins.push(new webpack.DefinePlugin({
  // We add it to the code so we could access it in the main_chunk to see if react HMR AppContainer is needed or not
  'process.env.DISABLE_REACT_HMR': process.env.DISABLE_REACT_HMR || false
}));

module.exports = config;
