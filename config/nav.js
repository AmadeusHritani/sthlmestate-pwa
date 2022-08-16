/* eslint-disable no-console */
import getSv from '../locales/sv/get'
import getEn from '../locales/en/get'
import { addTranslationToNavItems } from '../functions/helpers'
// Prepare Translations
const navItemsData = require('../data/items.json')
const sv = getSv.nav.items
const en = getEn.nav.items
const navItemsTranslations = { sv, en }
const items = addTranslationToNavItems(navItemsData, navItemsTranslations)

export default {
  clipped: true,
  drawer: false,
  fixed: true,
  miniVariant: true,
  right: true,
  rightDrawer: false,
  top: {
    title: {
      sv: getSv.nav.title,
      en: getEn.nav.title
    },
    items
  }
}
