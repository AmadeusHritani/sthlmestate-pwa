/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
import core from '../config/core'
import { cacheEstateImages, cacheEstateFiles, cacheBrokerImage, cacheEmployeeImage } from '~/images'
const axios = require('axios')
const dev = process.env.NODE_ENV !== 'production'
const noOldViewings = 'true'
const base = process.server ? 'https://connect.maklare.vitec.net' : !dev ? '/api' : '/api/'
const paging = {
  index: '0',
  count: '200'
}

async function getObjPoint (indicator) {
  const objects = core.api.requests.endpoints.objects
  const byType = await objects.find(point => point.type.toLowerCase() === indicator.toLowerCase())
  const byGroup = await objects.find(point => indicator.toLowerCase().includes(point.type.toLowerCase()))
  return {
    ...byType || (byGroup || {}),
    found: byType ? 'from byType' : byGroup ? 'from byGroup' : 'ep-not-found'
  }
}

export async function postViewingParticipant ($axios, viewingId, timeSlotId, data) {
  $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  $axios.setHeader('Content-Type', 'application/json')
  const estateViewingsEp = `${core.api.requests.endpoints.postViewings.action}${viewingId}/${timeSlotId}/Participant`
  return await $axios.$post(estateViewingsEp, data)
}

export async function getViewings ($axios, estateId) {
  $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  $axios.setHeader('Content-Type', 'application/json')
  const estateViewingsEp = `${core.api.requests.endpoints.getViewings.action}${estateId}`
  return await $axios.$get(estateViewingsEp)
}

export async function sendInterest ($axios, data) {
  $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  const interestEp = core.api.requests.endpoints.interest.action
  return await $axios.$post(interestEp, data)
}

export async function getEmployees () {
  const employees = await axios({
    method: 'get',
    url: `${base}/User/GetAllUsers?customerId=M19854`,
    headers: {
      Authorization: process.env.API_AUTHORIZATION
    }
  })
  for (let i = 0; i < employees.data.length; i++) {
    // console.log(employees.data[i])
    await cacheEmployeeImage(employees.data[i].image)
      .then((res) => {
        // console.log('Cached employee image')
        employees.data[i].image = { ...res }
      })
      .catch(() => {
        console.log('Something went wrong with the employee image caching!')
      })
  }
  return employees ? employees.data ? employees.data : employees : []
}

export async function getEstateData ($axios, estateId, estateType, setHeaders = true) {
  let EstateObjectResponse = null
  let responsibleBroker = null
  let responsibleBrokerObj = null
  const ep = await getObjPoint(estateType)
  const cId = core.api.customerId
  const estatesEp = `${ep.action}?customerId=${cId}&estateId=${estateId}&OnlyFutureViewings=${dev ? noOldViewings : 'true'}`
  if (setHeaders) {
    $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
    $axios.setHeader('Access-Control-Allow-Origin', '*')
    if (!dev) {
      $axios.setBaseURL(base)
    }
  }
  await $axios.$get(estatesEp)
    .then((objRes) => {
      objRes = JSON.parse(JSON.stringify(objRes))
      EstateObjectResponse = objRes
      responsibleBroker = objRes.assignment ? objRes.assignment.responsibleBroker : null
      if (!EstateObjectResponse.interior && !!EstateObjectResponse.houseInterior) {
        EstateObjectResponse.interior = EstateObjectResponse.houseInterior
      }
    })
    .catch((objErr) => {
      EstateObjectResponse = {
        error: objErr
      }
    })

  let estateImages = null
  let estateFiles = null
  if (EstateObjectResponse) {
    try {
      estateImages = await cacheEstateImages($axios, estateId, EstateObjectResponse.images)
    } catch (error) {
      console.error(error)
    }
    if (estateImages) {
      EstateObjectResponse.images = estateImages
    }
    if (EstateObjectResponse.association && EstateObjectResponse.association?.documents && EstateObjectResponse.association?.documents.length) {
      try {
        estateFiles = await cacheEstateFiles($axios, estateId, EstateObjectResponse.association?.documents)
      } catch (error) {
        console.error(error)
      }
      if (estateFiles) {
        EstateObjectResponse.files = [...estateFiles]
      }
    }
  }

  const brokerEp = `${core.api.requests.endpoints.user.action}?customerId=${core.api.customerId}&userId=${responsibleBroker}`

  await $axios.$get(brokerEp)
    .then((brokerRes) => {
      brokerRes = JSON.parse(JSON.stringify(brokerRes))
      responsibleBrokerObj = brokerRes.data || brokerRes
    })
    .catch((brokerErr) => {
      responsibleBrokerObj = {
        error: brokerErr
      }
    })

  if (typeof EstateObjectResponse === 'object' && responsibleBrokerObj) {
    EstateObjectResponse.broker = responsibleBrokerObj[0] || responsibleBrokerObj
    await cacheBrokerImage($axios, estateId, EstateObjectResponse.broker.userId, EstateObjectResponse.broker.image)
      .then((res) => {
        EstateObjectResponse.broker.image = { ...res }
      })
      .catch(() => {
        console.log('Something went wrong with the broker image caching!')
      })
    // console.log(EstateObjectResponse.images)
    // cacheEstateImages($axios, EstateObjectResponse.id, EstateObjectResponse.images)
  }
  return EstateObjectResponse
}

