const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = ['index'];

const pluginsList = pages.map( page => {
    const options = {
        template: `./templates/${page}.html`,
        filename: `./${page}.html`
    };
    return new HtmlWebpackPlugin(options);
});

module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: { minimize: false }
                        }
                    ]
                },
            ],
        },

        plugins: pluginsList
    }
};
