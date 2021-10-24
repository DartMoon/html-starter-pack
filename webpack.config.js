const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const { development } = env;

    return {
        context: path.resolve(__dirname, 'src'),
        mode: development ? 'development' : 'production',
        entry: {
            main: './index.js'
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            static: {
                directory: './src',
            },
        },
        plugins: [
            new HtmlPlugin({
                filename: "index.html",
                template: './index.html'
            }),
            new HtmlPlugin({
                filename: "about.html",
                template: './about.html'
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),
            new CleanWebpackPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        development ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ],
                },
            ]
        }
    }
}