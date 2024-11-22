<template>
  <div
    class="page"
    :class="bgMode ? '' : 'no-bg'"
    :style="pageStyle"
    style=""
  >
    <div style="background-image: url('/light-brown-couch.jpg'); background-size: cover; background-position: center center;">
      <v-container>
        <v-row
          align="center"
          justify="space-around"
          align-content-md="center"
          :style="$vuetify.breakpoint.smAndDown ? 'min-height:calc(100vh - 56px); margin-left: 0; margin-right: 0;' : 'min-height:calc(100vh - 64px); margin-left: 0; margin-right: 0; margin-bottom: 0; margin-top: 0;'"
        >
          <v-col cols="12" md="5" class="text-center">
            <img src="/icon-white-trans-shadow.png" alt="About Sthlm Estate" style="width:100%;height:auto;max-width: 200px;">
          </v-col>
          <v-col cols="12" md="7">
            <v-card tile flat color="transparent" class="my-8 white--text" :style="$vuetify.breakpoint.smAndDown ? 'text-align: center;' : ''">
              <h1 style="font-size:3rem; text-transform: uppercase; font-weight: 500; text-shadow: 0 5px 8px rgba(0,0,0,.3);">
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
    <div :style="$vuetify.theme.dark ? 'background-color: var(--v-primary-darken4);' : 'background-color: var(--v-secondary-base);'">
      <v-row
        align="center"
        justify="center"
        style="min-height:500px; text-align: center;"
        :style="$vuetify.breakpoint.smAndDown ? 'margin-left: 0; margin-right: 0;' : 'margin-left: 0; margin-right: 0; margin-bottom: 0; margin-top: 0;'"
      >
        <v-col cols="12" md="7" lg="6">
          <div>
            <h2 class="mb-5 block-title">
              Vi vägleder dig med rätt kompetens
            </h2>
            <p>
              STHLM ESTATE är ett hem för drivna mäklare som inte väntar i hopp om resultat utan arbetar målmedvetet för att skapa resultat. Vårt främsta fokus är att lyssna och skräddarsy varje enskild kunds vision och drömmar.<br>
              Det är idén bakom STHLM ESTATE.
            </p>
            <p>
              För oss är alla bitar i processen lika viktiga, från första mötet till kontraktsskrivning. Vi finns här för dig genom hela processen och erbjuder personlig service för att du ska känna dig trygg genom hela resan.
            </p>
            <p>
              Att anlita oss innebär att vi gör vårt yttersta och arbetar helhjärtat för att överträffa dina förväntningar. Med ett genuint intresse för vackra hem och kundrelationer valde vi att starta en mäklarbyrå som ska vara din partner genom ditt livs bästa affär. Vår drivkraft är att hitta ett hem anpassat för just dig med ditt välmående i första plats.
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row
        align="center"
        justify="center"
        style="min-height:500px; text-align: center;"
        :style="$vuetify.breakpoint.smAndDown ? 'margin-left: 0; margin-right: 0;' : 'margin-left: 0; margin-right: 0; margin-bottom: 0; margin-top: 0;'"
      >
        <v-col cols="12" md="7" lg="6">
          <div>
            <h2 class="mb-5 block-title">
              Vill du vara en del av vårt team?
            </h2>
            <p>
              På STHLM ESTATE jobbar vi undantagslöst för att överträffa våra kunders förväntningar. Vill du vara en del av ett vinnande team och ha bra förutsättningar för att klättra upp i karriären eller kanske själv öppna ett kontor i framtiden? Skicka en kort beskrivning om dig själv och varför just du skulle passa in hos oss till
              <a href="mailto:info@sthlmestate.se">info@sthlmestate.se</a>
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import core from '~/config/core'

export default {
  name: 'AboutPage',
  // nuxtI18n: {
  //   paths: {
  //     sv: '/om-oss', // -> accessible at /about-us (no prefix since it's the default locale)
  //     en: '/about-us' // -> accessible at /en/about-us (no prefix since it's the secondary locale)
  //   }
  // },
  data: () => ({
    bgMode: false
  }),
  head () {
    return {
      title: 'Om Oss',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Hitta ditt hem hos oss'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Hitta ditt hem hos oss'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: core.settings.baseUrl.prod + 'default-social-image.jpg'
        }
      ]
    }
  },
  computed: {
    compStyle () {
      return this.$vuetify.breakpoint.smAndDown ? 'margin-left: 0; margin-right: 0;' : 'margin-left: 0; margin-right: 0; margin-bottom: 0; margin-top: 0;'
    },
    pageStyle () {
      const marginTop = this.$vuetify.breakpoint.smAndDown ? 'margin-top: 0;' : 'margin-top: 0;'
      const padding = this.$vuetify.breakpoint.smAndDown ? 'padding-top: 0;' : 'padding-top: -64px;'
      return this.bgMode
        ? `${marginTop} background: linear-gradient(180deg, ${this.$vuetify.theme.dark ? 'rgba(0,0,0,.9), rgba(0,0,0, .5)' : 'rgba(255,255,255,.8) 60%, rgba(255,255,255, .5)'}), url('/sthlmestate-architecture-abstract-2.jpg');`
        : marginTop + padding
    }
  }
}
</script>
<style lang="scss">
//.block-title {
//  font-size: 2rem;
//  font-family: Aleo, Serif;
//  font-weight: 400;
//}
//@media (max-width: 550px) {
//  .block-title {
//    font-size: 1.8rem
//  }
//}

</style>
