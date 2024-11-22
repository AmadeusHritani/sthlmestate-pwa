<template>
  <v-app id="deus-application" ref="deus-application" v-scroll.self="onScroll" class="deus-application">
    <deus-app-drawer
      v-show="drawer"
      :deus-nav="deusNav"
      :drawer="drawer"
      @toggle-drawer="drawer = $event"
    />
    <deus-app-bar
      :deus-nav="deusNav"
      :sticky="sticky"
      :offset-top="offsetTop"
      :clipped="clipped"
      :has-hero="$route && $route.name && ($route.name.includes('bostader-estate') || $route.name.includes('index'))"
      @toggle-sticky="sticky = !sticky"
      @toggle-drawer="drawer = !drawer"
    />
    <v-main
      ref="main"
      :class="overlay ? 'd-none' : ''"
      :style="search.active && $vuetify.breakpoint.smAndDown && $route.name !== 'index' && $route.name !== 'bostader-estate' ? 'margin-top: 40px;' : ''"
    >
      <v-scroll-x-transition>
        <Nuxt />
      </v-scroll-x-transition>
    </v-main>
    <div v-if="offsetTop > 600" class="sthlmestate-to-top">
      <v-btn
        :title="$txt('ui.back-to-top')"
        class="mx-2"
        icon
        dark
        x-large
        color="primary"
        @click="client ? $skrollTo(root, root, $vuetify.breakpoint.smAndDown, -10000, null,) : false"
      >
        <v-icon dark x-large>
          mdi-format-vertical-align-top
        </v-icon>
      </v-btn>
    </div>
    <deus-footer />
    <v-overlay
      :value="overlay"
      :color="$vuetify.theme.dark ? 'black' : 'white'"
      opacity="1"
    >
      <v-progress-circular :color="$vuetify.theme.dark ? 'white' : 'black'" width="5" indeterminate size="30" />
    </v-overlay>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import { mapState, mapActions } from 'vuex'
