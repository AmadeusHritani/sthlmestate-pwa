/* eslint-disable no-console */
import fs from 'fs'
import core from '../config/core'
// const { mkdir, writeFile } = require('fs').promises
// const path = require('path')
// const fse = require('fs-extra')

export function addTranslationToNavItems (navItemsData, navItemsTranslations) {
  const sv = navItemsTranslations.sv
  const en = navItemsTranslations.en
  for (let i = 0; i < sv.length; i++) {
    for (const [key, value] of Object.entries(sv[i])) {
      // eg: key = 'label' | value = 'Hem'
      navItemsData[i][key] = {
        sv: value,
        en: en[i][key]
      }
    }
  }
  return navItemsData
}

export function txt ({ app }, text) {
  if (typeof text === 'string' && app.i18n.t && app.i18n.t(text)) {
    return app.i18n.t(text)
  } else {
    return text[app.i18n.locale] || text
  }
}

export function getCurrentPage (route, navItems) {
  let page = {}
  const slugs = route.path.split('/')
  for (let i = 0; i < navItems.length; i++) {
    const slug = navItems[i].slug
    if ((slugs[1] && slug === `/${slugs[1]}`) ||
        (slugs[2] && slug === `/${slugs[1]}/${slugs[2]}`) ||
        (slugs[3] && slug === `/${slugs[1]}/${slugs[2]}/${slugs[3]}`)) {
      page = navItems[i]
    }
    if (route.name === 'index') {
      page = navItems[0]
    }
  }
  return page
}

export async function cacheListImages ($axios, estateList) {
  $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  const ep = core.api.requests.endpoints.image
  const customerId = ep.params.default.customerId
  for (let i = 0; i < estateList.length; i++) {
    if (estateList[i].mainImage && estateList[i].mainImage.imageId) {
      const imageId = estateList[i].mainImage.imageId
      // $axios.setBaseURL(core.api.target)
      await $axios
        .$get(`${ep.action}?customerId=${customerId}&ImageId=${imageId}`)
        .then((response) => {
          const file = `${imageId}.${estateList[i].mainImage.extension}`
          fs.writeFile(`static/estate-images/${file}`, response, 'base64', function (err) {
            console.log(err)
          })
        })
    }
  }
}

export function processEstateList ($axios, EstateListResponse, forSaleOnly) {
  let estateList = []
  if (EstateListResponse) {
    if (EstateListResponse[0]) {
      EstateListResponse = EstateListResponse[0]
    }
    if (EstateListResponse.data) {
      EstateListResponse = EstateListResponse.data
    }
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(EstateListResponse)) {
      if (value.length && typeof value !== 'string') {
        const newValue = []
        value.forEach((ei) => {
          newValue.push({ ...ei, type: key })
        })
        estateList = [
          ...estateList,
          ...forSaleOnly ? newValue.filter(e => e.status.id === '3') : newValue
        ]
      }
    }
  }

  return [
    ...estateList.map((estate) => {
      estate.img = estate.mainImage
        ? `/estate-images/${estate.mainImage.imageId}.${estate.mainImage.extension}`
        : '/placeholder-home.png'
      return estate
    })
  ]
}
