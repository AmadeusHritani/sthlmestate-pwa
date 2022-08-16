<template>
  <v-container class="products-row">
    <v-row v-if="estates && estates.length">
      <v-col
        v-for="card in properEstates"
        :key="card.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <estate-card :estate-object="card" />
      </v-col>
    </v-row>
  </v-container>
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
