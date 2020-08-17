const path = require('path');

const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const autoprefixer = require('autoprefixer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const webpackUtils = require("./webpack.utils.js");

process.env.NODE_ENV = process.env.NODE_ENV || 'local';

const configFilePath = path.resolve(`./webpack-config/env-configs/${process.env.NODE_ENV}.js`);
const configFile = require(configFilePath);

const stats = process.env.STATS || false;
const port = process.env.NODE_PORT || 443;
const hostAddress = process.env.HOST_ADDRESS || 'www.adigoldshtein.com';
const hostProtocol = process.env.HOST_PROTOCOL || 'https';
let publicPath = `${hostProtocol}://${hostAddress}`;

// We do not add the port by default cause otherwise our PR website demo solution will be broken cause the S3 folder name
// is part of the "domain" name
if (port && port !== "443") {
  publicPath = `${publicPath}:${port}`;
}

publicPath = `${publicPath}/`;

const currentDirectory = path.resolve(__dirname, '..');
const YAML = require('yamljs');

// Paths
const rootDirectory = path.resolve(__dirname, '../');
const srcPath = path.resolve(rootDirectory, 'src');
const nodeModulesPath = path.resolve(rootDirectory, 'node_modules');
const indexHtmlPath = path.resolve(rootDirectory, 'index.html');
const indexHtmlTitle = 'Adi Goldshtein Dentist';
const buildPath = path.resolve(rootDirectory, 'dist');
const faviconPath = `${srcPath}/assets/favicons/adifavicon.png`;
const googleVerificationHtmlPath = `${rootDirectory}/google3c89aa9647762e34.html`;

const config = {
  entry: {
    application: [path.join(srcPath, 'index')]
  },
  output: {
    // Next line is not used in local but WebpackDevServer crashes without it:
    path: buildPath,
    pathinfo: true,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    libraryTarget: 'umd',
    publicPath
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      config: configFilePath,
      jquery: path.resolve(path.join(nodeModulesPath, "jquery"))
    }
  },
  resolveLoader: {
    modules: [nodeModulesPath]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [srcPath],
        loader: 'babel-loader',
        options: {
          cacheDirectory: process.env.NODE_ENV === 'local'
        }
      },
      {
        test: /\.ya?ml$/,
        use: [
          {
            loader: 'json-loader'
          },
          {
            loader: 'yaml-loader'
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 1000
        }
      },
      // {
      //   test: /\.(eot|ttf|woff|woff2)$/,
      //   loader: 'file-loader'
      // },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'file-loader'
      },
      {
        test: /\.(scss|css)$/,
        include: [srcPath],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [autoprefixer];
                },
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanPlugin(['dist'], {root: currentDirectory}),
    new CopyPlugin([{ from: faviconPath, to: path.basename(faviconPath) }]),
    new CopyPlugin([{ from: googleVerificationHtmlPath, to: path.basename(googleVerificationHtmlPath) }]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new ExtractTextPlugin({
      filename: "[name]-[contenthash].css",
      allChunks: true
    }),
    // For more moment locales change `en` with `en|fr|hu`
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

    // Async loaded vendors chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'application',
      async: "vendors",
      children: true,
      minChunks: (module, count) => {
        return module.resource &&
          webpackUtils.isVendor(module.resource) &&
          !webpackUtils.isPolyfill(module.resource);
      }
    }),
    // For better caching - https://github.com/webpack/webpack/tree/master/examples/chunkhash
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: indexHtmlTitle,
      inject: true,
      template: indexHtmlPath
      // TODO - add favicon
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      fileBlacklist: [/.*core-js.*/, /.*\.css/],
      include: 'asyncChunks',
      as: 'script'
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      fileBlacklist: [/.*\.js/],
      include: 'all',
      as: 'style'
    }),

    // We're inlining some chunks for couple since they are very small (~ 1KB) and it's a waste to make a round trip just for them.
    // The loading of the "manifest" chunk is part of the caching improvement described
    // in: https://github.com/webpack/webpack/tree/master/examples/chunkhash
    new InlineChunkWebpackPlugin({
      inlineChunks: ['manifest'],
      quiet: true
    })
  ]
};

const localeFilePath = path.resolve('./locale/global.yml');
const globalFile = YAML.load(localeFilePath);

config.plugins.push(new FaviconsWebpackPlugin({
  logo: faviconPath,
  title: globalFile.APP_NAME
}));

const versionDate = new Date().toString();

// This is taken from the i18n.js file, when updated here it should also be updated there
const locales = ['he', 'en'];
const languages = [];

locales.forEach((locale) => {
  languages.push({
    code: locale,
    localeURL: locale === 'he' ? configFile.ORIGINS.OWN_SITE : configFile.ORIGINS.OWN_SITE + `/${locale}/`
  });
});

const HreflangLinkTags = webpackUtils.buildHreflangLinkTags(languages);

languages.forEach((language) => {
  const localeFilePath = path.resolve(`./locale/${language.code}.yml`);
  const file = YAML.load(localeFilePath);
  const htmlConfig = {
    inject: true,
    version: versionDate,
    title: file.SITE_TITLE,
    description: file.SITE_DESCRIPTION,
    keywords: file.SITE_KEYWORDS,
    locale: language.code,
    localeURL: language.localeURL,
    template: indexHtmlPath,
    favicon: faviconPath,
    HreflangLinkTags,
    imageType: path.extname(faviconPath).substring(1),
    imageHttp: `${configFile.ORIGINS.OWN_SITE}/${path.basename(faviconPath)}`,
    imageHttps: `${configFile.ORIGINS.OWN_SITE}/${path.basename(faviconPath)}`
  };

  if (language.code !== 'he') {
    htmlConfig.filename = `${language.code}/index.html`;
  }

  config.plugins.push(new HtmlWebpackPlugin(htmlConfig));
});


if (webpackUtils.isWatching()) {
  const DashboardPlugin = require('webpack-dashboard/plugin');
  config.plugins.push(new DashboardPlugin());
}

if (stats) {
  config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'web-analyze.html',
    openAnalyzer: true,
    generateStatsFile: true,
    statsFilename: 'webpack-stats.json',
    logLevel: 'info'
  }));
}

if (process.env.NODE_ENV === 'local') {
  config.devtool = 'source-map';
}

module.exports = {
  config,
  rootDirectory,
  srcPath,
  port
};
