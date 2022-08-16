/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import fs from 'fs'
// import fse from 'fs-extra'
import axios from 'axios'
import core from './config/core'
const path = require('path')

export async function cacheFiles ($axios, estateId, files) {
  $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  const images = []
  const ep = core.api.requests.endpoints.file
  const customerId = ep.params.default.customerId
  if (files && files.length) {
    const dir = path.resolve(`static/files/${estateId}`)
    if (process.server) {
      try {
        fs.mkdirSync(dir)
      } catch {
        // console.log('Directory already exists...')
      }
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].id) {
        const fileId = files[i].id
        const fileName = `${fileId}.${files[i].extension}`
        const estateFilesDir = 'estate-files'
        const staticRoot = 'static'
        let hasFile = false
        const file = path.resolve('', `${staticRoot}/${estateFilesDir}/${estateId}/`, fileName)
        if (process.server) {
          const fse = require('fs-extra')
          try {
            hasFile = await fse.pathExists(file)
          } catch (error) {
            hasFile = false
          }
          if (!hasFile) {
            const fileData = await $axios.$get(`${ep.action}?customerId=${customerId}&fileId=${fileId}`)
            fs.writeFile(file, fileData, 'base64', function (err) {
              if (err) {
                console.log('Error saving the file...')
                console.log(err)
              }
            })
          }
        }
        images[i] = files[i]
        images[i].cdnReferences.push(`${estateFilesDir}/${estateId}/${fileName}`)
      }
    }
  }
  return images
}

export async function cacheEstateImages ($axios, estateId, estateImages) {
  $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  const images = []
  const ep = core.api.requests.endpoints.image
  const customerId = ep.params.default.customerId
  if (estateImages && estateImages.length) {
    const dir = path.resolve(`static/estate-images/${estateId}`)
    if (process.server) {
      try {
        fs.mkdirSync(dir)
      } catch {
        // console.log('Directory already exists...')
      }
    }
    for (let i = 0; i < estateImages.length; i++) {
      if (estateImages[i].imageId) {
        const imageId = estateImages[i].imageId
        const fileName = `${imageId}.${estateImages[i].extension}`
        const estateImagesDir = 'estate-images'
        const staticRoot = 'static'
        const imgParams = 'w=1400&quality=80'
        let hasFile = false
        const file = path.resolve('', `${staticRoot}/${estateImagesDir}/${estateId}/`, fileName)
        if (process.server) {
          const fse = require('fs-extra')
          try {
            hasFile = await fse.pathExists(file)
          } catch (error) {
            hasFile = false
          }
          if (!hasFile) {
            const fileData = await $axios.$get(`${ep.action}?customerId=${customerId}&ImageId=${imageId}&${imgParams}`)
            fs.writeFile(file, fileData, 'base64', function (err) {
              if (err) {
                console.log('Error saving the file...')
                console.log(err)
              }
            })
          }
        }
        images[i] = estateImages[i]
        images[i].cdnReferences.push(`${estateImagesDir}/${estateId}/${fileName}`)
      }
    }
  }
  return images
}

export async function cacheBrokerImage ($axios, estateId, brokerId, brokerImage) {
  $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  let image = {}
  const ep = core.api.requests.endpoints.image
  const customerId = ep.params.default.customerId
  if (estateId && brokerImage) {
    const dir = path.resolve(`static/estate-images/${estateId}/${brokerId}`)
    if (process.server) {
      try {
        fs.mkdirSync(dir)
      } catch {
        // console.log('Directory already exists...')
      }
    }
    const imageId = brokerImage.imageId
    const fileName = `${imageId}.${brokerImage.extension}`
    const brokerImageDir = `estate-images/${estateId}/${brokerId}`
    const staticRoot = 'static'
    const imgParams = 'w=600&quality=90'
    let hasFile = false
    const file = path.resolve('', `${staticRoot}/${brokerImageDir}/`, fileName)
    if (process.server) {
      const fse = require('fs-extra')
      try {
        hasFile = await fse.pathExists(file)
      } catch (error) {
        hasFile = false
      }
      if (!hasFile) {
        let fileData = null
        try {
          fileData = await $axios.$get(`${ep.action}?customerId=${customerId}&ImageId=${imageId}&${imgParams}`)
          // console.log(fileData)
        } catch (error) {
          console.log('Failed to get broker image data')
        }
        if (fileData) {
          // console.log('Data ready! Begin to write...')
          fs.writeFile(file, fileData, 'base64', function (err) {
            if (err) {
              console.log('Error saving the file...')
              console.log(err)
            }
          })
        }
      }
    }
    image = brokerImage
    image.cdnReferences.push(`${brokerImageDir}/${fileName}`)
  }
  return image
}
