/* eslint-disable no-console */
// import axios from '@nuxtjs/axios'
import bodyParser from 'body-parser'
import core from './config/core'
const dev = process.env.NODE_ENV !== 'production'
// import { getEstates } from './functions/api'
// const hostname = process.env.NODE_ENV === 'production'
//   ? core.settings.baseUrl.prod
//   : core.settings.baseUrl.dev

// const api = process.env.NODE_ENV === 'production'
//   ? core.api.target
//   : core.api.target

// const squareEndPoint = process.env.NODE_ENV === 'production'
//   ? core.settings.square.prod.endpoint
//   : core.settings.square.test.endpoint

export default {
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  ssr: true,
  // target: 'static',
  target: 'server',
  server: {
    port: dev ? '3000' : '3000', // default: 3000
    host: 'localhost' // default: localhost
    // host: '0.0.0.0' // default: localhost
  },
  router: {
    base: '/'
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: core.api.hasProxy ? '/api/' : '/'
    }
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: core.api.target
    }
  },
  // generate: {
  //   routes () {
  //     getEstates(false, true, axios, null, false).then((estateList) => {
  //       // console.log(estateList)
  //       return {
  //         route: '*',
  //         payload: estateList
  //       }
  //     })
  //   }
  // },
  render: {
    asynchScripts: true,
    http2: {
      push: true
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'sv',
      amp: true
    },
    titleTemplate: '%s | ' + core.settings.title,
    title: core.settings.titleLong,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: core.settings.description || '' },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: core.settings.appTitle || 'Sthlm Estate AB' },
      { hid: 'og:title', name: 'og:title', property: 'og:title', content: core.settings.appTitle || 'Sthlm Estate by SimHop' },
      { hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: core.settings.appTitle || 'Sthlm Estate by SimHop' },
      { name: 'format-detection', content: 'telephone=no' }
      // { name: 'google-site-verification', content: core.settings.googleSiteVerification },
      // { name: 'dmca-site-verification', content: core.settings.dmcaSiteVerification }
    ],
    script: [
      // { src: `${squareEndPoint}`, defer: 'defer' },
      // { src: core.settings.googleOptimizeKey ? `'https://www.googleoptimize.com/optimize.js?id=${core.settings.googleOptimizeKey}` : null }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: '/fonts/fonts.css',
        media: 'screen',
        rel: 'stylesheet'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vue-video-background',
      ssr: false
    },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/txt.js' },
    { src: '~/plugins/skrollTo.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', {
      ssr: true
    }]
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/i18n',
    '@nuxtjs/pwa',
    'nuxt-mail',
    ['cookie-universal-nuxt', { alias: 'secookie' }]
  ],

  i18n: {
    locales: [
      { code: 'sv', iso: 'sv-SE', file: 'sv/get.js', dir: 'ltr' },
      { code: 'en', iso: 'en-US', file: 'en/get.js', dir: 'ltr' }
    ],
    baseUrl: dev ? process.env.APP_URL_DEV : process.env.APP_URL_PROD,
    strategy: 'prefix_except_default',
    langDir: '~/locales/',
    defaultLocale: 'sv',
    vueI18n: {
      fallbackLocale: 'sv'
    }
  },

  mail: {
    message: core.mail.accounts,
    smtp: core.mail.smtp[core.mail.active]
  },

  loading: {
    // color: '#999999',
    // height: '10px'
  },

  axios: {
    // baseURL: !process.env.NODE_ENV === 'production' ? core.api.target : '/api/'
    // baseURL: core.api.target
    proxy: true
  },
  proxy: core.api.proxy,

  serverMiddleware: [
    bodyParser.json()
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    pwa: {
      manifest: {
        short_name: core.settings.appTitle,
        name3g: core.settings.titleLong,
        icons: [
          {
            src: '/veutify-logo.svg',
            type: 'image/svg+xml',
            sizes: '512x512'
          },
          {
            src: '/icon.png',
            type: 'image/png',
            sizes: '192x192'
          }
        ],
        start_url: '/?source=pwa',
        background_color: '#1e1e1e',
        display: 'standalone',
        scope: '/',
        theme_color: '#21dc82',
        shortcuts: [
          {
            name: 'About Sthlm Estate',
            short_name: 'Sthlm Estate',
            description: 'Find out more about Sthlm Estate',
            url: '/about?source=pwa',
            icons: [{ src: '/icon.png', sizes: '192x192' }]
          }
        ],
        description: core.settings.description
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      icons: 'mdi'
    },
    breakpoint: {
      thresholds: {
        xs: 0,
        sm: 600,
        md: 760,
        lg: 1300,
        xl: 1950
      },
      scrollBarWidth: 25
    },
    theme: {
      options: {
        customProperties: true,
        minifyTheme (css) {
          return process.env.NODE_ENV === 'production'
            ? css.replace(/[\r\n|\r|\n]/g, '')
            : css
        }
      },
      dark: core.settings.navigator.dark,
      themes: {
        light: {
          application: '#f1f1f1',
          sheet: '#FFFFFF',
          primary: core.theme.light.primary,
          accent: core.theme.light.accent,
          secondary: core.theme.light.secondary,
          info: core.theme.light.info,
          warning: core.theme.light.warning,
          error: core.theme.light.error,
          success: core.theme.light.success,
          us_red: '#BF0A30',
          us_blue: '#002868'
        },
        dark: {
          application: '#181818',
          sheet: '#191e20',
          primary: core.theme.dark.primary,
          accent: core.theme.dark.accent,
          secondary: core.theme.dark.secondary,
          info: core.theme.dark.info,
          warning: core.theme.dark.warning,
          error: core.theme.dark.error,
          success: core.theme.dark.success,
          us_red: '#d92044',
          us_blue: '#2164ef'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    },
    extend (config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
    },
    minifyCSS: true,
    minifyJS: true,
    html: {
      minifyCSS: false,
      minifyJS: false
    }
  }
}
