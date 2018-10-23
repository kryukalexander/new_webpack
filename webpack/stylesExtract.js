const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.(sass|scss)$/,
                    include: paths,
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
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: './css/style.css',
                allChunks: true,
            })
        ]
    }    
};
