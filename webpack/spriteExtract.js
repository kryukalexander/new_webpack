const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = function(icons) {
    return {
        module: {
            rules: [
                {
                    include: [ icons ],
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader',
                    options: {
                        extract: true
                    }
                }
            ]
        },

        plugins: [ new SpriteLoaderPlugin() ]
    }
};
