export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/animate.css',
    '@/assets/css/owl.carousel.min.css',
    '@/assets/css/owl.theme.default.min.css',
    '@/assets/css/magnific-popup.css',
    '@/assets/css/flaticon.css',
    '@/assets/css/style.css',
  ],

  // Global Scripts
  script: [
    { src: 'js/jquery.min.js', body: true },
    { src: 'js/jquery-migrate-3.0.1.min.js', body: true },
    { src: 'js/bootstrap.min.js', body: true },
    { src: 'js/jquery.waypoints.min.js', body: true },
    { src: 'js/jquery.stellar.min.js', body: true },
    { src: 'js/owl.carousel.min.js', body: true },
    { src: 'js/jquery.animateNumber.min.js', body: true },
    { src: 'js/main.js', body: true },
  ],


  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://127.0.0.1:8050'
  }
}
