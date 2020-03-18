var path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
    mode: 'production',

    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        { discardComments: { removeAll: true } }
                    ],
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'app',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },

    entry: {
        app: './js/main.js'
    },

    output: {
        path: path.join(__dirname, './../static/dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/dist'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "resolve-url-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                ]
            }
        ]
    },

    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new AssetsPlugin({
            filename: 'webpack_assets.json',
            path: path.join(__dirname, '../data'),
            prettyPrint: true
        }),
        /*
        */
        /*
        new ExtractTextPlugin({
            filename: getPath => {
                return getPath('[name].[contenthash].css');
            },
            allChunks: true
        }),
        */
    ],

    watch: true
};
