export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    script: [
      {
        src: '/js/typeform.js',
        defer: true
      },
      {
        src: '/js/intercom.js',
        defer: true
      },
      {
        src: '/js/jquery-3.5.1.min.js',
        defer: true
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/reset.css', '@/assets/scss/style.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/fullpage.js',
      ssr: false
    },
    {
      src: '~/plugins/gsap.js',
      ssr: false
    },
    {
      src: '~/plugins/typed-js.js',
      ssr: false
    },
    {
      src: '~/plugins/intersection-observer.js',
      ssr: false
    },
    {
      src: '~/plugins/flickity.js',
      ssr: false
    },
    {
      src: '~/plugins/directives.js',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/svg-sprite'],
  svgSprite: {
    input: '~/assets/images/svg/',
    elementClass: 'icon'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    html: {
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    },
    extend(config, ctx) {}
  }
}
