/* eslint-disable no-console */
export default ({ app }, inject) => {
  let txt = null
  txt = (text) => {
    if (typeof text !== 'string') {
      return text[app.i18n.locale] || text
    } else if (typeof text === 'string') {
      let newTxt = text
      try {
        newTxt = app.i18n.t(`${text}`)
      } catch {
        console.log('No translation available for: ' + text)
      }
      return newTxt
    } else {
      return text
    }
  }
  inject('txt', txt)
  return txt
}
