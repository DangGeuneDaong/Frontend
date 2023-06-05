const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: true,
      progress: true,
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'ts-loader'],            
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
            ],
          },
          {
            test: /\.(png|jpg|jpeg|svg)$/,
            use: {
              loader:'file-loader',
            }
          }
        ],
      },
    ],
  },
  plugins: [
    isProduction
      ? new HTMLWebpackPlugin({
          template: 'public/index.html',
          minify: true,
        })
      : new HTMLWebpackPlugin({
          template: 'public/index.html',
        }),
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.resolve(__dirname, 'dist/**/*'),
      ],
    }),
    new MiniCssExtractPlugin({
      linkType: false,
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    })
  ],
};
