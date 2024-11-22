<template>
  <div class="page no-bg" :style="$vuetify.breakpoint.smAndDown ? 'margin-top: 0;' : ''">
    <deus-push-simple
      :published="solutionsPush.published"
      :dark="false"
      :dense="solutionsPush.dense"
      :show-icon="solutionsPush.showIcon"
      :show-heading="solutionsPush.showHeading"
      :show-text="false"
      :icon="solutionsPush.icon"
      :heading="solutionsPush.heading"
      :text="solutionsPush.text"
      :max-width="'100%'"
      :bg="{ active: false, url: '/sthlmestate-abstract-light.webp', position: 'top center' }"
      style="background-size: cover; background-position: top center;"
    />
    <v-container class="pa-5">
      <v-row v-if="estateList && estateList.length" gutter="1">
        <v-col
          v-for="(estate, i) in estateList"
          :key="i"
          cols="12"
          md="6"
          xl="6"
        >
          <estate-card :estate-object="estate" :grid-item-height="{desktop: 450, mobile: 250}" />
        </v-col>
      </v-row>
      <!--      <v-pagination-->
      <!--        v-model="currentPage"-->
      <!--        :length="paginationLength"-->
      <!--        circle-->
      <!--        class="mt-1 mb-3"-->
      <!--      />-->
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { normalizeText } from 'normalize-text'
import { mapActions, mapGetters, mapState } from 'vuex'
import solutionsPushSimple from '@/data/cms/intro-push-simple-listpage'
import EstateCard from '~/components/EstateCard.vue'
import DeusPushSimple from '~/components/cms/DeusPushSimple.vue'

export default {
  name: 'EstateListPage',
  // eslint-disable-next-line vue/no-unused-components
  components: { EstateCard, DeusPushSimple },
  // nuxtI18n: {
  //   paths: {
  //     sv: '/bostader',
  //     en: '/estates'
  //   }
  // },
  data () {
    return {
      currentPage: 1,
      estatesPerPage: 8,
      solutionsPush: solutionsPushSimple,
      searching: false,
      estateList: null
    }
  },
  head () {
    return {
      title: 'Våra Bostäder',
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
    ...mapGetters({
      cookies: 'cookies'
    }),
    ...mapState({
      search: 'search'
    }),
    paginationLength () {
      return Math.ceil(this.estateList.length / this.estatesPerPage)
    },
    estates () {
      const list = [...this.estateList]
      const start = this.estatesPerPage * (this.currentPage - 1)
      const end = this.currentPage * this.estatesPerPage
      return {
        page: this.currentPage,
        list: list.slice(start, end)
      }
    },
    queryTerm () {
      return this.$route.query.term
    }
  },
  watch: {
    currentPage (currentPage) {
      if (parseInt(this.$route.query.page || null) !== currentPage) {
        this.$router.push(`${this.$route.path}${this.$route.query.term ? `?term=${this.$route.query.term}&` : '?'}page=${currentPage}`)
      }
    },
    '$route' (to, from) {
      // console.log('from: ' + from.query.page)
      // console.log('to: ' + to.query.page)
      if (to.query.page) {
        this.currentPage = parseInt(to.query.page)
      }
      if (from.query.term && !to.query.term) {
        this.updateSearch({
          active: false,
          term: null
        })
      } else if (to.query.term) {
        this.updateSearch({
          active: true,
          term: to.query.term
        })
      }
      if (from.query.term !== to.query.term) {
        this.currentPage = 1
      }
    },
    search: {
      deep: true,
      immediate: false,
      handler (search) {
        if (search.term) {
          const term = normalizeText([search.term.toLowerCase().trimEnd()])
          if (search.term.length > 2) {
            const estateListByStreet = [...this.cookies.response.value].filter(estate => normalizeText([estate.streetAddress.toLowerCase()]).includes(term))
            const estateListByCity = [...this.cookies.response.value].filter(estate => normalizeText([estate.city.toLowerCase()]).includes(term))
            this.estateList = [...new Set([...estateListByStreet, ...estateListByCity])]
          }
          this.$router.push(`${this.$route.path}?term=${term}${this.$route.query.page ? `&page=${this.$route.query.page}` : ''}`)
        } else {
          this.estateList = this.cookies.response.value
          this.$router.push('')
        }
      }
    }
  },
  created () {
    if (this.$route.query.page && this.$route.query.page !== this.currentPage) {
      this.currentPage = parseInt(this.$route.query.page || null)
    }
    if (this.queryTerm && !this.search.term) {
      this.updateSearch({
        active: true,
        term: this.queryTerm
      })
    }
    if (this.search.term && this.search.term.length > 2) {
      const estateListByStreet = [...this.cookies.response.value].filter(estate => normalizeText(estate.streetAddress.toLowerCase()).includes(normalizeText([this.search.term.toLowerCase()])))
      const estateListByCity = [...this.cookies.response.value].filter(estate => normalizeText(estate.city.toLowerCase()).includes(normalizeText([this.search.term.toLowerCase()])))
      this.estateList = [...new Set([...estateListByStreet, ...estateListByCity])]
    } else {
      this.estateList = this.cookies.response.value
    }
    this.searching = this.search.active
  },
  methods: {
    ...mapActions({
      updateSearch: 'updateSearch'
    })
  }
}
</script>

<style lang="scss">
.primary-outlined {
  border: solid 2px var(--v-primary-base) !important;
}
</style>
