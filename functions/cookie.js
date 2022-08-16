export function initCookies (cookiesState, cookiesCore, dispatch) {
  if (!cookiesState) {
    dispatch('initCookies', { ...cookiesCore })
  }
}

export function getRequestCookie ($cookie, requestStoreCookie, dispatch, settings) {
  if (!$cookie.get(requestStoreCookie.name, { fromRes: true })) {
    $cookie.set(requestStoreCookie.name, `${settings.titleId}-${new Date().getTime()}`, {
      path: '/',
      maxAge: 60 * 5
    })
    dispatch('setRequestCookie', {
      name: requestStoreCookie.name,
      value: $cookie.get(requestStoreCookie.name, { fromRes: true }),
      path: '/',
      maxAge: 60 * 5,
      createdAt: new Date().toLocaleDateString()
    })
  }

  return `${requestStoreCookie.name}=${requestStoreCookie.value}`
}

export function initResponseCookie ($cookie, responseStoreCookie, dispatch, response) {
  if (!$cookie) {
    dispatch('setResponseCookie', {
      name: responseStoreCookie.name,
      value: response,
      path: '/',
      maxAge: 60 * 5,
      createdAt: new Date().toLocaleDateString()
    })
  } else if (!$cookie.get(responseStoreCookie.name) || $cookie.get(responseStoreCookie.name) === 'null') {
    $cookie.set(responseStoreCookie.name, response || responseStoreCookie.value, {
      path: '/',
      maxAge: 60 * 5
    })
    dispatch('setResponseCookie', {
      name: responseStoreCookie.name,
      value: response,
      path: '/',
      maxAge: 60 * 5,
      createdAt: new Date().toLocaleDateString()
    })
  } else {
    dispatch('setResponseCookie', {
      name: responseStoreCookie.name,
      value: response,
      path: '/',
      maxAge: 60 * 5,
      createdAt: new Date().toLocaleDateString()
    })
  }
}

export function initSettingsCookie ($cookie, settingsStoreCookie, newSettings, dispatch) {
  if (!$cookie) {
    dispatch('setSettingsCookie', {
      name: settingsStoreCookie.name,
      value: newSettings,
      path: '/',
      maxAge: 60 * 5,
      createdAt: new Date().toLocaleDateString()
    })
  } else if (!$cookie.get(settingsStoreCookie.name, { fromRes: true })) {
    $cookie.set(settingsStoreCookie.name, newSettings || settingsStoreCookie.value, {
      path: '/',
      maxAge: 60 * 5
    })
    dispatch('setSettingsCookie', {
      name: settingsStoreCookie.name,
      value: newSettings || settingsStoreCookie.value,
      path: '/',
      maxAge: 60 * 5,
      createdAt: new Date().toLocaleDateString()
    })
  }
}
