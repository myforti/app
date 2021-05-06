
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'yandex-verification', name: 'yandex-verification', content: '6543238eb50bb7dc' },
      { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#352e5f'},
      { hid: 'theme-color', name: 'theme-color', content: '#352e5f' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Commissioner:wght@400;500;600;700&amp;family=Manrope:wght@400;700&amp;display=swap' },
    ]
  },
  /*
  ** Global CSS
  */
  css: [
      "@/assets/css/app",
    "@/assets/scss/app",
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {src: '~/plugins/AxiosExtend.js'},
    {src: '~/plugins/vue-select.js', mode: 'client'},
    {src: '~/plugins/mask.js', mode: 'client'},
    {src: '~/plugins/splide.js', ssr: false},
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/moment',
    [
      '@rkaliev/nuxtjs-yandex-metrika',
      {
        id: '74897062',
        webvisor: true,
        clickmap:true,
        // useCDN:false,
        trackLinks:true,
        accurateTrackBounce:true,
        debug: false,
      }
    ],
    ['@nuxtjs/google-gtag', {
      id: 'UA-393660833',
      additionalAccounts: [{
        id: 'AW-393660833', // required if you are adding additional accounts
      }]
    }]
  ],

  moment: {
    defaultLocale: 'ru',
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseUrl: 'https://adm.myforti.ru'
  },
  env: {
    backURL: 'https://adm.myforti.ru'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
