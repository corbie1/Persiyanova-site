const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var webpack = require('webpack');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './js/index.js',
    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
      }),
      new HTMLWebpackPlugin({
          filename: 'portfolio.html',
          template: './portfolio.html'
      }),
      new HTMLWebpackPlugin({
          filename: 'about.html',
          template: './about.html'
      }),
      new HTMLWebpackPlugin({
          filename: 'gallery(2).html',
          template: './gallery(2).html'
      }),
      new HTMLWebpackPlugin({
          filename: 'blog.html',
          template: './blog.html'
      }),
      new HTMLWebpackPlugin({
          filename: 'contact.html',
          template: './contact.html'
      }),
      new HTMLWebpackPlugin({
          filename: 'polit.html',
          template: './polit.html'
      }),
      new HTMLWebpackPlugin({
          filename: 'price.html',
          template: './price.html'
      }),
      new HTMLWebpackPlugin({
          filename: 'reviews.html',
          template: './reviews.html'
      }),
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
      }),
      
      new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production', // Disable during development
        pngquant: {
          quality: '95-100'
        }
      }),
      new CopyPlugin({
        patterns: [
        {
          from: './img/gallery', 
          to: './img/gallery'
        }],
      }),
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader'],
              
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                  context: ''
                  },
            },
            {
              test: /fancybox[\/\\]dist[\/\\]js[\/\\]jquery.fancybox.cjs.js/,
              use: "imports-loader?jQuery=jquery,$=jquery,this=>window"
            },
            {
              test: /fancybox[\/\\]dist[\/\\]js[\/\\]jquery.fancybox.cjs.js/,
              use: "imports-loader?jQuery=jquery,$=jquery,this=>window"
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                  attributes: {
                    list: [
                      {
                        tag: 'img',
                        attribute: 'src',
                        type: 'src',
                      },
                      {
                        tag: 'img',
                        attribute: 'srcset',
                        type: 'srcset',
                      },
                      {
                        tag: 'img',
                        attribute: 'data-src',
                        type: 'src',
                      },
                      {
                        tag: 'img',
                        attribute: 'data-srcset',
                        type: 'srcset',
                      }, 
                     
                    ],
                    root: '.',
                  },
                },
              },
        ]
    },
  };