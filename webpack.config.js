const config = require('config');
const webpack = require('webpack');
const path = require('path');
const babelVersion = require('@babel/core').version;
const { version: babelLoaderVersion } = require('babel-loader/package');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const babelConfig = {
    babelrc: false,
    "presets": [
        ["@babel/preset-env", {
            "modules": false,
            "corejs": 3,
            "useBuiltIns": "entry",
            "targets": {
                browsers: [
                    'Chrome >= 71',
                    'iOS >= 11',
                    'Safari >= 11',
                    'Firefox >= 60'
                ]
            }
        }],
        "@babel/preset-react",
        "@babel/preset-flow"
    ]
};

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    target: 'web',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: config.dirs.public,
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'src')
                ],
                loader: 'babel-loader',
                options: {
                    ...babelConfig,
                    cacheDirectory: true,
                    cacheIdentifier: JSON.stringify({
                        options: babelConfig,
                        "@babel/core": babelVersion,
                        "@babel/loader": babelLoaderVersion,
                        "NODE_ENV": process.env.NODE_ENV || 'development'
                    })
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new CleanWebpackPlugin({
            verbose: false,
            dry: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.ejs'),
            title: config.title
        })
    ],
    devServer: {
        port: config.port,
        contentBase: config.dirs.public
    },
    stats: 'minimal',
    devtool: process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'source-map'
};