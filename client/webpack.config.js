const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const fileName = ext => isProd ? `[name].[fullhash].${ext}` : `[name].${ext}`;

const plugins = [
    new MiniCssExtractPlugin({
        filename: fileName('css')
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public/index.html')
    })
]

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        clean: true,
        filename: fileName('js'),
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: '/\.(png|jpe?g|gif|svg)$/i',
                type: 'asset'
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins,
    devtool: 'source-map',
    devServer: {
        static:{
            directory: path.join(__dirname, 'build')
        },
        open: true,
        port: 3000,
    }
}