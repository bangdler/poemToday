const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? '.env' : '.env.development'),
});

module.exports = {
  name: 'poemToday', // 웹팩 설정 이름

  // 애플리케이션 시작 경로
  entry: path.resolve(__dirname, 'src/index.jsx'),

  // 번들된 파일 경로
  output: {
    path: path.join(__dirname, 'dist'), //빌드 위치
    filename: 'app.js', //웹팩 빌드 후 최종적으로 만들어질 파일
    publicPath: '/',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: 'file-loader',
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(), // 웹팩 실행시마다 dist 폴더 정리
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public/meta' }, // meta 폴더를 dist 에 복사
      ],
    }),
  ],
};
