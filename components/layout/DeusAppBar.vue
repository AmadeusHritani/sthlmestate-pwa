<template>
  <v-app-bar
    :clipped-left="clipped"
    :fixed="sticky"
    :app="sticky"
    :elevation="sticky && threshold && !$vuetify.theme.dark && !isDarkAppBar && !transparent ? 3 : 0"
    :style="getAppBarStyle"
    :class="$vuetify.theme.dark || (isDarkAppBar && transparent) ? 'is-dark' : ''"
    :dark="$vuetify.theme.dark || (isDarkAppBar && transparent)"
  >
    <v-container class="d-flex pa-0">
      <v-toolbar-title
        v-show="true"
        class="ps-0"
        style="display: contents;"
      >
        <div
          class="logo-link"
          title="Sthlm Estate"
          @click="$router.push(`/${$i18n.locale === 'en' ? 'en' : ''}`)"
        >
          <img
            alt="Sthlm Estate"
            title="Sthlm Estate"
            class="logo"
            :src="$vuetify.theme.dark || (isDarkAppBar && transparent) ? '/logo-linear-dark-nomargin.svg' : '/logo-linear-light-nomargin.svg'"
          >
        </div>
      </v-toolbar-title>
      <v-spacer class="d-none d-md-flex" />
      <v-btn
        v-for="(item, index) in deusNav.top.items"
        :key="index"
        :to="$txt(item.slug)"
        :title="$txt(item.title)"
        :exact="index === 0"
        :dark="$vuetify.theme.dark || (isDarkAppBar && !transparent)"
        router
        text
        class="align-self-center d-none d-md-flex menu-link"
      >
        {{ $txt(item.label) }}
      </v-btn>
      <v-spacer />
      <!-- <v-btn
        icon
        :color="sticky ? 'success' : 'default'"
        class="d-none d-sm-block"
        @click.stop="$emit('toggle-sticky')"
      >
        <v-icon>mdi-align-vertical-top</v-icon>
      </v-btn> -->
      <div
        v-show="searchActive"
        :class="searchWrapperClasses"
      >
        <estate-search-form :active="searchActive" @search-active="searchActive = $event" />
      </div>
      <v-btn
        v-if="!searchActive"
        icon
        class="search-btn before-15bg"
        @click.stop="searchActive = true"
      >
        <v-icon>mdi-{{ searchActive ? 'close' : 'magnify' }}</v-icon>
      </v-btn>
      <!--      LANGUAGE SWITCHER-->
      <!--      *****************-->
      <!--      <v-btn-->
      <!--        :to="$i18n.locale === 'sv' ? switchLocalePath('en') : switchLocalePath('sv')"-->
      <!--        icon-->
      <!--        class="align-self-center d-none d-md-flex text-uppercase before-15bg"-->
      <!--      >-->
      <!--        <v-avatar color="transparent">-->
      <!--          <span class="text-h6 bold">-->
      <!--            {{ $i18n.locale === 'en' ? 'sv' : 'en' }}-->
      <!--          </span>-->
      <!--        </v-avatar>-->
      <!--      </v-btn>-->
      <!--      *****************-->
      <v-btn
        icon
        class="d-none d-sm-block before-15bg"
        @click.stop="dark = !dark"
      >
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-app-bar-nav-icon
        class="d-md-none"
        @click.stop="$emit('toggle-drawer')"
      />
    </v-container>
  </v-app-bar>
</template>

