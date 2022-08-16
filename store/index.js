/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import core from '@/config/core'
import {
  initCookies, getRequestCookie,
  initResponseCookie, initSettingsCookie
} from '@/functions/cookie'
import { getEstates, getEstateData } from '@/functions/api'
import { getCurrentPage } from '@/functions/helpers'
import { cacheEstateImages } from '~/images'
// const fs = require('fs')

export const state = () => ({
  cookies: null,
  navigator: core.settings.navigator,
  currentEstate: null,
  productRowEstates: null,
  // randomProducts: [
  //   {
  //     page: 'index',
  //     qty: 3,
  //     cols: 12,
  //     sm: 6,
  //     md: 4,
  //     data: null
  //   }
  // ],
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
  getOffsetTop (state) {
    return state.offsetTop
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
  initCookies ({ commit }, state, payload) {
    commit('INIT_COOKIES', state, payload)
  },

  async nuxtServerInit ({ dispatch }, { app, route, store, payload }) {
    dispatch('updatePage', getCurrentPage(route, core.settings.navigator.top.items))
    let estates = null
    const cookies = store.state.cookies
    const response = cookies ? cookies.response : null
    const settings = cookies ? cookies.settings : null
    if (payload) {
      estates = payload
      initResponseCookie(false, response, dispatch, estates)
      initSettingsCookie(false, settings, null, dispatch)
    } else {
      initCookies(store.state.cookies, core.cookies, dispatch)
      const requestCookie = getRequestCookie(app.$secookie, store.state.cookies.request, dispatch, core.settings)
      let estates = null
      try {
        estates = await getEstates(app.$secookie, true, app.$axios, requestCookie, false)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
      const shuffled = [...estates].sort(() => 0.5 - Math.random())
      const productRowEstates = shuffled.slice(0, 10)
      dispatch('updateProductRowEstates', productRowEstates)

      initResponseCookie(app.$secookie, store.state.cookies.response, dispatch, estates)
      initSettingsCookie(app.$secookie, store.state.cookies.settings, null, dispatch)
      if (route.name && route.name.includes('fastigheter-estate') && !!route.params.estate && estates && estates.length) {
        // Get Estate Object
        /** ************* */
        // Get Current Estate & its Type from Response:
        const currentEstate = estates.find(est => est.id === route.params.estate)
        if (currentEstate && currentEstate.id) {
          const estateId = currentEstate.id
          const estateType = currentEstate.type
          let estateObject = null
          // let cached = false
          try {
            estateObject = await getEstateData(app.$axios, estateId, estateType)
            // console.log(estateObject)
            // cacheEstateImages(app.$axios, estateId, estateObject.images)
            await cacheEstateImages(app.$axios, estateId, estateObject.images)
              .then((res) => {
                estateObject.images = [...res]
                dispatch('updateCurrentEstateObj', estateObject)
              })
              .catch(() => {
                console.log('Something went wrong!')
                dispatch('updateCurrentEstateObj', estateObject)
              })
          } catch (error) {
            console.error(error)
          }
        }
      }
    }
  }
}
export const mutations = {
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
      const mainImageUrl = currentEstate.urlThumbnail.replace('thumb', '4k')
      estateObj.mainImageUrl = mainImageUrl
      console.log(mainImageUrl)
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
