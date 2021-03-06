var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var babelOptions = {
  "presets": [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    "es2016"
  ]
};

module.exports = {
  cache: true,
  entry: {
    extension: [
      './src/main/extension.ts',
      './vendor/superhero/superhero.min.css',
      './src/sass/main.sass'
    ],
    content: './src/main/content.ts',
    background: './src/main/background.ts',
    // vendor: [
    //   // 'babel-polyfill',
    // ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './scripts/[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    },
    // {
    //   test: /\.js$/,
    //   exclude: /node_modules/,
    //   use: [
    //     {
    //       loader: 'babel-loader',
    //       options: babelOptions
    //     }
    //   ]
    // }, 
    {
      test: /\.pug$/,
      use: [
        {
          loader: 'pug-loader'
        }
      ]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
      loader: 'url-loader'
    },
    {
      test: /\.s(c|a)ss$/,
      use: [
        {
          loader: "style-loader" // creates style nodes from JS strings
        },
        {
          loader: "css-loader" // translates CSS into CommonJS
        },
        {
          loader: "sass-loader" // compiles Sass to CSS
        }
      ]
    }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './manifest.json' },
      { from: './images/selenium-ide-logo-16.png', to: './assets/images/selenium-ide-logo-16.png' },
      { from: './images/selenium-ide-logo-24.png', to: './assets/images/selenium-ide-logo-24.png' },
      { from: './images/selenium-ide-logo-48.png', to: './assets/images/selenium-ide-logo-48.png' },
      { from: './images/selenium-ide-logo-128.png', to: './assets/images/selenium-ide-logo-128.png' },
      { from: './images/selenium-ide-logo-512.png', to: './assets/images/selenium-ide-logo-512.png' },
    ]),
    new HtmlWebpackPlugin({
      filename: './options.html',
      template: './src/views/options.pug',
      chunks: ['extension'],
    }),
    new HtmlWebpackPlugin({
      filename: './ide.html',
      template: './src/views/ide.pug',
      chunks: ['extension'],
    }),
    new HtmlWebpackPlugin({
      filename: './popup.html',
      template: './src/views/popup.pug',
      chunks: ['extension'],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};
