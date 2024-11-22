<template>
  <div
    class="page no-bg"
    :style="pageStyle"
    style=""
  >
    <v-row
      justify="center"
      align="center"
      style="min-height:calc( 100vh - 120px);"
      :style="$vuetify.breakpoint.smAndDown ? 'margin-left: 0; margin-right: 0;' : 'margin-left: 0; margin-right: 0; margin-bottom: 0; margin-top: 0;'"
    >
      <v-col cols="12" lg="8" class="text-center">
        <h1 class="mt-6 mt-md-0">
          Policy för hantering av personuppgifter
        </h1>
        <div class="pt-8">
          <h3>
            Samtycke gällande insamlande av personuppgifter
          </h3>
          <div class="mb-8">
            När du fyller i ditt namn eller din mailadress i något av formulären på Sthlm Estate får du också godkänna att Sthlm Estate får registrera dina personuppgifter. Registrering och hantering av personuppgifterna sker i enlighet med gällande lagstiftning.
          </div>
          <h3>
            Behandling och syfte
          </h3>
          <div class="mb-8">
            När du ger ditt godkännande samtycker du till att Sthlm Estate registrerar de personuppgifter som behövs för att Sthlm Estate ska kunna kommunicera till dig.
            Personuppgifterna används bara inom ramen för Sthlm Estate verksamhet, t.ex. vid utskick av information om objekt eller dylikt.
          </div>
          <h3>
            Personuppgifter som behandlas av Sthlm Estate
          </h3>
          <div class="mb-8">
            Uppgifter som registreras är namn, adress, mobilnummer, email, bostadsinformation samt eventuellt intresseområde.
          </div>
          <h3>
            Dina rättigheter
          </h3>
          Du har rätt att få veta vilka personuppgifter vi behandlar, hur dessa behandlas och få dina personuppgifter rättade eller raderade.
          Vid frågor om personuppgifter, ändringar/radering av personuppgifter eller registerutdrag kontaktar du
          <a href="mailto:info@sthlmestate.se">info@sthlmestate.se</a>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'GdprPage',
  data: () => ({
    bgMode: false
  }),
  head () {
    return {
      title: 'Policy & GDPR',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  },
  computed: {
    pageStyle () {
      const marginTop = this.$vuetify.breakpoint.smAndDown ? 'margin-top: 0;' : 'margin-top: 0;'
      return this.bgMode
        ? `${marginTop} background: linear-gradient(180deg, ${this.$vuetify.theme.dark ? 'rgba(0,0,0,.9), rgba(0,0,0, .5)' : 'rgba(255,255,255,.8) 60%, rgba(255,255,255, .5)'}), url('/sthlmestate-architecture-abstract-2.jpg');`
        : marginTop
    }
  }
}
</script>
