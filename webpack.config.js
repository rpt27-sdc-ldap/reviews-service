module.exports = {
  entry: './Client/src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'reviews.js'
  },
  devServer: {
    contentBase: './dist',
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader',
      ],
    },
   ]
  },
};