<script>
/* eslint-disable no-console,no-unused-vars */
import { mapState, mapActions } from 'vuex'
import { normalizeText } from 'normalize-text'
// import core from '@/config/core'
export default {
  name: 'DeusAppBar',
  props: {
    isDark: {
      type: String,
      default: 'npd'
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    hasHero: {
      type: Boolean,
      default: true
    },
    clipped: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: true
    },
    deusNav: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      dark: this.cookies ? this.cookies.settings.value.theme.dark : false,
      transparent: false,
      threshold: false,
      searchActive: false,
      // searchTerm: null,
      style: '',
      searchRules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      search: 'search',
      cookies: 'cookies'
    }),
    settings () {
      return this.cookies && this.$secookie && this.$secookie.get(this.cookies.settings.name, { fromRes: true })
        ? JSON.parse(this.$secookie.get(this.cookies.settings.name, { fromRes: true }))
        : null
    },
    // searchActive () {
    //   return this.search.active
    // },
    searchTerm () {
      return this.search.term
    },
    isDarkAppBar () {
      return this.$vuetify.theme.dark || (this.$route && this.$route.name && this.$route.name.includes('index') && this.offsetTop < 100)
      // this.$route.name.includes('om-oss') || this.$route.name.includes('about-us'))
      // this.$route.path === '/bostader' || this.$route.path === '/en/estates')
    },
    getAppBarStyle () {
      let style = ''
      if (this.hasHero) {
        style += this.transparent ? 'background-color: transparent !important;' : ''
        // style += !this.transparent ? 'box-shadow: 0 20px 20px rgba(0,0,0,.5) !important;' : ''
      }
      return style
    },
    showLogo () {
      const sm = this.$vuetify.breakpoint.smAndDown
      return !(sm && this.searchActive)
    },
    searchWrapperClasses () {
      let classes = 'search-wrapper align-self-center d-flex'
      if (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.smAndDown) {
        classes += ' mobile'
      }
      classes += this.searchActive ? ' active' : ''
      classes += this.$vuetify.theme.dark || this.isDarkAppBar ? ' dark' : ' light'
      classes += this.$route.name && (this.$route.name.includes('bostader-estate' || this.$route.name.includes('index')))
        ? ' nobg'
        : ''
      return classes
    }
  },
  watch: {
    // search: {
    //   deep: true,
    //   immediate: false,
    //   handler (search) {
    //     if (search.term && search.term.length > 2) {
    //       const term = normalizeText([search.term.toLowerCase().trimEnd()])
    //       this.searchActive = true
    //       this.$router.push(`?term=${term}`)
    //     } else {
    //       // this.searchActive = false
    //       // this.$router.push('')
    //     }
    //   }
    // },
    dark (dark) {
      this.$vuetify.theme.dark = dark
      if (this.settings && dark !== this.settings.theme.dark) {
        this.$vuetify.theme.dark = dark
        this.$secookie.set(
          this.cookies.settings.name,
          JSON.stringify({ theme: { dark }, sticky: true }),
          {
            path: '/',
            maxAge: 60 * 5
          }
        )
        this.updateSettings({
          name: this.cookies.settings.name,
          value: { theme: { dark }, sticky: true },
          path: '/',
          maxAge: 60 * 5,
          createdAt: new Date().toLocaleDateString()
        })
      }
    },
    '$route' (route) {
      this.transparent = route && route.name ? route.name.includes('bostader-estate') || route.name.includes('index') : false
    },
    // searchActive (active) {
    //   this.updateSearch({
    //     active,
    //     term: this.searchTerm
    //   })
    // },
    // searchTerm (term) {
    //   this.updateSearch({
    //     active: this.searchActive,
    //     term
    //   })
    //   this.$emit('search-term', term)
    // },
    threshold (threshold) {
      // this.style = !threshold ? 'box-shadow: none !important;' : ''
    },
    offsetTop (offsetTop) {
      // if (this.$route && this.$route.name && (this.$route.name.includes('bostader-estate') || this.$route.name.includes('index'))) {
      if (offsetTop > 100) {
        this.transparent = false
        this.threshold = true
      } else {
        this.transparent = true
        this.threshold = false
        this.searchActive = false
      }
      // }
    }
  },
  created () {
    this.dark = this.settings ? this.settings.theme.dark : this.dark
    this.transparent = this.$route && this.$route.name ? this.$route.name.includes('bostader-estate') || this.$route.name.includes('index') : false
  },
  methods: {
    ...mapActions({
      updateSearch: 'updateSearch',
      updateSettings: 'setSettingsCookie'
    }),
    focusOut () {
      this.searchActive = false
    },
    toggleSearch () {
      if (!this.searchActive) {
        // this.searchActive = true
        this.updateSearch({
          active: true,
          term: this.term
        })
      }
    }
    // doSearch () {
    //   // Do search
    // },
    // clearTerm () {
    //   this.term = null
    // }
  }
}
</script>

