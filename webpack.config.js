const path = require('path');
const merge = require('webpack-merge');
const styles = require('./webpack/styles');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const source = path.resolve(__dirname, 'src');
const cssFolders = path.resolve(__dirname, 'src', 'css');
const jsFolders = path.resolve(__dirname, 'src', 'js');

const common = merge([{
    context: source,
    entry: { main: './js/index.js' },
    output: { filename: './js/bundle.js' },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                include: jsFolders,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                }
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: path.resolve(__dirname, 'images/images-sprite'),
                use: [
                    'url-loader?limit=1500&name=[path][name].[ext]',
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-gifsicle')({}),
                                require('imagemin-mozjpeg')({}),
                                require('imagemin-optipng')({}),
                                require('imagemin-svgo')({})
                            ]
                        }
                    }
                ]
            },

            {
                test: /\.(woff|woff2|ttf)$/i,
                use: [
                    'file-loader?name=[path][name].[ext]',
                ]
            },
        ]
    },
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
        styles(cssFolders)
    ]
);
module.exports = config;