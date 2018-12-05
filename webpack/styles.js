module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    include: paths,
                    use: [
                        {
                            loader: "style-loader",
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
        }
    }
};
