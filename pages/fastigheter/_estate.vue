<template>
  <div class="estate-detail-page">
    <div v-if="estateDetails && estateDetails.baseInformation" class="has-data">
      <estate-details
        :estate="estateDetails"
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapState, mapActions } from 'vuex'
import { getEstateData } from '@/functions/api'
import { cacheEstateImages } from '@/images'
import EstateDetails from '~/components/EstateDetails'
// import { cacheEstateImages } from '@/functions/helpers'
// const fs = require('fs').promises
// const path = require('path')
require('dotenv').config()
export default {
  name: 'EstateDetailPage',
  nuxtI18n: {
    paths: {
      sv: '/fastigheter/:estate',
      en: '/estates/:estate'
    }
  },
  components: {
    EstateDetails
  },
  scrollToTop: true,
  data () {
    return {
      estate: null,
      estateDetails: null,
      showImages: false,
      nav: {
        items: [
          {
            id: 1,
            slug: 'description',
            label: 'description',
            active: true
          }, {
            id: 2,
            slug: 'facts',
            label: 'facts',
            active: false
          }, {
            id: 3,
            slug: 'operations',
            label: 'operation-cost',
            active: false
          }, {
            id: 4,
            slug: 'documents',
            label: 'documents',
            active: false
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      cookies: 'cookies',
      currentEstateObj: 'currentEstateObj',
      currentEstate: 'currentEstate'
    }),
    estatesList () {
      return this.cookies.response.value
    }
  },
  watch: {
    '$route' (from, to) {
      // eslint-disable-next-line eqeqeq
      if (from != to) {
        this.estate = this.$route.params.estate
      }
    },
    estate (oldVal, newVal) {
      if (oldVal !== newVal) {
        this.processEstate(this.estate)
      }
    },
    currentEstateObj (currentEstateObj) {
      this.estateDetails = currentEstateObj
    }
  },
  created () {
    this.estate = this.$route.params.estate
  },
  mounted () {
    //
  },
  methods: {
    ...mapActions({
      updateCurrentEstateObj: 'updateCurrentEstateObj',
      updateCurrentEstate: 'updateCurrentEstate'
    }),
    async processEstate (estateId) {
      estateId = estateId || this.estate
      const currentEstate = this.cookies ? this.cookies.response.value.find(est => est.id === this.estate) : this.currentEstate
      // console.log(currentEstate)
      if (this.cookies && !currentEstate) {
        this.$router.replace('/not-found')
      } else {
        this.updateCurrentEstate(currentEstate)
        if (!this.currentEstateObj || this.currentEstateObj.id !== this.$route.params.estate) {
          await this.getEstate(currentEstate.id, currentEstate.type)
            .then(() => {
              this.estateDetails = this.currentEstateObj
            })
            .catch((error) => {
              this.estateDetails = { error }
            })
        }
      }
    },
    async getEstate (estateId, estateType) {
      if (!this.estateDetails || estateId !== this.estateDetails.id) {
        let estateObject = null
        let estateImages = []
        try {
          this.$axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
          this.$axios.setHeader('Access-Control-Allow-Origin', '*')
          estateObject = await getEstateData(this.$axios, estateId, estateType, false)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error)
        }
        estateImages = await cacheEstateImages(this.$axios, estateId, estateObject.images)
        estateObject.images = [...estateImages || estateObject.images]
        this.updateCurrentEstateObj(estateObject)
      }
    }
  }
}
</script>

<style lang="scss">
.estate-detail-page {
  position: relative;
  padding-top: calc(100vh - 65px);
}
</style>