import { getCurrentPage } from '@/functions/helpers'
import DeusFooter from '~/components/cms/DeusFooter'
import core from '~/config/core'
export default {
  name: 'DefaultLayout',
  components: {
    DeusFooter,
    DeusAppBar: () => import('@/components/layout/DeusAppBar.vue'),
    DeusAppDrawer: () => import('@/components/layout/DeusAppDrawer.vue')
  },
  scrollToTop: true,
  data () {
    return {
      overlay: true,
      rootEl: null,
      offsetTop: 0,
      sticky: true,
      clipped: true,
      drawer: false,
      fixed: true,
      right: true,
      title: 'Sthlm Estate by Deus',
      currentPage: {},
      paths: []

    }
  },
  head () {
    return {
      title: this.estateDetails && this.estateDetails.baseInformation && this.estateDetails.baseInformation.objectAddress
        ? `${this.estateDetails.baseInformation.objectAddress.streetAddress}, ${this.estateDetails.baseInformation.objectAddress.municipality} ${this.estateDetails.baseInformation.objectAddress.zipCode}`
        : core.settings.titleLong,
      meta: [
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'Progressive Web App'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.estateDetails && this.estateDetails.baseInformation && this.estateDetails.baseInformation.objectAddress
            ? `${this.estateDetails.baseInformation.objectAddress.streetAddress}, ${this.estateDetails.baseInformation.objectAddress.municipality} ${this.estateDetails.baseInformation.objectAddress.zipCode}`
            : core.settings.titleLong
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: core.settings.baseUrl.prod + (this.$route && this.$route.fullPath && !this.$route.name.includes('index') ? this.$route.fullPath : '')
        },
        {
          hid: 'description',
          name: 'description',
          content: `${core.settings.titleLong}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${core.settings.titleLong}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: core.settings.baseUrl.prod + (this.currentEstate && this.currentEstate.urlThumbnail
            ? this.currentEstate.urlThumbnail.replace('thumb', 'hd')
            : 'default-social-image.png')
        }
      ]
    }
  },
  computed: {
    ...mapState({
      deusNav: 'deusNav',
      search: 'search',
      loading: 'loading'
    }),
    appStyle () {
      let style = ''
      if (this.$route.name.includes('bostader-estate')) {
        style += 'margin-bottom: 100vh;'
      }
      return style
    },
    client () {
      return !process.server
    },
    elements () {
      return {
        target: {
          dev: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[2] &&
          !!this.$nuxt.$children[2].$refs && !!this.$nuxt.$children[2].$refs['deus-application']
            ? this.$nuxt.$root.$children[2].$children[0].$children[0].$children[0].$children[0].$children[0]
            : this.$nuxt.$root.$children[1].$children[0].$children[0].$children[0].$children[0].$children[0],

          prod: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[1] &&
          !!this.$nuxt.$children[1].$refs && this.$nuxt.$children[1].$refs['deus-application']
            ? this.$nuxt.$children[1].$refs['deus-application']
            : this.$nuxt.$children[2].$refs['deus-application']
        },
        root: {
          dev: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[2] &&
          !!this.$nuxt.$children[2].$refs && !!this.$nuxt.$children[2].$refs['deus-application']
            ? this.$nuxt.$children[2].$refs['deus-application']
            : this.$nuxt.$children[1].$refs['deus-application'],

          prod: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[1] &&
          !!this.$nuxt.$children[1].$refs && this.$nuxt.$children[1].$refs['deus-application']
            ? this.$nuxt.$children[1].$refs['deus-application']
            : this.$nuxt.$children[2].$refs['deus-application']
        }
      }
    },
    target () {
      return process.env.NODE_ENV === 'production'
        ? this.elements.target.prod.$el
        : this.elements.target.dev.$el
    },
    root () {
      return process.env.NODE_ENV === 'production'
        ? this.elements.root.prod.$el
        : this.elements.root.dev.$el
    },
    vuetify () {
      return this.$vuetify
    }
  },
  watch: {
    $route (to) {
      this.currentPage = getCurrentPage(to, this.deusNav.top.items)
      this.updatePage(this.currentPage)
      this.scrollToTopOfApp()
    },
    // rootEl () {
    //   this.scrollToTopOfApp()
    // },
    client (client) {
      // this.setRootEl(client)
    }
  },
  created () {
    setTimeout(() => {
      this.overlay = false
    }, this.$route && this.$route.name && !this.$route.name.includes('bostader-estate') ? 900 : 0)
    this.drawer = false
    this.sticky = this.deusNav.sticky
    this.clipped = this.deusNav.clipped
    this.fixed = this.deusNav.fixed
    this.right = this.deusNav.right
    this.title = this.deusNav.title
    this.currentPage = getCurrentPage(this.$route, this.deusNav.top.items)
    this.updatePage(this.currentPage)
    if (this.client && window) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.dataLayer = window.dataLayer || []
      // eslint-disable-next-line nuxt/no-globals-in-created
      function gtag () { window.dataLayer.push(arguments) }
      gtag('js', new Date())
      gtag('config', 'G-4D4GTXS2PV')
    }
  },
  mounted () {
    // this.setRootEl(this.client)
    // if (this.offsetTop !== 0) {
    //   this.scrollToTopOfApp()
    // }
    // setTimeout(() => {
    //   this.loading = false
    // }, 650)
  },
  methods: {
    ...mapActions({
      updatePage: 'updatePage',
      updateLoading: 'updateLoading',
      updateSearch_active: 'updateSearch_active'
    }),
    setRootEl () {
      this.rootEl = process.env.NODE_ENV === 'production'
        ? this.deusAppElement.prod.$el
        : this.deusAppElement.dev.$el
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    scrollToTopOfApp () {
      if (process.client && window && this.root) {
        // console.log(this.rootEl.$children)
        this.root.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style lang="scss">
html {
  overflow: hidden !important;
}
a:link, a:visited {
  text-decoration: none;
}
a:hover:not(.v-btn) {
  text-decoration: underline !important;
  text-decoration-thickness: 0.5px !important;
  text-underline-offset: 2px;
}
.sthlmestate-to-top {
  z-index: 5;
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.page {
  background-position: top center;
  background-size:cover !important;
  margin-top: -64px;
  min-height: calc(100vh - 64px - 56px);
  &.no-bg {
    padding-top: 0;
    margin-top: 0;
    min-height: auto;
  }
}
//.form-heading {
//  font-weight: 300;
//  //margin-bottom: 10px;
//  //padding-bottom: 10px;
//  //border-bottom: thin solid rgba(140,140,140, .7);
//  font-family: $body-font-family;
//}

.deus-application {
  position: fixed;
  height: 100vh !important;
  width: 100vw;
  overflow-y: auto;
  line-height: 1.35;
}
.v-application p {
  line-height: 1.45;
}
body,
.v-application {
  font-family: $body-font-family;
  line-height: 1.35;
  letter-spacing: .05rem;
  background-color: #f9f9f9;
  font-weight: 300;
}

.theme--light.v-application {
    //background: #f8f8f8;
    color: #111111;
}

.theme--dark.v-application {
    background: #0a0a0a;
    color: #FFFFFF;
}

// h1, h2, h3, h4, h5 {
//   font-family: Barlow, Arial;
// }

h1, h2, h3 {
  font-family: Aleo, Serif;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 10px;
}

h1 {
  font-size: 2.3rem;
}

h2 {
  font-size: 2rem;
}

.v-btn,
footer {
  font-family: Barlow, Arial;
}

.bold {
  font-weight: 600;
}

// .theme--light.v-btn.v-btn--has-bg:hover {
//   background-color: var(--v-primary-base);
// }

// .theme--light.v-btn:hover {
//     color: rgba(255, 255, 255, 0.87);
// }

.logo-link {
  cursor: pointer;
  display: inherit;
  max-height: 50px;
  max-width: 120px;
  align-self: center;
  position: relative;
  .logo {
    width: 100%;
    height: auto;
  }
}
.container.d-flex {
  img {
    max-height: 50px;
    max-width: 250px;
    align-self: center;
  }
}

.primary-color {
  color: var(--v-primary-base);
}

.search-input {
  .v-input__slot, .v-input__control,
  .theme--light.v-text-field--solo > .v-input__control > .v-input__slot,
  .theme--dark.v-text-field--solo > .v-input__control > .v-input__slot,
  .theme--light.v-text-field--solo > .v-input__control,
  .theme--dark.v-text-field--solo > .v-input__control {
    // border-radius: 30px;
    background-color: rgba(0,0,0,0) !important;
    padding-left: 0 !important;
  }
}
.search-input {
  .v-input__slot {
    border-radius: 0 !important;
    border-bottom: solid thin var(--v-primary-base) !important;
  }
}
.v-footer {
  padding-bottom: 2rem !important;
}
 //.theme--dark.v-footer {
 //    background-color: #0e1017 !important;
 //    color: #eae6da;
 //}
 .theme--light.v-footer {
     background-color: var(--v-secondary-base) !important;
     color: var(--v-primary-darken4);
 }

.theme--light.v-app-bar.v-toolbar.v-sheet {
    background-color: var(--v-secondary-base) !important;
}

// .theme--dark.v-card {
//     background-color: var(--v-primary-base) !important;
//     color: #eae6da;
// }

// .theme--dark.v-application {
//     background: var(--v-primary-darken3);
//     background-image: initial;
//     background-position-x: initial;
//     background-position-y: initial;
//     background-size: initial;
//     background-repeat: initial;
//     background-attachment: initial;
//     background-origin: initial;
//     background-clip: initial;
//     background-color: var(--v-primary-darken3);
//     color: #eae6da;
// }

@media (max-width: 550px) {
  h1 {
    font-size: 1.6rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  .page {
    background-position: center center;
    background-size:cover !important;
    margin-top: -56px;
    padding-top: 156px;
    padding-bottom: 15px;
    min-height: 100vh;
    &.no-bg {
      // padding-top: 15px;
       margin-top: 65px;
      min-height: auto;
    }
  }
}

@media (max-width: 992px) {
  .container.d-flex {
    img {
      max-height: 35px;
      align-self: center;
      max-width: fit-content;
    }
  }
}
@media (min-width: 1904px) {
  .container {
    max-width: 1100px !important;
  }
}
</style>
