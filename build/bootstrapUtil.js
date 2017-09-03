exports.generateScssLoaders = function (options, loaderOptions) {
  // see: https://getbootstrap.com/docs/4.0/getting-started/webpack/
  return [
    {
      loader: 'style-loader', // inject CSS to page
    }, 
    {
      loader: 'css-loader', // translates CSS into CommonJS modules
    }, 
    {
      loader: 'postcss-loader', // Run post css actions
      options: {
        plugins: function () { // post css plugins, can be exported to postcss.config.js
          return [
            require('precss'),
            require('autoprefixer')
          ];
        }
      }
    }, 
    {
      loader: 'sass-loader', // compiles SASS to CSS
      options: Object.assign({}, loaderOptions, {
        sourceMap: options.sourceMap
      })
    }
  ]
}