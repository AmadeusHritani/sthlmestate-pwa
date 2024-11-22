<template>
  <div class="products-row">
    <v-row v-if="estates && estates.length" justify="space-around" align="center">
      <v-col cols="12">
        <h2 class="text-center pa-0 ma-0 mt-8">
          {{ $txt('ui.our-latest-objects') }}
        </h2>
      </v-col>
      <v-col
        v-for="card in properEstates"
        :key="card.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <estate-card :estate-object="card" :grid-item-height="{ desktop: 400, mobile: 250 }" />
      </v-col>
      <v-col cols="auto">
        <v-btn :to="localePath('bostader')" x-large outlined class="mx-auto mt-1 mb-7">
          {{ $txt('ui.all') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EstateCard from '@/components/EstateCard.vue'
export default {
  name: 'DeusProductsRow',
  components: { EstateCard },
  props: {
    estates: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      productRowEstates: 'productRowEstates'
    }),
    vuetify () {
      return this.$vuetify
    },
    properEstates () {
      return (this.$vuetify.breakpoint.name !== 'lg' && this.$vuetify.breakpoint.name !== 'xs')
        ? this.productRowEstates.slice(0, 3)
        : this.productRowEstates.slice(0, 4)
    }
  }
}
</script>

<style lang="scss">
.products-row {
  padding: 15px;
}
.home-products {
  padding: 25px 5px 10px;
  text-align: center;
  font-size: 2.6rem;
  text-transform: uppercase;
  font-weight: 100;
  font-family: $heading-font-family;
}
</style>
