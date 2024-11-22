<template>
  <div class="privacy-page">
    <v-img
      src="/privacy_hero.jpg"
      gradient="to top left, rgba(0,0,0,.33), rgba(0,0,0,.7)"
      height="150"
      class="d-flex justify-center align-center text-center white--text"
    >
      <h1>
        Allmänt om registrering
        <span style="display: block; font-size: 1.5rem;">
          och behandling enligt GDPR
        </span>
      </h1>
    </v-img>
    <v-container>
      <v-card class="pa-5 pt-8 pt-lg-10">
        <v-row dense>
          <v-col cols="12">
            <p>STHLM ESTATE behandlar personuppgifter i enlighet med Dataskyddsförordningen (GDPR).</p>
            <p>Ett av syftena med GDPR är att skydda enskildas grundläggande rättigheter och friheter, särskilt deras rätt till skydd av personuppgifter.</p>
            <p>
              Dataskyddsförordningen gäller för behandling av personuppgifter. Med personuppgifter avses varje upplysning som avser en identifierad eller identifierbar fysisk person. Avgörande är att uppgiften, enskilt eller i kombination med andra uppgifter, kan knytas till en levande person. En personuppgift kan t.ex. vara namn, adress, personnummer, telefonnummer, e-post, foto och ip-adress.
            </p>
          </v-col>
          <v-col cols="12">
            <h2>Ändamål med behandling av personuppgifter</h2>
            <p>För att kunna fullgöra vårt uppdrag behöver vi inhämta, bearbeta och lämna ut personuppgifter rörande dig.</p>
            <p>STHLM ESTATE lagrar dina personuppgifter, såsom namn, personnummer, adress, e-postadress och mobilnummer.</p>
          </v-col>
          <v-col cols="12">
            <section class="text-left">
              <h3>Ändamål: Administrera intresseanmälan</h3>
              <table>
                <tr>
                  <th>Laglig grund:</th>
                  <td>Intresseavvägning</td>
                </tr>
                <tr>
                  <th>Behandlingsaktivitet:</th>
                  <td>Lagring, matchningsutskick via e-post</td>
                </tr>
                <tr>
                  <th>Gallringstid:</th>
                  <td>Uppgifterna får sparas under tid tills objekt förmedlats ifall bevakning har anmälts. Annars gallring direkt.</td>
                </tr>
              </table>
            </section>
          </v-col>
          <v-col cols="12">
            <section class="text-left">
              <h3>
                Ändamål: Upprätta spekulantregister
                Visningslistor och förmedla objekt
              </h3>
              <table>
                <tr>
                  <th>Laglig grund:</th>
                  <td>Intresseavvägning</td>
                </tr>
                <tr>
                  <th>Behandlingsaktivitet:</th>
                  <td>Lagring, matchningsutskick via e-post</td>
                </tr>
                <tr>
                  <th>Gallringstid:</th>
                  <td>Tre månader från att bostaden har sålts</td>
                </tr>
              </table>
            </section>
          </v-col>
          <v-col cols="12" />
        </v-row>

        <section class="text-left">
          <h3>Ändamål: Direktmarknadsföring</h3>
          <table>
            <tr>
              <th>Laglig grund:</th>
              <td>Intresseavvägning</td>
            </tr>
            <tr>
              <th>Behandlingsaktivitet:</th>
              <td>Lagring, matchningsutskick via e-post</td>
            </tr>
            <tr>
              <th>Gallringstid:</th>
              <td>Tre månader från att uppgifter har samlats in</td>
            </tr>
          </table>
        </section>
        <h2>Information om samtycke och rättelse av uppgifter m.m</h2>
        <p>Behandling av personuppgifter är i viss omfattning nödvändig även om den registrerade inte har lämnat samtycke. Det kan exempelvis gälla för att avtal ska kunna fullgöras samt andra skyldigheter enligt lag t.ex. Kundkännedom, Köpekontrakt och Likvidavräkning.</p>
        <p>Om samtycke används som laglig grund för lagring av personuppgifter har du alltid rätt att återkalla ditt samtycke genom att kontakta personuppgiftsansvarig - se nedan.</p>
        <p>Enligt Dataskyddsförordningen har du rätt att begära information om och rättelse av de personuppgifter som finns om dig. Du har även rätt att få dina uppgifter raderade.</p>
        <p>Sådan begäran framställs skriftligen med uppgift om namn och personnummer till personuppgiftsansvarig –se nedan. </p>

        <h2>Personuppgiftsansvarig</h2>
        <p>
          Personuppgiftsansvarig är <b>STHLM ESTATE</b> (559387-5072)<br>
          Adress: 169 30 Solna<br>
          Tel: 073-73 900 01<br>
          E-post: info@sthlmestate.se
        </p>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import core from '@/config/core'

export default {
  name: 'PrivacyPage',
  data: () => ({
    privacy: null,
    src: 'https://hem.maklare.vitec.net/gdpr/policy/' + core.api.customerId
  }),
  methods: {
    onLoad (frame) {
      this.privacy = frame.contentWindow
    }
  }
}
</script>
<style lang="scss" scoped>
h2 {
  margin: 30px 0 15px 0 !important;
  font-size: 1.7rem;
}
h3 {
  margin: 20px 0 10px 0 !important;
  text-transform: capitalize;
}
</style>