<style scoped lang="scss">

.bold {
  font-weight: 600;
}

.before-nobg {
  &::before, &:hover ::before {
    background-color: transparent !important;
  }
}
.before-15bg {
  &:hover:before {
    opacity: .15 !important;
  }
}
.search-btn {
  z-index: 2;
}
.search-wrapper {
  transform: scaleX(0);
  width: 0;
  transform-origin: 100%;
  opacity: 0;
  overflow: hidden;
  transition: all .2s ease;
  // transition-delay: .5s;
  // display: none;
  form { width: 100%; }
  &.mobile {
    transition: all .3s ease-in-out;
    transform: translate3d(0, -500px, 0);
    transform-origin: 0%;
    position: absolute;
    top: 64px;
    left: 0;
    padding: 0 10px;
    &.active {
      width: 100%;
      display: block;
      transform: translate3d(0, 0, 0);
    }
    &.dark {
      background-color: #272727;
      * {
        color: #FFFFFF !important;
      }
    }
    &.light {
      background-color: var(--v-secondary-base);
    }
    &.nobg {
      background-color: transparent !important;
    }
    // box-shadow: none;
    // background-color: var(--v-secondary-base);
  }
  &.active {
    width: auto;
    opacity: 1;
    transform: scaleX(1);
  }
  .search-input {
    border: 0 transparent !important;
    background: none !important;
    // * {
    //   border: unset !important;
    //   border-width: 0 !important;
    //   border-color: transparent !important;
    // }
    &.v-input--is-focused,
    &.v-input--is-focused * {
      // border: unset !important;
      // border-width: 0 !important;
      // border-color: transparent !important;
      border-radius: 0 !important;
      // .v-input__slot, .v-input__control {
        // border-radius: 30px;
        // border-width: 0 !important;
        // border-color: transparent !important;
        // background: transparent !important;
      // }
    }
  }
}

.v-btn.menu-link {
  transition: all .2s ease;
  background: none !important;
  background-color: transparent !important;
  border-radius: 0;
  .v-ripple__container {
    display: none;
  }
  &:before {
    width: 0;
    opacity: 1;
    background: none !important;
    background-color: transparent !important;
    border-radius: 0;
    margin: 0 auto;
    top: 0;
    bottom: 0;
    color: inherit;
    transition: width .2s ease;
    transition-delay: .2s;
    // animation: line .5s linear forwards;
  }
  &:hover {
    transition: width 5s ease;
  }
  &:hover::before {
    border-bottom: 1px solid var(--v-primary-base);
    width: calc(100% - 32px);
    opacity: 1;
  }
}

.theme--light.menu-link.v-btn--active:hover::before,
.theme--light.menu-link.v-btn--active::before {
    border-bottom: 2px solid var(--v-primary-base);
    width: calc(100% - 32px);
    opacity: 1;
}
.theme--dark.menu-link.v-btn--active:hover::before,
.theme--dark.menu-link.v-btn--active::before {
    border-bottom: 2px solid var(--v-secondary-base);
    width: calc(100% - 32px);
    opacity: 1;
}
.theme--light.v-application {
  .v-btn.menu-link {
    color: var(--v-primary-base);
  }
}
.theme--dark.v-application,
.is-dark {
  .v-btn.menu-link {
    color: var(--v-secondary-base);
  }
}
// .theme--light.v-btn:hover:before {
//   opacity: 1 !important;
// }

.v-app-bar.v-app-bar {
    // position: fixed;
    // top: 0;
    z-index: 5;
    * {
      transition: transform .2s ease;
    }
}

.is-dark {
  .v-btn.menu-link {
    color: white !important;
  }
}

@media (max-width: 500px) {
  .search-wrapper {
    &.mobile {
      top: 56px;
    }
  }
}

@keyframes line {
  from {
    width:0%;
  }
  to {
    width: calc(100% - 32px);
  }
}
</style>
