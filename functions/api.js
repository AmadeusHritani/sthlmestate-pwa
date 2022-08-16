/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
import { cacheBrokerImage } from '../images'
import core from '@/config/core'
const axios = require('axios')
// const response = require('../data/response.json')
const getObjPoint = (estateType) => {
  return core.api.requests.endpoints.objects.find(point => point.type.toLowerCase() === estateType.toLowerCase())
}

export async function getEstateData ($axios, estateId, estateType, setHeaders = true) {
  let EstateObjectResponse = null
  let responsibleBroker = null
  let responsibleBrokerObj = null
  const url = `${getObjPoint(estateType).action}?customerId=${core.api.customerId}&EstateId=${estateId}`
  if (setHeaders) {
    $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
    $axios.setHeader('Access-Control-Allow-Origin', '*')
    // $axios.setHeader('Content-Type', 'application/octet-stream')
  }
  await $axios.$get(url)
    .then((objRes) => {
      EstateObjectResponse = objRes
      responsibleBroker = objRes.assignment.responsibleBroker
      if (!EstateObjectResponse.interior && !!EstateObjectResponse.houseInterior) {
        EstateObjectResponse.interior = EstateObjectResponse.houseInterior
      }
    })
    .catch((objErr) => {
      EstateObjectResponse = {
        error: objErr
      }
    })
  const url2 = `${core.api.requests.endpoints.user.action}?customerId=${core.api.customerId}&userId=${responsibleBroker}`
  await $axios.$get(url2)
    .then((brokerRes) => {
      responsibleBrokerObj = brokerRes
    })
    .catch((brokerErr) => {
      responsibleBrokerObj = {
        error: brokerErr
      }
    })
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
  return EstateObjectResponse
}

export async function getEstates ($cookie, forSaleOnly, $axios, requestCookieHeader, cache, config) {
  let EstateListResponse = null
  const paging = config || {
    index: '0',
    count: '100'
  }
  const EstateList = core.api.requests.endpoints.list
  let params = EstateList.params.default
  params.customerId = core.api.customerId
  params = JSON.stringify(params)

  const getTransformedData = async function () {
    const config = {
      method: 'get',
      url: `https://bostader-maklare-live.azurewebsites.net/api/Estate?type=0&status=3&municip=&customerId=M19854&pageIndex=${paging.index}&pageCount=${paging.count}`,
      headers: {
        Authorization: process.env.API_AUTHORIZATION
      }
    }
    await axios(config)
      .then((res) => {
        // console.log(res)
        EstateListResponse = res.data.estates
      })
      .catch((err) => {
        EstateListResponse = [{ error: err }]
      })
  }
  const getData = async function () {
    if (requestCookieHeader && $cookie && process.client) {
      $axios.setHeader('Cookie', requestCookieHeader)
      $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
      $axios.setHeader('Access-Control-Allow-Origin', '*')
      $axios.setHeader('Content-Type', EstateList.ContentType)
      await $axios.$post(EstateList.action, params)
        .then((res) => {
          EstateListResponse = res
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      // EstateListResponse = response
      $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
      $axios.setHeader('Access-Control-Allow-Origin', '*')
      $axios.setHeader('Content-Type', EstateList.ContentType)
      await $axios.$post(EstateList.action, params)
        .then((res) => {
          EstateListResponse = res
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  if (!$cookie) {
    // await getData()
    await getTransformedData()
  } else if ($cookie.get(core.cookies.response.name, { fromRes: true })) {
    EstateListResponse = $cookie.get(core.cookies.response.name, { fromRes: true })
      ? JSON.parse($cookie.get(core.cookies.response.name, { fromRes: true }))
      : $cookie.get(core.cookies.response.name, { fromRes: true })
  } else {
    // await getData()
    await getTransformedData()
  }
  const estatesArray = EstateListResponse
  // const estatesArray = await processEstateList($axios, EstateListResponse, forSaleOnly, cache)
  const processedEstateList = []
  // for (let i = 0; i < estatesArray.length; i++) {
  //   let object = {}
  //   // console.log(estatesArray[i])
  //   await getEstateData(estatesArray[i])
  //     .then((objectResponse) => {
  //       object = objectResponse
  //     })
  //     .catch((objectError) => {
  //       object = { error: objectError }
  //     })
  //   processedEstateList[i] = {
  //     ...estatesArray[i],
  //     object
  //   }
  // }
  // console.log(processedEstateList)
  return processedEstateList.length ? processedEstateList : estatesArray
}
