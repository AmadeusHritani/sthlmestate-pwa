/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import core from '../config/core'
import { getRequestCookie, initCookies, initResponseCookie, initSettingsCookie } from '~/functions/cookie'
import { getEmployees, getEstateData, getEstates } from '~/functions/api'
// import { cacheBrokerImage, cacheEmployeeImage, cacheEstateFiles, cacheEstateImages } from '../images'
import { getCurrentPage } from '~/functions/helpers'
// const fs = require('fs')

export const state = () => ({
  employees: [],
  cookies: null,
  filteredEstatesList: null,
  deusNav: core.settings.deusNav,
  currentEstate: null,
  productRowEstates: null,
  currentEstateObj: null,
  currentPage: null,
  loading: false,
  config: core,
  notFound: false,
  search: {
    active: false,
    term: null
  },
  offsetTop: 0
})

export const getters = {
  cookies (state) {
    return state.cookies
  },
  employees (state) {
    return state.employees
  }
}

export const actions = {
  updateLoading ({ commit }, state, payload) {
    commit('UPDATE_LOADING', state, payload)
  },
  updatePage ({ commit }, state, payload) {
    commit('UPDATE_CURRENT_PAGE', state, payload)
  },
  updateOffsetTop ({ commit }, state, payload) {
    commit('UPDATE_OFFSET_TOP', state, payload)
  },
  updateProductRowEstates ({ commit }, state, payload) {
    commit('SET_PRODUCT_ROW_ESTATES', state, payload)
  },
  updateCurrentEstate ({ commit }, state, payload) {
    // console.log(payload)
    commit('SET_CURRENT_ESTATE', state, payload)
  },
  updateCurrentEstateObj ({ commit }, state, payload) {
    commit('SET_CURRENT_ESTATE_OBJ', state, payload)
  },
  updateSearch_active ({ commit }, state, payload) {
    commit('SET_SEARCH_ACTIVE', state, payload)
  },
  updateSearch_term ({ commit }, state, payload) {
    commit('SET_SEARCH_TERM', state, payload)
  },
  updateSearch ({ dispatch }, payload) {
    dispatch('updateSearch_active', payload.active)
    dispatch('updateSearch_term', payload.term)
  },
  setRequestCookie ({ commit }, state, payload) {
    commit('SET_REQUEST_COOKIE', state, payload)
  },
  setResponseCookie ({ commit }, state, payload) {
    commit('SET_RESPONSE_COOKIE', state, payload)
  },
  setSettingsCookie ({ commit }, state, payload) {
    commit('SET_SETTINGS_COOKIE', state, payload)
  },
  setEmployees ({ commit }, state, payload) {
    commit('SET_EMPLOYEES', state, payload)
  },
  initCookies ({ commit }, state, payload) {
    commit('INIT_COOKIES', state, payload)
  },

  async nuxtServerInit ({ dispatch }, { app, route, store, router }) {
    dispatch('updatePage', getCurrentPage(route, core.settings.deusNav.top.items))
    let estates = null
    let getEstatesResponse = null
    const cookies = store.state.cookies
    const response = cookies ? cookies.response : core.cookies.response
    const settings = cookies ? cookies.settings : core.cookies.settings
    initCookies(store.state.cookies, core.cookies, dispatch)
    const requestCookie = getRequestCookie(app.$secookie, store.state.cookies.request, dispatch, core.settings)
    try {
      getEstatesResponse = await getEstates(app.$secookie, true, app.$axios, requestCookie)
      estates = getEstatesResponse.estates
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }

    const productRowEstates = estates ? estates.slice(0, 10) : []
    dispatch('updateProductRowEstates', productRowEstates)

    initResponseCookie(app.$secookie, store.state.cookies.response, dispatch, estates)
    // initSettingsCookie(app.$secookie, store.state.cookies.settings, null, dispatch)

    // Get Employees (Team on Kontakt page) //
    /* ************************************ */
    let employees = []
    try {
      employees = await getEmployees()
    } catch (error) {
      console.error(error)
    }
    dispatch('setEmployees', employees)

    if (route && route.name && route.name.includes('bostader-estate') && !!route.params.estate && estates && estates.length) {
      // Get Estate Object from list in Store //
      /* ************************************ */
      const currentEstate = estates.find(est => est.id === route.params.estate)
      if (currentEstate && currentEstate.id) {
        const estateId = route.params.estate
        const estateType = currentEstate.type
        let estateObject = null
        try {
          estateObject = await getEstateData(app.$axios, estateId, estateType)
        } catch (error) {
          console.error(error)
        }
        dispatch('updateCurrentEstateObj', estateObject)
      } else if (router) {
        router.replace('not-found')
      }
    } else {
      dispatch('updateCurrentEstateObj', null)
    }
  }
}
export const mutations = {
  SET_EMPLOYEES (state, payload) {
    state.employees = payload
  },
  UPDATE_LOADING (state, payload) {
    state.loading = payload
  },
  UPDATE_OFFSET_TOP (state, payload) {
    state.loading = payload
  },
  UPDATE_CURRENT_PAGE (state, payload) {
    state.currentPage = payload
  },

  SET_PRODUCT_ROW_ESTATES (state, payload) {
    state.productRowEstates = payload
  },

  SET_CURRENT_ESTATE (state, payload) {
    state.currentEstate = payload
  },

  SET_CURRENT_ESTATE_OBJ (state, payload) {
    const currentEstate = state.currentEstate
    const estateObj = payload
    if (currentEstate) {
      estateObj.mainImageUrl = currentEstate.urlThumbnail
        ? currentEstate.urlThumbnail.replace('hd', '4k').replace('thumb', '4k')
        : null
    }
    state.currentEstateObj = estateObj
  },

  SET_SEARCH_ACTIVE (state, payload) {
    state.search.active = payload
  },

  SET_SEARCH_TERM (state, payload) {
    state.search.term = payload
  },

  SET_REQUEST_COOKIE (state, payload) {
    state.cookies.request = payload
  },

  SET_RESPONSE_COOKIE (state, payload) {
    state.cookies.response = payload
  },

  SET_SETTINGS_COOKIE (state, payload) {
    state.cookies.settings = payload
  },

  INIT_COOKIES (state, payload) {
    state.cookies = payload
  }
}
