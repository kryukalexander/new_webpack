module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.(sass|scss)$/,
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
