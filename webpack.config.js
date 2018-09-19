const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
    context: path.resolve(__dirname, 'src'),
    entry: { main: './js/index.js' },
    output: {
        filename: './js/bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                }
            },

            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, 'src/css'),
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: { sourceMap: true }
                        },

                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true }
                        },

                        {
                            loader: "sass-loader",
                            options: { sourceMap: true }
                        },
                    ],
                    publicPath: '../'
                })
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
                test: /\.(jpe?g|png|gif)$/i,
                exclude: [ path.resolve('images/images-sprite')],
                use: [
                    'url-loader?limit=1500&name=[path][name].[ext]',
                    'img-loader'
                ]
            },

            {
                test: /\.(svg|woff|woff2|ttf)$/i,
                use: [
                    'file-loader?name=[path][name].[ext]',
                ]
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            filename: './css/style.css',
            allChunks: true,
        }),

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
};

module.exports = config;