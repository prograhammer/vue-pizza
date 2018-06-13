'use strict'

// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/app/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/auth': {
        // @TODO: You need to replace this with your own backend API.
        // Demo OAuth2 server https://github.com/bshaffer/oauth2-demo-php.
        // Username: demouser  Password: demopass
        //target: 'http://brentertainment.com/oauth2/lockdin/token',
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/auth': ''
        },
        router: {
        }
      },
      '/api': {
        // target: 'http://brentertainment.com/oauth2',  // <-- Api server.
        target: 'http://localhost:8081/experience',
        changeOrigin: true,                           // <-- For virtual hosted sites.
        ws: true,                                     // <-- Proxy websockets.
        pathRewrite: {
        // Rewrite path localhost:8080/api to http://brentertainment.com/oauth2/lockdin.
          '^/api': ''
        },
        router: {
          // when request.headers.host == 'dev.localhost:3000',
          // override target 'http://www.example.org' to 'http://localhost:8000'
          // 'dev.localhost:3000': 'http://localhost:8000'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
