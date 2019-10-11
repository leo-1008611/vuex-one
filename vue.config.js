// vue.config.js
const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const env = process.env.NODE_ENV
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 运行路径
  publicPath: env === 'production' ? './' : '/',

  // 打包地址
  // outputDir: 'dist',
  // 相对于 dist 文件夹的静态资源放置目录
  // assetsDir: '/',

  // 是否可以使用template
  runtimeCompiler: true,

  // 禁止生成map 文件 
  productionSourceMap: false,

  devServer: {
    host: '0.0.0.0', // 允许外部ip访问
    port: 8022, // 端口
    open: 'http://localhost:8081/',
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    // proxy: {
    //   '/api': {
    //     target: 'http://www.baidu.com/api',
    //     changeOrigin: true, // 允许websockets跨域
    //     // ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // } // 代理转发配置，用于调试环境
    proxy: 'http://wwww.baidu.com/api'
  },

  // 配置入口 加载 文件
  pages: {
    index: {
      // page 的入口
      entry: 'src/page/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: '刘晋阳',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['vendors', 'index', 'runtime', 'echarts']
      chunks: ['vendor', 'runtime', 'echarts', 'index']
    }
  },

  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      css: {}, // 这里的选项会传递给 css-loader
      postcss: {} // 这里的选项会传递给 postcss-loader
    }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },

  // 开发环境是否使用eslint
  lintOnSave: true,

  chainWebpack: config => {
    config.plugins.delete('prefetch-index')
    // 修改它的选项...
    function handleSetloader(rule, loader, addres) { // 修改loader
      config.module
        .rule(rule)
        .use(loader)
        .loader(loader)
        .tap(options => {
          options.limit = 10000
          options.name = addres + '/[name].[hash:4].[ext]'
          return options
        })
      if (rule !== 'fonts') { // fonts 不用压缩
        config.module
          .rule(rule)
          .use('image-webpack-loader')
          .loader('image-webpack-loader')
          .options({
            quality: '65-80'
          })
          .end()
      }
    }
    handleSetloader('images', 'url-loader', 'img')
    handleSetloader('svg', 'file-loader', 'img')
    handleSetloader('fonts', 'url-loader', 'fonts')
    config.module
      .rule('eslint')
      .test(/\.(vue|(j|t)sx?)$/)
      .use('eslint')
      .loader('eslint-loader')
      .options({
        fix: true,
      })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@s', resolve('src/styles'))
  },

  // 如果是对象 merge合并到最终的配置  如果是函数 接受被解析的配置
  configureWebpack: config => {
    if (env === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'async',
          maxInitialRequests: Infinity,
          minSize: 20000,
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: false,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            },
            'echarts': {
              test: /echarts/, // 直接使用 test 来做路径匹配
              chunks: 'all',
              name: 'echarts',
              priority: 10,
              enforce: true
            }
          }
        }
      }
      Object.assign(config, {
        optimization
      })
      config.plugins.push(
        new webpack.HashedModuleIdsPlugin(),
        new BundleAnalyzerPlugin(), // 打包分析
        new CompressionWebpackPlugin({ // gz
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + ['js', 'css'].join('|') +
            ')$'
          ),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: []
    }
  }
}
