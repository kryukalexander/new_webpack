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
                            presets: ['env']
                        }
                    }
                },
            ]
        }
    }
};