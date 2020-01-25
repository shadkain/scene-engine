const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: '/node_modules/'
            },
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                exclude: '/node_modules/'
            },
        ],
    },   
    resolve: {
        modules: [
            '/node_modules/'
        ],
        extensions: [ '.ts', '.js', ],
        plugins: [
            new TsConfigPathsPlugin({
                'checkJs': false,
            }),
        ]
    },
    externals: {
        'pixi.js': 'require("pixi.js")',
        'fs': 'require("fs")',
        'path': 'require("path")',
    }
}