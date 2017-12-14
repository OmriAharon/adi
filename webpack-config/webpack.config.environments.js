const webpack = require('webpack');
const config = require("./webpack.shared.config.js").config;

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compressor: {
    screw_ie8: true,
    warnings: false
  },
  mangle: {
    screw_ie8: true
  },
  output: {
    comments: false,
    screw_ie8: true
  },
  sourceMap: false
}));

config.plugins.push(new webpack.DefinePlugin({
  // Why we're using `produciton` for NODE_ENV no matter what?
  // When using Uglify, some packages (Like Redux & React) have special optimization for their code but only if we're
  // using NODE_ENV=produciton. That's why for all the deployments we're setting NODE_ENV=production.
  'process.env.NODE_ENV': JSON.stringify('production')
}));


module.exports = config;
