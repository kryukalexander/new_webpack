//todo https://github.com/jantimon/html-webpack-plugin/issues/100#issuecomment-368303060

const webpack = require('webpack');

module.exports = function() {
    return {
        devServer: {
            hot: true,
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
};