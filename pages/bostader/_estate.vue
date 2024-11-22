<template>
  <div class="estate-detail-page">
    <div v-if="estateDetails && estateDetails.baseInformation" class="has-data">
      <estate-details
        :estate="estateDetails"
      />
    </div>
    <v-overlay
      :value="overlay"
      :color="$vuetify.theme.dark ? 'black' : 'white'"
      opacity="1"
    >
      <v-progress-circular :color="$vuetify.theme.dark ? 'white' : 'black'" width="5" indeterminate size="30" />
    </v-overlay>
  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { mapState, mapActions, mapMutations } from 'vuex'
import { getEstateData } from '@/functions/api'
import { cacheEstateFiles, cacheEstateImages } from '@/images'
import EstateDetails from '@/components/EstateDetails'
import core from '~/config/core'
require('dotenv').config()
export default {
  name: 'EstateDetailPage',
  // nuxtI18n: {
  //   paths: {
  //     sv: '/bostader/:estate',
  //     en: '/estates/:estate'
  //   }
  // },
  components: {
    EstateDetails
  },
  scrollToTop: true,
  async asyncData ({ store, route }) {
    let seoImage, seoTitle
    const seoDesc = 'Sthlm Estate | Hitta ditt drömhem i Stockholm'
    const currentEstate = await store.state.cookies?.response?.value?.find(est => est.id === route.params.estate)
    if (currentEstate && currentEstate.id) {
      seoImage = core.settings.baseUrl.prod + currentEstate?.urlThumbnail?.slice(1, currentEstate?.urlThumbnail?.length)
      seoTitle = `${currentEstate?.streetAddress} - ${currentEstate?.city}`
    }
    return {
      seoImage, seoTitle, seoDesc
    }
  },
  data () {
    return {
      estate: null,
      estateDetails: null,
      seoImage: '',
      seoTitle: '',
      seoDesc: '',
      showImages: false,
      overlay: true
    }
  },
  head () {
    return {
      title: this.estateDetails && this.estateDetails.baseInformation && this.estateDetails.baseInformation.objectAddress
        ? `${this.estateDetails.baseInformation.objectAddress.streetAddress}, ${this.estateDetails.baseInformation.objectAddress.municipality} ${this.estateDetails.baseInformation.objectAddress.zipCode}`
        : 'Bostaden',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.seoTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.seoDesc
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.seoDesc
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.seoImage
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: core.settings.baseUrl.prod + this.$route.fullPath
        }
      ]
    }
  },
  computed: {
    ...mapState({
      cookies: 'cookies',
      currentEstateObj: 'currentEstateObj',
      currentEstate: 'currentEstate'
    }),
    estatesList () {
      return this.cookies ? this.cookies.response.value : []
    }
  },
  watch: {
    '$route' (from, to) {
      // eslint-disable-next-line eqeqeq
      if (from !== to) {
        this.estate = this.$route.params.estate
      }
    },
    estate (oldVal, newVal) {
      if (oldVal !== newVal) {
        this.processEstate()
      }
    },
    currentEstateObj (currentEstateObj) {
      this.estateDetails = currentEstateObj
    }
  },
  created () {
    this.estate = this.$route.params.estate
    setTimeout(() => {
      this.overlay = false
    }, 800)
  },
  mounted () {
    this.setSearchActive(false)
    this.setSearchTerm(null)
  },
  methods: {
    ...mapMutations({
      setStoreEstateObject: 'SET_CURRENT_ESTATE_OBJ',
      setStoreEstate: 'SET_CURRENT_ESTATE',
      setSearchActive: 'SET_SEARCH_ACTIVE',
      setSearchTerm: 'SET_SEARCH_TERM'
    }),
    ...mapActions({
      updateCurrentEstateObj: 'updateCurrentEstateObj',
      updateCurrentEstate: 'updateCurrentEstate'
    }),
    async processEstate (estateId) {
      estateId = estateId || this.estate
      const currentEstate = this.cookies ? this.cookies.response.value.find(est => est.id === this.estate) : (this.currentEstate || null)
      // console.log(currentEstate)
      if (this.cookies && !currentEstate) {
        await this.$router.replace('/not-found')
      } else if (currentEstate) {
        this.setStoreEstate(currentEstate)
        if (!this.currentEstateObj || this.currentEstateObj.id !== this.$route.params.estate) {
          await this.getEstate(currentEstate.id, currentEstate.type)
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
        let estateFiles = []
        try {
          estateObject = await getEstateData(this.$axios, estateId, estateType, true)
        } catch (error) {
          console.error(error)
        }
        if (estateObject) {
          estateImages = await cacheEstateImages(this.$axios, estateId, estateObject.images, true)
          estateFiles = estateObject.association ? await cacheEstateFiles(this.$axios, estateId, estateObject.association.documents, true) : []
          estateObject.images = [...estateImages || estateObject.images]
          estateObject.files = [...estateFiles || (estateObject.association ? estateObject.association.documents : [])]
          await this.setStoreEstateObject(estateObject)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.estate-detail-page {
  position: relative;
  padding-top: calc(100vh - (65px));
}

@media screen and (max-width: 500px) {
  .estate-detail-page {
    padding-top: calc(100vh - (65px * 2));
  }
}
</style>
