// vue.config.js
const path = require('path')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    css: {
        // css预置器配置项
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            },
            sass: {
                // 旧版 data: `@import "~@/assets/scss/variables.scss";`

                //新版 sass-loader 
                prependData: `@import "./src/styles/common.scss";`
            },
        },
        // extract: true, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中, Default: 生产环境下是 true，开发环境下是 false
        // sourceMap: false, // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    },
    configureWebpack: config => {
        // if (process.env.NODE_ENV === 'production') {
        //     // 为生产环境修改配置...
        // } else {
        //     // 为开发环境修改配置...
        // }
        config.resolve = { // 配置解析别名
            extensions: ['.js', '.jsx', '.vue', '.json'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                'utils': path.resolve(__dirname, './src/utils'),
            }
        }
    },
    // runtimeCompiler: true, //关键点在这
}