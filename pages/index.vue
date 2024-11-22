<template>
  <div class="homepage">
    <client-only>
      <deus-video-bg
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
        <div :style="showVideo ? '' : 'opacity: 0;'" class="content-inner" style="mix-blend-mode: screen;">
          <div style="width: 100%; mix-blend-mode: screen; display: block; margin: 0 auto;">
            <video
              :style="$vuetify.breakpoint.lgAndUp ? 'width: 70%;' : 'width: 100%;'"
              src="/STHLM_only_text.mp4"
              autoplay
              muted
              playsinline
              preload="metadata"
              style="height: auto; display: block; margin: 0 auto;"
            />
          </div>
        </div>
        <div v-if="videoHero.content.heading.active" style="position: absolute; bottom: 20%; left: 50%; transform: translateX(-50%); text-align: center; min-width: 350px">
          <h2 :style="heroHeadingStyle" class="my-2" style="mix-blend-mode: normal;">
            {{ videoHero.content.heading.label }}
          </h2>
          <v-btn
            x-large
            tile
            color="white"
            outlined
            elevation="0"
            :to="headerCtaTo"
            class="mt-2"
            style="mix-blend-mode: normal;"
          >
            {{ videoHero.content.cta.label }}
          </v-btn>
        </div>
        <span v-if="videoHero.settings.showContinue" class="continue" style="bottom: 10px;">
          <span
            style="text-decoration:none; display:block; cursor: pointer;"
            @click="$skrollTo(target, root, $vuetify.breakpoint.smAndDown, null, null,)"
          >
            <v-icon x-large style="font-size:3rem; color: white">
              mdi-arrow-down
            </v-icon>
          </span>
        </span>
      </deus-video-bg>
      <v-divider />
    </client-only>
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
      :max-width="'100%'"
      :bg="{ active: false, url: null, position: 'top center' }"
      :heading-width="{ desktop: '350px', mobile: '300px' }"
      :actions="actions"
      style="min-height: 350px;"
    />
    <v-divider />
    <deus-products-row v-if="productRowEstates && productRowEstates.length" :estates="productRowEstates" />
    <v-divider />
    <mail-interest-form />
    <!--    <br>-->
    <!--    dddd-->
    <!--    <br>-->
    <!--    <br>-->
    <!--    <a-->
    <!--      style="font-weight: bold; text-decoration: none; padding: 10px 20px; border: thin solid #777777;"-->
    <!--      @click.prevent="trigger()"-->
    <!--    >-->
    <!--      PUBLISH STHLM ESTATE APP-->
    <!--    </a>-->
    <!--    <br>-->
    <!--    <br>-->
    <!--    dddd-->
    <!--    <br>-->
    <!--    <br>-->
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex'
import axios from 'axios'
import videoHeroData from '@/data/cms/video-hero-home'
import solutionsPushSimple from '@/data/cms/solutions-push-simple-home.js'
import DeusPushSimple from '~/components/cms/DeusPushSimple.vue'
import DeusProductsRow from '~/components/cms/DeusProductsRow.vue'
import DeusHero from '~/components/cms/DeusHero.vue'
import DeusVideoBg from '~/components/cms/DeusVideoBg/index.vue'
import MailInterestForm from '~/components/MailInterestForm'
export default {
  name: 'IndexPage',
  // eslint-disable-next-line vue/no-unused-components
  components: { DeusVideoBg, MailInterestForm, DeusPushSimple, DeusProductsRow, DeusHero },
  data () {
    return {
      videoHero: videoHeroData,
      showVideo: false,
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
          text: false,
          outlined: true,
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
          showLoader: true,
          plain: false,
          rounded: false,
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
      }
    }
  },
  computed: {
    ...mapState({
      cookies: 'cookies',
      productRowEstates: 'productRowEstates'
    }),
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
    elements () {
      return {
        target: {
          dev: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[2] &&
          !!this.$nuxt.$children[2].$refs && !!this.$nuxt.$children[2].$refs['deus-application']
            ? this.$nuxt.$root.$children[2].$children[0].$children[0].$children[0].$children[0].$children[0]
            : this.$nuxt.$root.$children[1].$children[0].$children[0].$children[0].$children[0].$children[0],

          prod: this.$nuxt && this.$nuxt.$children && this.$nuxt.$children.length && !!this.$nuxt.$children[1] &&
          !!this.$nuxt.$children[1].$refs && this.$nuxt.$children[1].$refs['deus-application']
            ? this.$nuxt.$children[1].$refs['deus-application'].$children[0].$children[0].$children[0].$children[0]
            : this.$nuxt.$children[2].$refs['deus-application'].$children[0].$children[0].$children[0].$children[0]
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
    heroVideo () {
      return (this.videoHero && this.videoHero.video)
        ? this.$vuetify.breakpoint.smAndUp
          ? this.videoHero.video.desktop
          : this.videoHero.video.mobile
        : null
    },
    heroBgStyle () {
      return `${this.$vuetify.breakpoint.smAndDown ? 'top: -56px;' : 'top: -64px;'} ${this.videoHero.settings.maxHeight ? 'max-height: ' + this.videoHero.settings.maxHeight : ''}; height: ${this.videoHero.settings.fullHeight ? this.$vuetify.breakpoint.smAndDown ? `calc(${this.videoHero.settings.height.full} - 56px)` : this.videoHero.settings.height.full : this.videoHero.settings.height.custom}; ${this.videoHero.settings.mono ? 'filter: grayscale();' : ''}; margin-bottom: ${this.$vuetify.breakpoint.smAndDown ? '-56px' : '-64px'};`
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
    setTimeout(() => {
      this.showVideo = true
    }, 2000)
  },
  mounted () {
    setTimeout(() => {
      this.showVideo = true
    }, 900)
  },
  methods: {
    async trigger () {
      const data = {
        name: 'Objekt',
        id: 'OBJ19854_1958618774',
        event: 'Update',
        type: 'Estate',
        subtype: 'HousingCooperative',
        customerId: 'M19854',
        chainId: null,
        tenantId: 'T1022',
        data: {
          status: 'ForSale'
        }
      }
      const config = {
        method: 'post',
        url: 'https://jenkins.sthlmestate.se/generic-webhook-trigger/invoke?token=d7b528fa5d11f60b2409e60b48c5d531',
        data,
        withCredentials: false
      }
      await axios(config)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="sass">
.logo-stacked-hero
  width: 100%
  max-width: 500px
  height: auto
  margin: 0 auto

.content-inner
  position: absolute
  width: 100%
  //max-width: 650px
  top: 50%
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
