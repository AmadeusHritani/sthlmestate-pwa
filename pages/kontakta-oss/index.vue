<template>
  <div
    class="page"
    :style="`background: linear-gradient(180deg, ${$vuetify.theme.dark ? 'rgba(0,0,0,.9), rgba(0,0,0, .5)' : 'rgba(255,255,255,.8) 60%, rgba(255,255,255, .5)'}), url('/sthlmestate-architecture-abstract-2.jpg');`"
    style=""
  >
    <v-container>
      <v-row align="center" justify="center" style="min-height:calc(100vh - 64px); text-align: center;;">
        <v-col order-lg="1" style="font-size:1.4rem;" cols="12" md="6">
          <p>
            Virebersvägen 20<br>
            169 30 Solna
          </p>
          <p>
            <a href="tel:08889360">08-889360</a><br>
            <a href="mailto:info@sthlmestate.se">info@sthlmestate.se</a>
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <estate-interest-form :dark="false" :dense="true" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DeusHero from '~/components/cms/DeusHero.vue'
export default {
  name: 'ContactPage',
  nuxtI18n: {
    paths: {
      sv: '/kontakta-oss',
      en: '/contact-us'
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { DeusHero }
}
</script>
