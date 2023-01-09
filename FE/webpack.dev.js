const dotenv = require('dotenv');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

dotenv.config();

const port = process.env.PORT || 3000;

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  // 개발 서버 설정
  devServer: {
    historyApiFallback: true,
    host: 'localhost',
    port: port,
    open: true, // open page when start
    proxy: {
      '/api/*': {
        target: 'http://localhost:4000',
        // target: 'http://3.37.55.66:4000',
      },
    },
  },
});
