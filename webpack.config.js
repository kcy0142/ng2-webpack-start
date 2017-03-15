var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


//entries 추출 시작
const glob = require('glob')
let entries = {}
let dirnames = {}
const entryTarget = glob.sync('./src/app/*/*.ts')


 entries['main'] = './src/main.ts';


 for (var i in entryTarget) {
   const entry = entryTarget[i]
   const dirname = path.dirname(entry)


   const name = dirname.replace(/\.\/src\/(.*)/, '$1')
  // console.log(`entry -> ${name}`)
   entries[name] = entry
   dirnames[name] = dirname.replace(/\.\/src\/(.*)/, '$1')
 }


 //console.log('entries 1==> ', entries)
 //console.log('dirnames 1==> ', dirnames)
 //entries 추출 끝


 module.exports = {


     entry: entries,
    // entry: './src/main.ts',
     output: {
       path: path.resolve(__dirname, './dist'),
       publicPath: '/',
        filename: '[name].[chunkhash].js'
     },
     // output: {
     //     path: path.resolve(__dirname, './dist'),
     //     filename: 'app.bundle.js'
     // },
     plugins: [
         new webpack.ContextReplacementPlugin(
             /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
             path.resolve(__dirname, './src'),
             {}
         ),
         new HtmlWebpackPlugin({
             template: './src/index.html'
         })
     ],
     module: {
         loaders: [
             { test: /\.ts$/, loaders: ['awesome-typescript-loader']}
         ]
     },
     resolve: {
         extensions: ['.ts', '.js'],
         modules: [ path.resolve(__dirname, 'node_modules') ]
     }
 };
