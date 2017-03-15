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
         new webpack.optimize.CommonsChunkPlugin(
          {
            name:['vendor','manifest']
          }),
         new HtmlWebpackPlugin({
             template: './src/index.html'
         })
     ],
     module:{
          rules:[
            {
              use:'babel-loader',
              test:/\.js$/,
              exclude:/node_modules/
            },
            {
              use:['style-loader','css-loader'],
              test:/\.css$/
            },
             { test: /\.ts$/, loaders: ['awesome-typescript-loader']}
          ]
        },

    //  module: {
    //      loaders: [
    //          { test: /\.ts$/, loaders: ['awesome-typescript-loader']}
    //      ]
    //  },
     resolve: {
         extensions: ['.ts', '.js'],
         modules: [ path.resolve(__dirname, 'node_modules') ]
     }
 };


 //  new HtmlWebpackPlugin({
 //      template: './src/index.html'
 //  })
//const entryTarget = glob.sync('./src/app/*/*.ts')
 var pages = getEntry("./src/**/*.html");
 var pages1 = getEntry("./src/app/*/*.html");
for (var pathname in pages) {
  //
  var conf = {
    filename: './src/' + pathname + '.html', //  export the path of html files
    template: pages[pathname], //
    inject: true,              //
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  };
  if (pathname in module.exports.entry) {
    conf.chunks = ['vendors', pathname];
    conf.hash = false;
  }

  console.log('confconfconfconfconfconf 1==> ', conf)
  // how many html files to be generated, we config  the same quatity of HtmlWebpackPlugin object
  //03.15일단 주석처리하자.
  //module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
	var tmpWholeArray = entry.split('/');
	if(tmpWholeArray.length >= 2 && path.extname(entry) == '.js'){
		var libFolder = tmpWholeArray.splice(-2,1);
		if(libFolder != "lib"){
			 var tmp = entry.split('/');
			 var tmp1 = entry.split('/').splice(2, tmp.length-3);
			 pathname = tmp1.join("/") + '/' + basename;   // export js and html's path correctly
			 entries[pathname] = entry;
		}
	}else{
		var tmp = entry.split('/');
		var tmp1 = entry.split('/').splice(2, tmp.length-3);
		pathname = tmp1.join("/") + '/' + basename;    // export js and html's path correctly
		entries[pathname] = entry;
	}
  });
  return entries;
}
