const path = require('path');
const merge = require('webpack-merge');
const stylesExtract = require('./webpack/stylesExtract');
const styles = require('./webpack/styles');
const scripts = require('./webpack/scripts');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const templates = require('./webpack/templates');
const cleanup = require('./webpack/cleanupDist');
const sourceMaps = require('./webpack/sourceMaps');
const hmr = require('./webpack/hotReload');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const source = path.resolve(__dirname, 'src');
const cssFolders = path.resolve(__dirname, 'src', 'css');
const jsFolders = path.resolve(__dirname, 'src', 'js');
const icons = path.resolve(__dirname, 'src', 'images', 'icons');
const sprite = path.resolve(__dirname, 'images', 'images-sprite');
const ignoredImages = [sprite, icons];

const common = merge([
    {
        context: source,
        entry: { main: './js/index.js' },
        output: { filename: './js/bundle.js' },

        plugins: [
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

            new SpriteLoaderPlugin()
        ],

        module: {
            rules: [
                {
                    include: [ icons ],
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader',
                    options: {
                        extract: true
                    }
                }
            ]
        },
    },
    scripts(jsFolders),
    images(ignoredImages),
    fonts(),
    templates()
]);

const configDev = merge(
    [
        common, 
        hmr(),
        styles(cssFolders),
        sourceMaps(),
    ]
);

const configProd = merge(
    [
        common,
        cleanup('dist'),
        stylesExtract(cssFolders),
    ]
);

module.exports = function(env, argv) {
    if (argv.mode === 'production') {
        return configProd;
    }
    
    if (argv.mode === 'development') {
        return configDev;
    }
};
