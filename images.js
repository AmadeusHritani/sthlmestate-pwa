/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// import fse from 'fs-extra'
import axios from 'axios'
import core from './config/core'
const path = require('path')

const base = process.server ? 'https://connect.maklare.vitec.net' : '/api'

export async function cacheEstateImages ($axios, estateId, estateImages, doCache = true) {
  const images = []
  const ep = core.api.requests.endpoints.image
  const customerId = ep.params.default.customerId
  if (estateImages && estateImages.length) {
    const dir = path.resolve(`static/estate-images/${estateId}`)
    if (doCache && process.server) {
      try {
        const fs = require('fs')
        fs.mkdirSync(dir)
      } catch {}
    }
    for (let i = 0; i < estateImages.length; i++) {
      if (estateImages[i].imageId) {
        const imageId = estateImages[i].imageId
        const fileName = `${imageId}.${estateImages[i].extension}`
        const estateImagesDir = 'estate-images'
        const staticRoot = 'static'
        const imgParams = estateImages[i].orderNumber === 1 ? 'w=1920&quality=95&mode=max' : 'w=1920&quality=90&mode=max'
        let hasFile = false
        const file = path.resolve('', `${staticRoot}/${estateImagesDir}/${estateId}/`, fileName)
        if (doCache && process.server) {
          const fse = require('fs-extra')
          try {
            hasFile = await fse.pathExists(file)
          } catch {
            hasFile = false
          }
          if (!hasFile) {
            const fileData = await axios({
              method: 'get',
              url: `${base}${ep.action}?customerId=${customerId}&ImageId=${imageId}&${imgParams}`,
              headers: {
                Authorization: process.env.API_AUTHORIZATION
              }
            })
            const fs = require('fs')
            await fs.writeFile(file, fileData.data, 'base64', function (err) {
              if (err) {
                console.log('Error saving the file...')
                console.log(err)
              }
            })
          }
        }
        images[i] = estateImages[i]
        images[i].cdnReferences = [`${estateImagesDir}/${estateId}/${fileName}`]
      }
    }
  }
  return images
}

export async function cacheEstateFiles ($axios, estateId, estateFiles, doCache = true) {
  // $axios.setHeader('Authorization', process.env.API_AUTHORIZATION)
  // $axios.setHeader('Access-Control-Allow-Origin', '*')
  const files = []
  const ep = core.api.requests.endpoints.file
  const customerId = ep.params.default.customerId
  if (estateFiles && estateFiles.length) {
    const dir = path.resolve('', `static/estate-files/${estateId}`)
    if (doCache && process.server) {
      try {
        const fs = require('fs')
        fs.mkdirSync(dir)
      } catch {}
    }
    for (let i = 0; i < estateFiles.length; i++) {
      if (estateFiles[i].id) {
        files[i] = estateFiles[i]
        const fileId = estateFiles[i].id
        const fileName = `${fileId}${estateFiles[i].extension}`
        const estateFilesDir = 'estate-files'
        const staticRoot = 'static'
        let hasFile = false
        const file = path.resolve('', `${staticRoot}/${estateFilesDir}/${estateId}/`, fileName)
        if (doCache && process.server) {
          const fse = require('fs-extra')
          try {
            hasFile = await fse.pathExists(file)
          } catch {}
          if (!hasFile) {
            const fileData = await axios({
              method: 'get',
              url: `${base}${ep.action}?customerId=${customerId}&fileId=${fileId}`,
              headers: {
                Authorization: process.env.API_AUTHORIZATION
              }
            })
            const fs = require('fs')
            fs.writeFile(file, fileData.data, 'base64', function (err) {
              if (err) {
                console.log('Error saving the file...')
                console.log(err)
              }
            })
          }
        }
        files[i].src = `/${estateFilesDir}/${estateId}/${fileName}`
      }
    }
  }
  return files
}

export async function cacheBrokerImage ($axios, estateId, brokerId, brokerImage, doCache = true) {
  const ep = core.api.requests.endpoints.image
  const customerId = ep.params.default.customerId
  const image = brokerImage || null
  if (estateId && brokerImage) {
    const dir = path.resolve(`static/estate-images/${estateId}/${brokerId}`)
    if (doCache && process.server) {
      try {
        const fs = require('fs')
        fs.mkdirSync(dir)
      } catch {}
    }
    const imageId = brokerImage.imageId
    const fileName = `${imageId}.${brokerImage.extension}`
    const estateImagesDir = 'estate-images'
    const staticRoot = 'static'
    const imgParams = 'quality=100'
    let hasFile = false
    const file = path.resolve('', `${staticRoot}/${estateImagesDir}/${estateId}/${brokerId}/`, fileName)
    if (doCache && process.server) {
      const fse = require('fs-extra')
      try {
        hasFile = await fse.pathExists(file)
      } catch {
        hasFile = false
      }
      if (!hasFile) {
        const fileData = await axios({
          method: 'get',
          url: `${base}${ep.action}?customerId=${customerId}&ImageId=${imageId}&${imgParams}`,
          headers: {
            Authorization: process.env.API_AUTHORIZATION
          }
        })
        const fs = require('fs')
        await fs.writeFile(file, fileData.data, 'base64', function (err) {
          if (err) {
            console.log('Error saving the file...')
            console.log(err)
          }
        })
      }
    }
    image.cdnReferences.push(`estate-images/${estateId}/${brokerId}/${fileName}`)
  }
  return image
}

export async function cacheEmployeeImage (employeeImage) {
  const ep = core.api.requests.endpoints.image
  const customerId = ep.params.default.customerId
  const image = employeeImage
  if (employeeImage) {
    const imgParams = 'w=700&quality=100'
    const teamImagesDir = 'team-images'
    const staticRoot = 'static'
    const imageId = employeeImage.imageId
    const fileName = `${imageId}.${employeeImage.extension}`
    let hasFile = false
    const file = path.resolve('', `${staticRoot}/${teamImagesDir}/`, fileName)
    if (process.server) {
      const fse = require('fs-extra')
      try {
        hasFile = await fse.pathExists(file)
      } catch {
        hasFile = false
      }
      if (!hasFile) {
        const fileData = await axios({
          method: 'get',
          url: `${base}${ep.action}?customerId=${customerId}&ImageId=${imageId}&${imgParams}`,
          headers: {
            Authorization: process.env.API_AUTHORIZATION,
            'Content-Type': `image/${employeeImage.extension}`
          }
        })
        const fs = require('fs')
        await fs.writeFile(file, fileData.data, 'base64', function (err) {
          if (err) {
            console.log('Error saving the file...')
            console.log(err)
          }
        })
      }
    }
    image.cdnReferences.push(`${teamImagesDir}/${fileName}`)
  }
  return image
}
