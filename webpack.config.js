const path = require('node:path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

const baseConfig = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    module: {
        rules: [
            { test: /\.ts$/i, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
            { test: /\.svg$/i, type: 'asset/resource' }
        ]
    },
    resolve: { extensions: ['.ts', '.js'] },
    output: {
        filename: 'index.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        assetModuleFilename: 'assets/[name].[contenthash][ext]',
        clean: true
    },
    plugins: [
        new DotenvWebpackPlugin({ defaults: '.env.example' }),
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ]
};

module.exports = (env = {}) => merge(
    baseConfig,
    env.mode === 'prod' ? require('./webpack.prod.config') : require('./webpack.dev.config')
);