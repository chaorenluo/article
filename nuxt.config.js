const env = process.env.NODE_ENV || 'dev';

let API_URL = 'http://aggregation.yoosoul.com/api';
const axios = {
  baseURL: API_URL,
  credentials: true
};
const server = {
  port: 3000,
  host: '0.0.0.0'
};
let proxy ={}
console.log('env---',env)
switch (env) {
  case 'dev':
    axios.proxy = true;
    axios.browserBaseURL = `http://localhost:${server.port}/api`
    proxy = {
      '/api':{
        changeOrigin: true,
        target:API_URL,
        pathRewrite: {
          '^/api': ''
        },
      }
    }
    break;
  case 'production':
    axios.baseURL ='/api'
    break;
}

console.log('proxy---',proxy)



export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'article',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'referrer', content: 'no-referrer' },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/api',
    '@/plugins/axios',
    { src: '@/plugins/contextMenu', mode: 'client' },
    { src: '@/plugins/event-bus', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  axios,
  proxy,
  server
}
