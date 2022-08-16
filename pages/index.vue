<template>
  <div class="homepage">
    <client-only>
      <video-background
        v-if="heroVideo"
        :src="heroVideo"
        :poster="heroPoster"
        :sources="[
          {src: heroVideo, res: 900, autoplay: true},
          {src: heroVideo, res: 638, autoplay: true, poster: heroPoster}
        ]"
        :style="heroBgStyle"
        :overlay="heroOverlay"
      >
        <div class="content-inner">
          <img :src="heroImage" class="logo-stacked-hero">
          <h1 :style="heroHeadingStyle">
            {{ videoHero.content.heading.label }}
          </h1>
          <v-btn
            large
            outlined
            rounded
            x-large
            :to="headerCtaTo"
            class="mt-6"
          >
            {{ videoHero.content.cta.label }}
          </v-btn>
        </div>
      </video-background>
    </client-only>
    <deus-products-row v-if="productRowEstates && productRowEstates.length" :estates="productRowEstates" />
    <deus-push-simple
      :published="solutionsPush.published"
      :dark="solutionsPush.dark"
      :dense="solutionsPush.dense"
      :show-icon="solutionsPush.showIcon"
      :show-heading="solutionsPush.showHeading"
      :show-text="solutionsPush.ShowText"
      :icon="solutionsPush.icon"
      :heading="solutionsPush.heading"
      :text="solutionsPush.text"
      :bg="{ active: false, url: null, position: 'top center' }"
      style="min-height: 350px;"
    />
    <!-- <deus-hero :settings="localSettings" :actions="actions" /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import videoHeroData from '@/data/cms/video-hero-home'
import solutionsPushSimple from '@/data/cms/solutions-push-simple-home.js'
import DeusPushSimple from '~/components/cms/DeusPushSimple.vue'
import DeusProductsRow from '~/components/cms/DeusProductsRow.vue'
import DeusHero from '~/components/cms/DeusHero.vue'
export default {
  name: 'IndexPage',
  // eslint-disable-next-line vue/no-unused-components
  components: { DeusPushSimple, DeusProductsRow, DeusHero },
  data () {
    return {
      videoHero: videoHeroData,
      solutionsPush: solutionsPushSimple,
      localSettings: {
        height: '500px',
        width: 'boxed' // full|boxed
      },
      actions: {
        show: true,
        cta1: {
          show: true,
          label: 'Läs mer om oss',
          to: '/om-oss',
          color: null, // default: '#ffffff'. Or example: var(--v-secondary-base)
          text: true,
          outlined: false,
          dark: true,
          tile: false,
          flat: false,
          raised: false,
          elevation: null,
          light: false,
          block: {
            desktop: false,
            mobile: true
          },
          floating: false,
          icon: false,
          showLoader: false,
          plain: false,
          rounded: true,
          size: {
            desktop: 'large', // 'x-small'|'small'|'default'|'large'|'x-large'
            mobile: 'default'
          },
          prepend: null,
          append: null
        },
        cta2: {
          show: false
        }
      },
      productRowEstates: null
    }
  },
  computed: {
    ...mapState({
      cookies: 'cookies'
    }),
    heroVideo () {
      return (this.videoHero && this.videoHero.video)
        ? this.$vuetify.breakpoint.smAndUp
          ? this.videoHero.video.desktop
          : this.videoHero.video.mobile
        : null
    },
    heroBgStyle () {
      return `${this.$vuetify.breakpoint.smAndDown ? 'top: -56px;' : 'top: -64px;'} ${this.videoHero.settings.maxHeight ? 'max-height: ' + this.videoHero.settings.maxHeight : ''}; height: ${this.videoHero.settings.fullHeight ? this.videoHero.settings.height.full : this.videoHero.settings.height.custom}; ${this.videoHero.settings.mono ? 'filter: grayscale();' : ''}`
    },
    heroPoster () {
      return this.$vuetify.breakpoint.smAndUp ? this.videoHero.poster.desktop : this.videoHero.poster.mobile
    },
    heroOverlay () {
      return this.$vuetify.theme.dark ? this.videoHero.video.overlay.dark : this.videoHero.video.overlay.light
    },
    heroImage () {
      return this.$vuetify.theme.dark ? `/${this.videoHero.content.image.dark}` : `/${this.videoHero.content.image.light}`
    },
    heroHeadingStyle () {
      return this.$vuetify.theme.dark
        ? `color: ${this.videoHero.content.heading.color.dark}`
        : `color: ${this.videoHero.content.heading.color.light}`
    },
    headerCtaTo () {
      const hash = this.videoHero.content.cta.samePage ? '#' : '/'
      return hash + this.videoHero.content.cta.to
    }
  },
  created () {
    this.setProductRowEstates()
  },
  methods: {
    setProductRowEstates () {
      if (!!this.cookies && !!this.cookies.response && this.cookies.response.value.length && !this.productRowEstates) {
        const response = [...this.cookies.response.value]
        const shuffled = response.sort(() => 0.5 - Math.random())
        this.productRowEstates = shuffled.slice(0, 3)
      }
    }
  }
}
</script>

<style lang="sass">
.logo-stacked-hero
  width: 70%
  max-width: 500px
  height: auto
  margin: 0 auto

.content-inner
  position: absolute
  width: 80%
  max-width: 650px
  top: 40%
  left: 50%
  transform: translate(-50%, -50%)
  text-align: center
  *
    text-align: center

.homepage
  position: relative
  .home-video
    position: absolute
    top: -65px
    left: 0
    width: 100%
    height: 100vh
    background-color: var(--v-secondary-base)

</style>
