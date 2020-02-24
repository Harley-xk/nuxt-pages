
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "Harley's Studio",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: './assets/fonts/iconfont/iconfont.css', lang: 'css' },
    { src: './assets/styles/markdown/vue.css', lang: 'css' },
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/valog/api', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  proxy: {
    '/valog/api': {
      target: 'http://localhost:8080', // 目标接口域名
      pathRewrite: {
        '^/valog/api': '/api', // 去掉 /valog
        changeOrigin: true // 表示是否跨域
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  generate: {
    dir: '/var/www'
  }

}
