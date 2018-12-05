const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    include: paths,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: '../'
                                }
                            },
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
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: './css/style.css',
            })
        ]
    }    
};
