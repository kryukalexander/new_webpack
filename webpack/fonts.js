module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(woff|woff2|ttf)$/i,
                    use: [
                        'file-loader?name=[path][name].[ext]',
                    ]
                },
            ]
        }
    }
};