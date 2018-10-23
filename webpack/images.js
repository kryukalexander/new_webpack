module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    exclude: paths,
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
            ]
        }
    }
};