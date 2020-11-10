module.exports = {

    devServer: {
        host: "localhost",
        port: 8080, // 端口号
        https: false,
        open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'https://autumnfish.cn/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    chainWebpack : config => {
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js');

            config.set('externals', {
                vue: 'Vue',
                'vue-router' : 'VueRouter',
                axios : 'axios',
                vuex : 'Vuex',
                'vue-lazyload': 'VueLazyload'
            })

            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })

        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js');

            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
}
// "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --host 192.168.1.5"