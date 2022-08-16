<template>
  <div class="page">
    <deus-push-simple
      :published="solutionsPush.published"
      :dark="false"
      :dense="solutionsPush.dense"
      :show-icon="solutionsPush.showIcon"
      :show-heading="solutionsPush.showHeading"
      :show-text="solutionsPush.ShowText"
      :icon="solutionsPush.icon"
      :heading="solutionsPush.heading"
      :text="solutionsPush.text"
      :bg="{ active: true, url: '/sthlmestate-abstract-light.webp', position: 'top center' }"
      style="min-height: 350px; background-size: cover; background-position: top center;"
    />
    <v-container class="pa-5">
      <v-row v-if="estateList && estateList.length" gutter="1">
        <v-col
          v-for="(estate, i) in estateList"
          :key="i"
          cols="12"
          lg="4"
          sm="6"
        >
          <estate-card :estate-object="estate" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import solutionsPushSimple from '@/data/cms/intro-push-simple-listpage'
import EstateCard from '~/components/EstateCard.vue'
import DeusPushSimple from '~/components/cms/DeusPushSimple.vue'
export default {
  name: 'EstateListPage',
  // eslint-disable-next-line vue/no-unused-components
  components: { EstateCard, DeusPushSimple },
  nuxtI18n: {
    paths: {
      sv: '/fastigheter',
      en: '/estates'
    }
  },
  data () {
    return {
      // estateList: null,
      solutionsPush: solutionsPushSimple
    }
  },
  computed: {
    ...mapGetters({
      cookies: 'cookies'
    }),
    estateList () {
      return this.cookies.response.value
    }
  },
  created () {
    // this.estateList = this.response
  },
  methods: {
    //
  }
}
</script>

<style lang="scss">
.primary-outlined {
  border: solid 2px var(--v-primary-base) !important;
}
</style>
