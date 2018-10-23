const path = require('path');
const merge = require('webpack-merge');
const styles = require('./webpack/stylesExtract');
const scripts = require('./webpack/scripts');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const templates = require('./webpack/templates');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const source = path.resolve(__dirname, 'src');
const cssFolders = path.resolve(__dirname, 'src', 'css');
const jsFolders = path.resolve(__dirname, 'src', 'js');
const ignoredImages = path.resolve(__dirname, 'images', 'images-sprite');

const common = merge([{
    context: source,
    entry: { main: './js/index.js' },
    output: { filename: './js/bundle.js' },
    devtool: 'source-map',

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin(
            {
                template: './templates/index.html',
                filename: './index.html'
            }
        ),
        new CopyWebpackPlugin([
            {
                from: './images/sprite.png',
                to: './images/sprite.png'
            },
        ]),
    ]
}]);

const config = merge(
    [
        common, 
        styles(cssFolders),
        scripts(jsFolders),
        images(ignoredImages),
        fonts(),
        templates(),
    ]
);
module.exports = config;