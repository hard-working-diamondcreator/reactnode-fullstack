// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let plugins = [
  new ExtractTextPlugin({
    filename: 'style.[chunkhash].css'
  }),
  // Minify and optimize the index.html
  new HtmlWebpackPlugin({
    template: 'app/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    inject: true,
  }),

  // Put it in the end to capture all the HtmlWebpackPlugin's
  // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
  new OfflinePlugin({
    relativePaths: false,
    publicPath: '/assets',

    // No need to cache .htaccess. See http://mxs.is/googmp,
    // this is applied before any match in `caches` section
    excludes: ['.htaccess'],

    caches: {
      main: [':rest:'],
    },

    // Removes warning for about `additional` section usage
    safeToUseOptionalCaches: true,

    AppCache: false,
  }),
];

if (process.env.BUNDLE_ANALYZE) {
  plugins = plugins.concat([new BundleAnalyzerPlugin()]);
}
module.exports = require('./webpack.base.babel')({
  mode: 'production',
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'app/main.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  plugins: plugins,

  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
});
