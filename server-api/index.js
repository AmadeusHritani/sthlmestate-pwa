import express from 'express'
const serverApi = express()

const estates = require('./estates')

serverApi.use(express.json())
serverApi.use(estates)

serverApi.get('/', (req, res) => {
  res.json({
    message: 'Sthlm Estate API'
  })
})

export default serverApi