export async function getEstates ($cookie, forSaleOnly, $axios, requestCookieHeader) {
  let EstateListResponse = null
  const EstateList = core.api.requests.endpoints.list
  const params = EstateList.params.default
  const getData = async function () {
    let response = null
    $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
    $axios.setHeader('Access-Control-Allow-Origin', '*')
    $axios.setHeader('Content-Type', EstateList.ContentType)
    if (!dev) {
      $axios.setBaseURL(base)
    }
    if (requestCookieHeader && $cookie && process.client) {
      $axios.setHeader('Cookie', requestCookieHeader)
    }
    await $axios.$post(EstateList.action, params)
      .then((res) => {
        response = res
      })
      .catch((err) => {
        console.log(err)
      })
    return response
  }

  if (!!$cookie && $cookie.get(core.cookies.response.name, { fromRes: true })) {
    EstateListResponse = $cookie.get(core.cookies.response.name, { fromRes: true })
      ? JSON.parse($cookie.get(core.cookies.response.name, { fromRes: true }))
      : $cookie.get(core.cookies.response.name, { fromRes: true })
  } else {
    await getData().then(async (listData) => {
      if (listData?.length) {
        EstateListResponse = await formatEstates(listData[0], $axios)
      } else {
        EstateListResponse = await getTransformedData()
      }
    })
  }
  return { estates: EstateListResponse }
}

export async function getEstateRawData ($axios, estateId, estateType) {
  const ep = await getObjPoint(estateType)
  const cId = core.api.customerId
  const estatesEp = `${ep.action}?customerId=${cId}&estateId=${estateId}&OnlyFutureViewings=${dev ? noOldViewings : 'true'}`
  $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  if (!dev) {
    $axios.setBaseURL(base)
  }
  let estateObject = {}
  await $axios.$get(estatesEp)
    .then((objRes) => {
      objRes = JSON.parse(JSON.stringify(objRes))
      if (!objRes.interior && !!objRes.houseInterior) {
        objRes.interior = objRes.houseInterior
      }
      estateObject = objRes
    })
    .catch((objErr) => {
      console.error('Error at: getEstateRawData()')
      console.error(objErr)
      console.log('estateId > ', estateId)
      console.log('estateType > ', estateType)
      console.log(ep)
    })
  // console.log('getEstateRawData() -> estateObject', estateObject)
  return estateObject
}

// eslint-disable-next-line require-await
export async function formatEstates (apiList, $axios) {
  const estatesList = []
  for (const [key, value] of Object.entries(apiList)) {
    if (!!value.length && typeof value !== 'string') {
      value.map((obj) => {
        estatesList.push({
          ...obj,
          group: key,
          urlThumbnail: !obj?.mainImage
            ? '/placeholder-home.png'
            : `/estate-images/${obj.id}/${obj.mainImage.imageId}.${obj.mainImage.extension}`
        })
      })
    }
  }
  const enrichedList = []
  await Promise.all(estatesList.map(async (estate) => {
    const fullEstateData = await getEstateRawData($axios, estate.id, estate.group) || {}
    enrichedList.push({
      apartmentNumber: fullEstateData?.baseInformation?.apartmentNumber,
      baseInformation: fullEstateData?.baseInformation,
      bidSetting: fullEstateData?.internetSettings?.bidSetting,
      bids: fullEstateData.bids,
      city: fullEstateData?.baseInformation?.objectAddress?.city || fullEstateData?.baseInformation?.objectAddress?.municipality,
      county: fullEstateData?.baseInformation?.objectAddress?.county,
      currency: 'kr',
      customerId: estate.customerId,
      dateChanged: estate.dateChanged,
      documents: fullEstateData?.advertiseOn?.documents,
      finalPrice: fullEstateData?.price?.finalPrice,
      firstPublishingDateOnHomepage: fullEstateData?.advertiseOn?.firstPublishingDateOnHomepage,
      floorAndElevator: fullEstateData?.floorAndElevator,
      id: estate.id,
      interior: fullEstateData?.interior,
      isBiddingOngoing: !!estate.bidding,
      livingSpace: estate.livingSpace,
      marketplaces: fullEstateData?.advertiseOn?.marketplaces,
      monthlyFee: estate.monthlyFee,
      monthlyFeeIsZero: fullEstateData?.baseInformation?.monthlyFeeIsZero,
      municipality: fullEstateData?.baseInformation?.objectAddress?.municipality,
      newConstruction: fullEstateData?.baseInformation?.newConstruction,
      numberOfRooms: estate.rooms,
      otherSpace: fullEstateData?.baseInformation?.otherSpace,
      plot: fullEstateData?.plot || null,
      plotArea: fullEstateData?.plot?.area,
      publishedAt: fullEstateData?.date?.assignmentDate,
      startingPrice: estate.price,
      statusName: estate.status.name,
      streetAddress: estate.streetAddress,
      type: estate.group.substring(0, estate.group.length - 1),
      group: estate.group,
      typeDisplay: fullEstateData?.baseInformation?.propertyType,
      urlThumbnail: estate.urlThumbnail,
      zipCode: fullEstateData?.baseInformation?.objectAddress?.zipCode
    })
  }))
  // Sort by dateChanged
  enrichedList.sort(function (a, b) {
    return new Date(b.publishedAt) - new Date(a.publishedAt)
  })
  // return estatesList
  return enrichedList
}

export async function getTransformedData () {
  const config = {
    method: 'get',
    url: 'https://bostader-maklare-live.azurewebsites.net/api/Estate?type=0&status=3&customerId=M19854&pageIndex=1&pageCount=200',
    headers: {
      Authorization: process.env.API_AUTHORIZATION
    }
  }
  let response
  await axios(config)
    .then((res) => {
      const data = res.data ? res.data : res
      response = data.estates.sort((a, b) => -1 * a.id.localeCompare(b.id))
        .map((estate) => {
          if (estate && estate.urlThumbnail) {
            estate.urlThumbnail = estate.urlThumbnail.replace('thumb', 'hd')
          }
          return estate
        })
    })
    .catch((err) => {
      console.log(err)
    })
  return response
}
