<template>
  <v-app id="deus-application" ref="deus-application" v-scroll.self="onScroll" class="deus-application">
    <deus-app-drawer
      v-if="$vuetify.breakpoint.mdAndDown"
      :navigator="navigator"
      :drawer="drawer"
      @toggle-drawer="drawer = $event"
    />
    <deus-app-bar
      :navigator="navigator"
      :sticky="sticky"
      :offset-top="offsetTop"
      :clipped="clipped"
      has-hero
      @toggle-sticky="sticky = !sticky"
      @toggle-drawer="drawer = !drawer"
    />
    <v-main
      ref="main"
    >
      <v-scroll-x-transition>
        <Nuxt />
      </v-scroll-x-transition>
    </v-main>
    <v-footer
      paddless
    >
      <v-container class="text-center">
        <span>Sthlm Estate &copy; {{ new Date().getFullYear() }}</span>
        <span v-if="$nuxt.isOffline">You are offline</span>
      </v-container>
    </v-footer>
    <v-overlay
      :value="loading"
      :color="$vuetify.theme.dark ? 'black' : 'white'"
      opacity="0.9"
    >
      <v-progress-circular :color="$vuetify.theme.dark ? 'white' : 'black'" width="5" indeterminate size="30" />
    </v-overlay>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import { mapState, mapActions } from 'vuex'
import { getCurrentPage } from '@/functions/helpers'
export default {
  name: 'DefaultLayout',
  components: {
    DeusAppBar: () => import('@/components/layout/DeusAppBar.vue'),
    DeusAppDrawer: () => import('@/components/layout/DeusAppDrawer.vue')
  },
  scrollToTop: true,
  data () {
    return {
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
    return this.$nuxtI18nHead()
  },
  computed: {
    ...mapState({
      navigator: 'navigator',
      loading: 'loading',
      search: 'search'
    }),
    appStyle () {
      let style = ''
      if (this.$route.name.includes('fastigheter-estate')) {
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
    }
  },
  watch: {
    $route (to) {
      this.currentPage = getCurrentPage(to, this.navigator.top.items)
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
    // console.log(this.$root)
    this.drawer = false
    this.sticky = this.navigator.sticky
    this.clipped = this.navigator.clipped
    this.fixed = this.navigator.fixed
    this.right = this.navigator.right
    this.title = this.navigator.title
    this.currentPage = getCurrentPage(this.$route, this.navigator.top.items)
    this.updatePage(this.currentPage)
  },
  mounted () {
    // this.setRootEl(this.client)
    if (this.offsetTop !== 0) {
      this.scrollToTopOfApp()
    }
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
.page {
  background-position: top center;
  background-size:cover !important;
  margin-top: -64px;
  min-height: calc(100vh - 56px);
}
.form-heading {
  font-size: 1.8rem;
  font-weight: 300;
  font-family: $body-font-family;
}

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
  font-family: Aleo, Serif !important;
  font-weight: normal;
  line-height: 1.35;
  letter-spacing: .05rem;
  background-color: #f9f9f9;
}

.theme--light.v-application {
    background: #f4f4f4;
    color: #111111;
}

.theme--dark.v-application {
    background: #0a0a0a;
    color: #FFFFFF;
}

// h1, h2, h3, h4, h5 {
//   font-family: Barlow, Arial;
// }

h1, h2 {
  font-weight: 300;
  font-family: Barlow, Arial;
}

h1 {
  font-size: 1.8rem;
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
// .theme--dark.v-footer {
//     background-color: #0e1017 !important;
//     color: #eae6da;
// }
// .theme--light.v-footer {
//     background-color: transparent !important;
//     color: var(--v-primary-darken4);
// }

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
  .page {
    background-position: center center;
    background-size:cover !important;
    margin-top: -56px;
    padding-top: 156px;
    padding-bottom: 15px;
    min-height: 100vh;
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
    max-width: 1280px !important;
  }
}
</style>
