module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: paths,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
            ]
        }
    }
};