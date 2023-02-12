import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

const {
    argv: { mode: CurrentEnvironment }
} = require('yargs');

const { parsed: ServerConfig } = require('dotenv').config({
    path: path.join(__dirname, `.env.${CurrentEnvironment}`)
});

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const isDevelopment = CurrentEnvironment === 'development';

const getStyleLoaders = (preProcessor): Object => {
    return [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['postcss-preset-env']
                }
            }
        },
        preProcessor
    ].filter(Boolean);
};

const config: Configuration = {
    entry: './src/index.tsx',
    output: {
        path: isDevelopment ? undefined : path.resolve(__dirname, './dist'),
        filename: isDevelopment ? 'static/js/[name].js' : 'static/js/[name].[contenthash:10].js',
        chunkFilename: isDevelopment ? 'static/js/[name].chunk.js' : 'static/js/[name].[contenthash:10].chunk.js',
        assetModuleFilename: 'static/js/[hash:10][ext][query]',
        clean: true
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoaders('sass-loader')
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg)$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10 * 1024
                            }
                        }
                    },
                    {
                        test: /\.(ttf|woff2?)$/,
                        type: 'asset/resource'
                    },
                    {
                        test: /\.([jt]sx|[jt]s)?$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    cacheDirectory: true,
                                    cacheCompression: false,
                                    plugins: [isDevelopment && 'react-refresh/babel'].filter(Boolean)
                                }
                            },
                            {
                                loader: 'ts-loader',
                                options: {
                                    getCustomTransformers: () => ({
                                        before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean)
                                    }),
                                    transpileOnly: isDevelopment
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: isDevelopment ? './.env.development' : './.env.production',
            systemvars: true
        }),
        new ESLintWebpackPlugin({
            context: path.resolve(__dirname, './src'),
            exclude: 'node_modules',
            cache: true,
            cacheLocation: path.resolve(__dirname, './node_modules/.cache/.eslintcache')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        isDevelopment && new ReactRefreshWebpackPlugin(),
        !isDevelopment &&
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, './public'),
                        to: path.resolve(__dirname, './dist'),
                        toType: 'dir',
                        noErrorOnMissing: true,
                        globOptions: {
                            ignore: ['**/index.html']
                        },
                        info: {
                            minimized: true
                        }
                    }
                ]
            }),
        !isDevelopment &&
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:10].css',
                chunkFilename: 'static/css/[name].[contenthash:10].chunk.css'
            })
    ].filter(Boolean),
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`
        },
        minimize: isDevelopment,
        minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@modules': path.resolve(__dirname, 'src/modules/'),
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@base': path.resolve(__dirname, 'src/base/'),
            '@containers': path.resolve(__dirname, 'src/containers/'),
            '@layouts': path.resolve(__dirname, 'src/layouts/'),
            '@service': path.resolve(__dirname, 'src/service/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@configs': path.resolve(__dirname, 'src/configs/'),
            '@library': path.resolve(__dirname, 'src/library/')
        }
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    mode: isDevelopment ? 'development' : 'production',
    // devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map'
    devtool: 'source-map'
};

export default config;
