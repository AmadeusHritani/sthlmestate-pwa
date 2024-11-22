<template>
  <v-form @submit.prevent="doSearch()">
    <v-text-field
      ref="search-input-field"
      v-model="searchTerm"
      :prepend-icon="'mdi-magnify'"
      clear-icon="mdi-backspace"
      clearable
      :flat="flat"
      :solo="solo"
      :rounded="rounded"
      :single-line="singleLine"
      :dense="dense"
      :hide-details="hideDetails"
      :placeholder="placeholder"
      :label="label || $t('ui.search.label')"
      :type="type"
      class="search-input"
      @click:append-outer="doSearch"
      @click:clear="clearTerm"
      @focusout.stop="focusOut"
    />
  </v-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import { normalizeText } from 'normalize-text'

export default {
  name: 'EstateSearchForm',
  props: {
    flat: {
      type: Boolean,
      default: true
    },
    solo: {
      type: Boolean,
      default: true
    },
    rounded: {
      type: Boolean,
      default: false
    },
    singleLine: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    },
    hideDetails: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Vad söker du?'
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    hideOnOut: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    transparent: false,
    searchActive: false,
    searchTerm: null
  }),
  computed: {
    ...mapState({
      search: 'search'
    })
  },
  watch: {
    '$route' (to, from) {
      if (from.query.term && !to.query.term) {
        this.searchActive = false
        this.searchTerm = null
        this.updateSearch({
          active: false,
          term: null
        })
      } else if (to.query.term) {
        this.searchActive = true
        this.searchTerm = to.query.term
      }
    },
    active (active) {
      if (active !== this.searchActive) {
        this.searchActive = active
      }
    },
    // search: {
    //   deep: true,
    //   immediate: false,
    //   handler (search) {
    //     if (search.term && search.term.length > 2) {
    //       const term = normalizeText([search.term.toLowerCase().trimEnd()])
    //       this.searchActive = true
    //       this.$router.push(`?term=${term}`)
    //     } else {
    //       // this.searchActive = false
    //       // this.$router.push('')
    //     }
    //   }
    // },
    searchActive (active) {
      this.$emit('search-active', active)
      this.updateSearch({
        active,
        term: this.searchTerm
      })
      if (active) {
        this.$nextTick(() => {
          const search = this.$refs['search-input-field']
          search.focus()
        })
      }
    },
    searchTerm (term) {
      this.updateSearch({
        active: this.searchActive,
        term
      })
      this.$emit('search-term', term)
    }
  },
  mounted () {
    this.searchTerm = this.search.term
    this.searchActive = this.search.active
  },
  methods: {
    ...mapActions({
      updateSearch: 'updateSearch'
    }),
    focusOut () {
      if (this.hideOnOut) {
        this.searchActive = false
        this.$emit('search-active', false)
      }
    },
    doSearch () {
      this.$router.push('/bostader?term=' + this.searchTerm)
      // if (this.$route.name !== 'bostader') {
      //   this.$router.push('/bostader?term=' + this.term)
      // }
    },
    clearTerm () {
      this.term = null
    }
  }
}
</script>
