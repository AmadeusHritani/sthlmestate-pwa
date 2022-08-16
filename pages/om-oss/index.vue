<template>
  <div class="page" :style="`background: linear-gradient(180deg, ${$vuetify.theme.dark ? 'rgba(0,0,0,.9), rgba(0,0,0, .5)' : 'rgba(255,255,255,.8) 70%, rgba(255,255,255, .5)'}), url('/about-2.jpg');`">
    <v-container>
      <v-row align="center" justify="center" style="height:calc(100vh - 64px); text-align: center;;">
        <v-col cols="12" md="8">
          <v-card tile flat color="transparent">
            <h1 style="font-size:3rem; text-transform: uppercase; font-weight: 500;">
              Hitta ditt hem hos oss
            </h1>
            <div style="font-size:1.3rem; margin-top: 25px;">
              Med ett nytt tänk och diversifierade portfölj av objekt och kunder kan vi hjälpa dig att hitta skräddarsydda lösningar anpassade efter just din situation.
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import heroAbout1 from '~/data/cms/hero-about-1'
export default {
  name: 'AboutPage',
  nuxtI18n: {
    paths: {
      sv: '/om-oss', // -> accessible at /about-us (no prefix since it's the default locale)
      en: '/about-us' // -> accessible at /en/about-us (no prefix since it's the secondary locale)
    }
  },
  data () {
    return {
      localSettings: heroAbout1
    }
  },
  created () {
    // eslint-disable-next-line no-console
    // console.log(this.$i18n('settings'))
    // console.log(this.$txt(this.text))
  }
}
</script>
